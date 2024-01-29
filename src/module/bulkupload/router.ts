import express from 'express';
import BulkUploadController from './controller';
import { AuthMiddleware } from '../../lib/middlewares';

class BulkUploadRouter {
    // eslint-disable-next-line no-use-before-define
    private static instance: BulkUploadRouter;

    public router: express.Router;

    private readonly bulkUploadController: BulkUploadController;

    private readonly authMiddleware: AuthMiddleware;

    private constructor() {
        this.router = express.Router();
        this.bulkUploadController = new BulkUploadController();
        this.authMiddleware = new AuthMiddleware();
        this.setupRoutes();
    }

    static getInstance(): BulkUploadRouter {
        if (!BulkUploadRouter.instance) {
            BulkUploadRouter.instance = new BulkUploadRouter();
        }

        return BulkUploadRouter.instance;
    }

    private setupRoutes(): void {
        // Get all upload history
        this.router.get('/', this.authMiddleware.authenticate, this.bulkUploadController.getAll);

        this.router.post('/', this.bulkUploadController.create);

        // Get a upload history by its id
        this.router.get('/:uploadId', this.authMiddleware.authenticate, this.bulkUploadController.getById);
    }
}

const routerInstance = BulkUploadRouter.getInstance().router;
export default routerInstance;
