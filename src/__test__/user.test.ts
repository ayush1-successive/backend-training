import request from 'supertest';
import express from 'express';
import Server from '../server';
import { serverConfig } from '../config';

describe('API Integration Tests - User Module', () => {
    let server: Server;
    let app: express.Application;

    beforeAll(async () => {
        server = Server.getInstance(serverConfig);
        server.connectDB();
        app = server.getApp();
    });

    test('GET /user', async () => {
        const response = await request(app).get('/users');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            status: true,
            message: 'User HomePage',
            data: {},
        });
    });

    test('GET /users/getAll', async () => {
        const response = await request(app).get('/users/getAll');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            status: true,
            message: 'users list found!',
            data: expect.objectContaining([]),
        });
    });
});
