import express from 'express';
import JobListingController from './controller';
import upload from './helpers';

class JobListingRouter {
    // eslint-disable-next-line no-use-before-define
    private static instance: JobListingRouter;

    public router: express.Router;

    private readonly jobListingController: JobListingController;

    private constructor() {
        this.router = express.Router();
        this.jobListingController = new JobListingController();
        this.setupRoutes();
    }

    static getInstance(): JobListingRouter {
        if (!JobListingRouter.instance) {
            JobListingRouter.instance = new JobListingRouter();
        }

        return JobListingRouter.instance;
    }

    private setupRoutes(): void {
        // Get all joblistings according to filters
        this.router.get('/', this.jobListingController.getAll);

        // Get a count of all joblistings
        this.router.get('/count', this.jobListingController.countAll);

        // Create job listing
        this.router.post('/', this.jobListingController.create);

        // Upload a job through csv
        this.router.post('/upload', upload.single('file'), this.jobListingController.uploadByFile);

        // Get job listing by id
        this.router.get('/:jobId', this.jobListingController.getById);

        // Update job listing by id
        this.router.put('/:jobId', this.jobListingController.updateById);

        // Delete job listing by id
        this.router.delete('/:jobId', this.jobListingController.deleteById);
    }
}

const routerInstance = JobListingRouter.getInstance().router;
export default routerInstance;
