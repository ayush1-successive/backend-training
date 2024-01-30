import express from 'express';
import { AuthMiddleware } from '../../lib/middlewares';
import upload from '../job/helpers';
import UserController from './Controller';

class UserRouter {
    // eslint-disable-next-line no-use-before-define
    private static instance: UserRouter;

    public router: express.Router;

    private readonly userController: UserController;

    private readonly authMiddleware: AuthMiddleware;

    private constructor() {
        this.router = express.Router();
        this.userController = new UserController();
        this.authMiddleware = new AuthMiddleware();
        this.setupRoutes();
    }

    static getInstance(): UserRouter {
        if (!UserRouter.instance) {
            UserRouter.instance = new UserRouter();
        }

        return UserRouter.instance;
    }

    private setupRoutes(): void {
        // Get all users
        this.router.get('/', this.authMiddleware.authenticate, this.userController.getAll);

        // Get user by token in req.header
        this.router.get('/token', this.authMiddleware.authenticate, this.userController.getByToken);

        // Register new user
        this.router.post('/register', this.userController.register);

        // Login existing user
        this.router.post('/login', this.userController.login);

        // Get user details by its emailId
        this.router.get('/email/:emailId', this.userController.getByEmail);

        // Get job listing by id
        this.router.get('/:userId', this.authMiddleware.authenticate, this.userController.getById);

        // Update job listing by id
        this.router.put('/:userId', this.authMiddleware.authenticate, upload.single('file'), this.userController.updateById);

        // Delete job listing by id
        this.router.delete('/:userId', this.authMiddleware.authenticate, this.userController.deleteById);
    }
}

const routerInstance = UserRouter.getInstance().router;
export default routerInstance;
