import express from 'express';
import JobListingController from './controller';

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
        // this.router.get('/', JobListingController.index);

        // Get all joblistings according to filters
        this.router.get('/', this.jobListingController.getAll);

        // Get a job by jobId
        this.router.get('/:jobId', this.jobListingController.getById);

        // Create a new listing
        this.router.post('/create', this.jobListingController.create);

        // Update fields of a job listing
        // this.router.patch('/jobs/jobId', this.jobListingController.update);

        // Delete a job listing by its id
        // this.router.delete('/jobs/jobId', this.jobListingController.delete);
    }
}

const routerInstance = JobListingRouter.getInstance().router;
export default routerInstance;
