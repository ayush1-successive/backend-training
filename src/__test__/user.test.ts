import request from 'supertest';
import express from 'express';
import Server from '../server';
import { serverConfig } from '../config';
import UserService from '../module/user/services';

describe('API Integration Tests - User Module', () => {
    let server: Server;
    let app: express.Application;
    let userService: UserService;

    const testUser = {
        name: 'Ayush Sinha',
        email: 'ayush@gmail.com',
        password: 'pass@1234',
    };

    beforeAll(async () => {
        server = Server.getInstance(serverConfig);
        server.connectDB();
        app = server.getApp();

        userService = new UserService();
        userService.deleteAll();
    });

    afterAll(async () => {
        await server.disconnectDB();
    });

    beforeEach(async () => {
        await userService.initialSeed();
    });

    afterEach(async () => {
        await server.connectDB();
        await userService.deleteAll();
    });

    test('GET /users', async () => {
        let response = await request(app).get('/users');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            status: true,
            message: 'users list found!',
            data: expect.objectContaining([]),
        });

        // Internal server error
        await server.disconnectDB();
        response = await request(app).get('/users');

        expect(response.status).toBe(500);
        expect(response.body).toEqual({
            status: false,
            message: 'error retrieving all users!',
            error: expect.objectContaining({}),
        });
    });

    test('GET /users/{emailId}', async () => {
        const invalidEmail = 'abc@xyz.com';
        const validEmail = 'john.doe@example.com';

        // user not found
        let response = await request(app).get(`/users/${invalidEmail}`);

        expect(response.status).toBe(404);
        expect(response.body).toEqual({
            status: false,
            message: 'User not found!',
            error: expect.objectContaining({ emailId: invalidEmail }),
        });

        // user found
        response = await request(app).get(`/users/${validEmail}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            status: true,
            message: 'User found!',
            data: expect.objectContaining({}),
        });

        // Internal server error
        await server.disconnectDB();
        response = await request(app).get(`/users/${validEmail}`);

        expect(response.status).toBe(500);
        expect(response.body).toEqual({
            status: false,
            message: 'error retrieving user by email!',
            error: expect.objectContaining({}),
        });
    });

    test('DELETE /users/{emailId}', async () => {
        const emailId = 'john.doe@example.com';

        // user found and deleted
        let response = await request(app).delete(`/users/${emailId}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            status: true,
            message: 'user deleted successfully!',
            data: { acknowledged: true, deletedCount: 1 },
        });

        // user not found
        response = await request(app).delete(`/users/${emailId}`);

        expect(response.status).toBe(404);
        expect(response.body).toEqual({
            status: false,
            message: `User with email '${emailId}' doesn't exists!`,
            error: expect.objectContaining({ emailId }),
        });

        // Internal server error
        await server.disconnectDB();
        response = await request(app).delete(`/users/${emailId}`);

        expect(response.status).toBe(500);
        expect(response.body).toEqual({
            status: false,
            message: 'error deleting user!',
            error: expect.objectContaining({}),
        });
    });

    test('POST /users/register', async () => {
        // Validation error
        let response = await request(app).post('/users/register');

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: false,
            message: 'new user validation failed!',
            error: expect.objectContaining({}),
        });

        // Password check failed (should be more than 8 chars)
        response = await request(app).post('/users/register').send(
            { ...testUser, password: 'pa@123' },
        );

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: false,
            message: 'new user validation failed!',
            error: expect.objectContaining({}),
        });

        // Successful registration
        response = await request(app).post('/users/register').send(testUser);

        expect(response.status).toBe(201);
        expect(response.body).toEqual({
            status: true,
            message: 'new user added!',
            data: expect.objectContaining({}),
        });

        // User already exists
        response = await request(app).post('/users/register').send(testUser);

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: false,
            message: 'User already exists!',
            error: expect.objectContaining({}),
        });

        // Internal server error
        await server.disconnectDB();
        response = await request(app).post('/users/register').send(testUser);

        expect(response.status).toBe(500);
        expect(response.body).toEqual({
            status: false,
            message: 'error creating new user!',
            error: expect.objectContaining({}),
        });
    });

    test('POST users/login', async () => {
        // Validation error
        let response = await request(app).post('/users/login');

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: false,
            message: 'new user validation failed!',
            error: expect.objectContaining({}),
        });

        // No existing user
        response = await request(app).post('/users/login').send({
            email: 'abc@xyz.com',
            password: '1234',
        });

        expect(response.status).toBe(404);
        expect(response.body).toEqual({
            status: false,
            message: 'no user found for current email!',
            error: expect.objectContaining({}),
        });

        await userService.create(testUser);

        // Invalid credentials
        response = await request(app).post('/users/login').send({
            email: 'ayush@gmail.com',
            password: 'password123',
        });

        expect(response.status).toBe(401);
        expect(response.body).toEqual({
            status: false,
            message: 'Invalid credentials!',
            error: expect.objectContaining({}),
        });

        // Successful login
        response = await request(app).post('/users/login').send({
            email: 'ayush@gmail.com',
            password: 'pass@1234',
        });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            status: true,
            message: 'user login successfully!',
            data: expect.objectContaining({}),
        });

        // Internal server error
        await server.disconnectDB();
        response = await request(app).post('/users/login').send({
            email: 'ayush@gmail.com',
            password: 'pass@1234',
        });

        expect(response.status).toBe(500);
        expect(response.body).toEqual({
            status: false,
            message: 'error logging existing user!',
            error: expect.objectContaining({}),
        });
    });
});
