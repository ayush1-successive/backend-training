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
        this.router.get('/', UserController.index);
        this.router.get('/getbyname/:username', this.userController.getByUserName);
        this.router.get('/getbyemail/:email', this.userController.getByEmail);
        this.router.get('/getAll', this.userController.getAll);
        this.router.post('/register', this.userController.register);
        this.router.post('/login', this.userController.login);
        this.router.get('/deleteAll', this.userController.deleteAll);
    }
}

const routerInstance = UserRouter.getInstance().router;
export default routerInstance;
