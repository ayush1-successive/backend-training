import request from 'supertest';
import express from 'express';
import Server from '../server';
import { serverConfig } from '../config';

describe('API Integration Tests - JobListing Module', () => {
    let server: Server;
    let app: express.Application;

    beforeAll(async () => {
        server = Server.getInstance(serverConfig);
        server.connectDB();
        app = server.getApp();
    });

    test('GET /jobs', async () => {
        const response = await request(app).get('/jobs');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            status: true,
            message: 'Job listing found!',
            data: expect.objectContaining({}),
        });
    });
});
