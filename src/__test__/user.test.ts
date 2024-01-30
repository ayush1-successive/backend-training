import express from 'express';
import request from 'supertest';
import { serverConfig } from '../config';
import IUser from '../module/user/entities/IUser';
import UserService from '../module/user/Services';
import Server from '../Server';

describe('API Integration Tests - User Module', () => {
    let server: Server;
    let app: express.Application;
    let userService: UserService;
    let userToken: string;
    let testUser: IUser;

    beforeAll(async () => {
        server = Server.getInstance(serverConfig);
        server.connectDB();
        app = server.getApp();

        userService = new UserService();
        userService.deleteAll();

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
        await userService.initialSeed();
        userToken = await UserService.generateLoginToken(testUser, serverConfig.jwtSecret);
    });

    afterEach(async () => {
        await server.connectDB();
        await userService.deleteAll();
    });

    test('GET /users', async () => {
        let response = await request(app).get('/users').set('Authorization', `Bearer ${userToken}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            status: true,
            message: 'users list found!',
            data: expect.objectContaining([]),
        });

        // Internal server error
        await server.disconnectDB();
        response = await request(app).get('/users').set('Authorization', `Bearer ${userToken}`);

        expect(response.status).toBe(500);
        expect(response.body).toEqual({
            status: false,
            message: 'error retrieving all users!',
            error: expect.objectContaining({}),
        });
    });

    test('GET /users/email/{emailId}', async () => {
        const invalidEmail = 'abc@xyz.com';
        const validEmail = 'john.doe@example.com';

        // user not found
        let response = await request(app).get(`/users/email/${invalidEmail}`).set('Authorization', `Bearer ${userToken}`);

        expect(response.status).toBe(404);
        expect(response.body).toEqual({
            status: false,
            message: 'User not found!',
            error: expect.objectContaining({ emailId: invalidEmail }),
        });

        // user found
        response = await request(app).get(`/users/email/${validEmail}`).set('Authorization', `Bearer ${userToken}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            status: true,
            message: 'User found!',
            data: expect.objectContaining({}),
        });

        // Internal server error
        await server.disconnectDB();
        response = await request(app).get(`/users/email/${validEmail}`).set('Authorization', `Bearer ${userToken}`);

        expect(response.status).toBe(500);
        expect(response.body).toEqual({
            status: false,
            message: 'error retrieving user by email!',
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

        expect(response.status).toBe(409);
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
            message: 'login validation failed!',
            error: expect.objectContaining({}),
        });

        // No existing user
        response = await request(app).post('/users/login').send({
            email: 'abc@xyz.com',
            password: '123456780',
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
            email: testUser.email,
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
            email: testUser.email,
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
            email: testUser.email,
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
