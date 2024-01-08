import { BaseRepository } from '../../../lib/base';
import IUser from '../entities/IUser';
import userModel from './model';

class UserRepository extends BaseRepository<IUser> {
    constructor() {
        super(userModel);
    }

    seed = async (user: IUser): Promise<void> => {
        const existingUser: IUser | null = await this.getByEmail(user.email);

        if (!existingUser) {
            await this.createOne(user);
        }
    };

    getAll = async (): Promise<IUser[] | null> => {
        const result = await this.findAll();
        return result;
    };

    getByEmail = async (email: string): Promise<IUser | null> => {
        const result = await this.model.findOne({ email });
        return result;
    };

    create = async (user: IUser): Promise<IUser> => {
        await this.createOne(user);
        return user;
    };

    deleteByEmail = async (email: string): Promise<any> => {
        const result: any = await this.model.deleteOne({ email });
        return result;
    };
}

export default UserRepository;
