import express from 'express';
import healthController from './controllers/healthController';
import { ErrorHandlerMiddlerware } from './lib/middlewares/Assignment-3';
import { countryRouter, jobListingRouter, userRouter } from './module';
import assignment3Router from './routes/Assignment3';
import assignment4Router from './routes/Assignment4';
import assignment5Router from './routes/Assignment5';

const router: express.Router = express.Router();

router.use('/assignment3', assignment3Router);
router.use('/assignment4', assignment4Router);
router.use('/assignment5', assignment5Router);

router.use('/users', userRouter);
router.use('/country', countryRouter);
router.use('/jobs', jobListingRouter);

// health check
router.get('/health', healthController.check);

// Handles '404 not found'
router.use(ErrorHandlerMiddlerware.notFound);

export default router;
