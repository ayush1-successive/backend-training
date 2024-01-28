import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';

import IUser from './entities/IUser';
import IUserLoginRequest from './entities/IUserLoginRequest';
import UserRepository from './repositories/repository';
import userData from '../../lib/userData';

class UserService {
    userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    initialSeed = async (): Promise<void> => {
        const tasks: Promise<void>[] = userData.map(
            (user: IUser) => this.userRepository.seed(user),
        );
        await Promise.all(tasks);
    };

    getByEmail = async (email: string): Promise<IUser | null> => {
        const result = await this.userRepository.getByEmail(email);
        return result;
    };

    getAll = async (): Promise<IUser[] | null> => {
        const result = await this.userRepository.getAll();
        return result;
    };

    create = async (user: IUser): Promise<IUser> => {
        // Hash password before storing in DB
        const salt: string = await bcrypt.genSalt(10);
        const hashedPassword: string = await bcrypt.hash(user.password, salt);

        const result = await this.userRepository.create({ ...user, password: hashedPassword });
        return result;
    };

    deleteAll = async (): Promise<void> => {
        await this.userRepository.deleteAll();
    };

    deleteByEmail = async (email: string): Promise<any> => {
        const result = this.userRepository.deleteByEmail(email);
        return result;
    };

    static verifyPassword = async (existingUser: IUser, currentUser: IUserLoginRequest):
        Promise<boolean> => {
        const result: boolean = await bcrypt.compare(
            currentUser.password,
            existingUser.password,
        );
        return result;
    };

    static generateLoginToken = async (
        existingUser: IUser,
        jwtSecret: string,
    ): Promise<string> => {
        const token: string = JWT.sign(
            { userId: existingUser?.email },
            jwtSecret,
            { expiresIn: '1d' },
        );
        return token;
    };
}

export default UserService;
