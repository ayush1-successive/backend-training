import express from 'express';
import fs from 'fs';
import request from 'supertest';
import { serverConfig } from '../config';
import generateCsv from '../lib/utils/JobListing';
import IJobListing from '../module/job/entities/IJobListing';
import JobType from '../module/job/entities/JobType';
import JobService from '../module/job/Services';
import IUser from '../module/user/entities/IUser';
import UserService from '../module/user/Services';
import Server from '../Server';

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
        let response = await request(app).get('/jobs');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            status: true,
            message: 'Job listing found!',
            data: expect.objectContaining({}),
        });

        await server.disconnectDB();
        response = await request(app).get('/jobs');

        expect(response.status).toBe(500);
        expect(response.body).toEqual({
            status: false,
            message: 'Error retrieving job listings!',
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

        await generateCsv(csvPath, 10, 1000);

        const response = await request(app)
            .post('/jobs/upload')
            .attach('file', csvPath);

        expect(response.status).toBe(201);
        expect(response.body).toEqual({
            status: true,
            message: 'File uploaded successfully',
            data: expect.objectContaining({}),
        });

        fs.unlinkSync(csvPath);
    });
});
