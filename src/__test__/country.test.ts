import request from 'supertest';
import express from 'express';
import CountryService from '../module/country/service';
import Server from '../server';
import { serverConfig } from '../config';

describe('API Integration Tests - Country Module', () => {
    let server: Server;
    let app: express.Application;
    let countryService: CountryService;

    beforeAll(async () => {
        server = Server.getInstance(serverConfig);
        server.connectDB();
        app = server.getApp();
        countryService = new CountryService();
    });

    beforeEach(async () => {
        await countryService.initialSeed();
    });

    afterEach(async () => {
        await countryService.deleteAll();
    });

    test('GET /country', async () => {
        const response = await request(app).get('/country');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            status: true,
            message: 'Country HomePage',
            data: {},
        });
    });

    test('GET country/:name', async () => {
        let response = await request(app).get('/country/get/some-country');

        expect(response.status).toBe(404);
        expect(response.body).toEqual({
            status: false,
            message: 'country not found!',
            error: {},
        });

        response = await request(app).get('/country/get/India');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            status: true,
            message: 'country found!',
            data: expect.objectContaining({}),
        });
    });

    test('GET country/getAll', async () => {
        const response = await request(app).get('/country/getAll');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            status: true,
            message: 'country list found!',
            data: expect.objectContaining([]),
        });
    });

    test('GET country/create', async () => {
        const testCountry = {
            name: 'Test Country',
            code: 'TS',
            continent: 'Test Continent',
            capital: 'Test Capital',
            population: 123456,
            language: 'english',
        };

        // Validation fail
        let response = await request(app).post('/country/create');

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: false,
            message: 'new country validation failed!',
            error: expect.objectContaining([]),
        });

        response = await request(app).post('/country/create').send(testCountry);

        expect(response.status).toBe(201);
        expect(response.body).toEqual({
            status: true,
            message: 'new country added to database!',
            data: expect.objectContaining([]),
        });
    });
});
