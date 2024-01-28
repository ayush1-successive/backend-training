import express from 'express';
import UserController from './controller';

class UserRouter {
    // eslint-disable-next-line no-use-before-define
    private static instance: UserRouter;

    public router: express.Router;

    private readonly userController: UserController;

    private constructor() {
        this.router = express.Router();
        this.userController = new UserController();
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
        this.router.get('/', this.userController.getAll);

        // Register new user
        this.router.post('/register', this.userController.register);

        // Login existing user
        this.router.post('/login', this.userController.login);

        // Get user details by its emailId
        this.router.get('/:emailId', this.userController.getByEmail);

        // Update user details by this emailId
        // this.router.put('/:emailId', this.userController.updateByEmail);

        // Delete existing user by its emailId
        this.router.delete('/:emailId', this.userController.deleteByEmail);
    }
}

const routerInstance = UserRouter.getInstance().router;
export default routerInstance;
