import express from 'express';
import fs from 'fs';
import request from 'supertest';
import Server from '../Server';
import { serverConfig } from '../config';
import generateCsv from '../lib/utils/JobListing';
import BulkUploadService from '../module/bulkupload/Service';
import IBulkUpload from '../module/bulkupload/entities/IBulkUpload';
import JobService from '../module/job/Services';
import IJobListing from '../module/job/entities/IJobListing';
import JobType from '../module/job/entities/JobType';
import UserService from '../module/user/Services';
import IUser from '../module/user/entities/IUser';

describe('API Integration Tests - JobListing Module', () => {
    let server: Server;
    let app: express.Application;
    let jobService: JobService;
    let userToken: string;
    let testUser: IUser;

    const testJob: IJobListing = {
        title: 'Software Developer',
        company: 'Amazon',
        jobType: JobType.FullTime,
        industry: 'Software Development',
        applicationDeadline: new Date(),
        contactEmail: 'amazon@gmail.com',
        applicationLink: 'amazon@jobs.com',
        isRemote: false,
    };

    beforeAll(async () => {
        server = Server.getInstance(serverConfig);
        await server.connectDB();
        app = server.getApp();
        jobService = new JobService();

        await jobService.deleteAll();

        testUser = {
            name: 'Test User',
            email: `user@test-${Date.now()}.com`,
            password: 'pass@1234',
        };
    });

    afterAll(async () => {
        await server.disconnectDB();
    });

    beforeEach(async () => {
        await jobService.initialSeed();
        userToken = await UserService.generateLoginToken(
            testUser,
            serverConfig.jwtSecret,
        );
    });

    afterEach(async () => {
        await server.connectDB();
        await jobService.deleteAll();
    });

    test('GET /jobs', async () => {
        // Found all jobs
        let response = await request(app).get('/jobs');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            status: true,
            message: 'Job listing found!',
            data: expect.objectContaining({}),
        });

        // skip and limit exceeded total entries
        response = await request(app).get('/jobs').query({ page: '100', limit: '100' });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: false,
            message: 'This page doesn\'t exist!',
            error: { total: 5, page: '100', limit: '100' },
        });

        // Apply filters
        response = await request(app).get('/jobs').query({
            page: '1',
            limit: '5',
            title: 'engineer',
            salary: '300000,2000000',
            sort: 'salary',
            fields: 'title, company, jobType, -_id',
        });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            status: true,
            message: 'Job listing found!',
            data: {
                total: 1,
                count: 1,
                data: [{ title: 'DevOps Engineer', company: 'IBM', jobType: 'Full-time' }],
            },
        });

        // Internal server error
        await server.disconnectDB();
        response = await request(app).get('/jobs');

        expect(response.status).toBe(500);
        expect(response.body).toEqual({
            status: false,
            message: 'Error retrieving job listings!',
            error: expect.objectContaining({}),
        });
    });

    test('GET /jobs', async () => {
        // Found job count
        let response = await request(app).get('/jobs/count');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            status: true,
            message: 'Job listing count!',
            data: { count: 5 },
        });

        // Internal server error
        await server.disconnectDB();
        response = await request(app).get('/jobs/count');

        expect(response.status).toBe(500);
        expect(response.body).toEqual({
            status: false,
            message: 'Error retrieving job listings count!',
            error: expect.objectContaining({}),
        });
    });

    test('POST /jobs', async () => {
        // Validation fail
        let response = await request(app).post('/jobs');

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: false,
            message: 'new job listing validation failed!',
            error: expect.objectContaining({}),
        });

        // Job created successfully
        response = await request(app).post('/jobs').send(testJob);

        expect(response.status).toBe(201);
        expect(response.body).toEqual({
            status: true,
            message: 'new job added!',
            data: expect.objectContaining({}),
        });

        // Internal server error
        response = await request(app).post('/jobs').send(testJob);

        expect(response.status).toBe(500);
        expect(response.body).toEqual({
            status: false,
            message: 'error creating new job listing!',
            error: expect.objectContaining({}),
        });
    });

    test('GET /jobs/{jobId}', async () => {
        const result: any = await jobService.create(testJob);
        // eslint-disable-next-line no-underscore-dangle
        const testJobId = result._id.toString();

        // jobId validation failed
        let response = await request(app)
            .get('/jobs/invalid-id')
            .set('Authorization', `Bearer ${userToken}`);

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: false,
            message: 'jobId validation failed!',
            error: expect.objectContaining({}),
        });

        // Job found
        response = await request(app).get(`/jobs/${testJobId}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            status: true,
            message: 'Job found successfully.',
            data: expect.objectContaining({}),
        });

        // Job not found
        const randomId: string = '5f8d5a4c7d5ae23a9c6bdc47';
        response = await request(app).get(`/jobs/${randomId}`);

        expect(response.status).toBe(404);
        expect(response.body).toEqual({
            status: false,
            message: 'No job found for the provided ID!',
            error: expect.objectContaining({ jobId: randomId }),
        });

        // Internal server error
        await server.disconnectDB();
        response = await request(app).get(`/jobs/${testJobId}`);

        expect(response.status).toBe(500);
        expect(response.body).toEqual({
            status: false,
            message: 'Error retrieving job listing by jobId.',
            error: expect.objectContaining({}),
        });
    });

    test('PUT /jobs/{jobId}', async () => {
        const result: any = await jobService.create(testJob);
        // eslint-disable-next-line no-underscore-dangle
        const testJobId = result._id.toString();

        // No JWT-token provided
        let response = await request(app).put(`/jobs/${testJobId}`);

        expect(response.status).toBe(401);
        expect(response.body).toEqual({
            status: false,
            message: 'user authentication failed!',
            error: expect.objectContaining({ message: 'jwt must be provided' }),
        });

        // Malformed JWT-token
        response = await request(app)
            .put(`/jobs/${testJobId}`)
            .set('Authorization', 'Bearer malformed-token');

        expect(response.status).toBe(401);
        expect(response.body).toEqual({
            status: false,
            message: 'user authentication failed!',
            error: expect.objectContaining({ message: 'jwt malformed' }),
        });

        // job listing validation failed
        response = await request(app)
            .put(`/jobs/${testJobId}`)
            .set('Authorization', `Bearer ${userToken}`);

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: false,
            message: 'new job listing validation failed!',
            error: expect.objectContaining({}),
        });

        // job listing update success
        response = await request(app)
            .put(`/jobs/${testJobId}`)
            .set('Authorization', `Bearer ${userToken}`)
            .send({ ...testJob, industry: 'Hardware' });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            status: true,
            message: `job with id:${testJobId} updated!`,
            data: expect.objectContaining({}),
        });

        // internal server error
        await server.disconnectDB();
        response = await request(app)
            .put(`/jobs/${testJobId}`)
            .set('Authorization', `Bearer ${userToken}`)
            .send({ ...testJob, industry: 'Hardware' });

        expect(response.status).toBe(500);
        expect(response.body).toEqual({
            status: false,
            message: 'error updating job listing!',
            error: expect.objectContaining({}),
        });
    });

    test('DELETE /jobs/{jobId}', async () => {
        const result: any = await jobService.create(testJob);
        // eslint-disable-next-line no-underscore-dangle
        const testJobId = result._id.toString();

        // Job deleted successfully
        let response = await request(app)
            .delete(`/jobs/${testJobId}`)
            .set('Authorization', `Bearer ${userToken}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            status: true,
            message: 'Job deleted successfully!',
            data: expect.objectContaining({}),
        });

        // Internal server error
        await server.disconnectDB();
        response = await request(app)
            .delete(`/jobs/${testJobId}`)
            .set('Authorization', `Bearer ${userToken}`);

        expect(response.status).toBe(500);
        expect(response.body).toEqual({
            status: false,
            message: 'Error deleting joblisting by id!',
            error: expect.objectContaining({}),
        });
    });

    test('POST /jobs/upload', async () => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const csvPath = `./public/data/file-${uniqueSuffix}.csv`;
        const bulkUploadService = new BulkUploadService();

        await generateCsv(csvPath, 10010, 20000);

        // Successful upload
        let response = await request(app)
            .post('/jobs/upload')
            .attach('file', csvPath);

        const { recordId } = response.body.data;
        let result: IBulkUpload | null = null;

        /* eslint-disable no-await-in-loop */
        while (result?.status !== 'completed') {
            result = await bulkUploadService.getById(recordId, 'status');
            // Cause a delay between each fetch
            await new Promise((resolve) => {
                setTimeout(() => resolve(1), 800);
            });
        }

        // Delete history record
        await bulkUploadService.deleteAll();

        expect(response.status).toBe(201);
        expect(response.body).toEqual({
            status: true,
            message: 'File uploaded successfully',
            data: expect.objectContaining({}),
        });

        // Internal server error
        await server.disconnectDB();
        response = await request(app)
            .post('/jobs/upload')
            .attach('file', csvPath);

        expect(response.status).toBe(500);
        expect(response.body).toEqual({
            status: false,
            message: 'error uploading joblistings by csv file!',
            error: expect.objectContaining({}),
        });

        fs.unlinkSync(csvPath);
    }, 30000);
});
