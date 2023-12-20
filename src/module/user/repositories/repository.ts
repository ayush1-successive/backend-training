import { BaseRepository } from '../../../lib/base';
import IUser from '../entities/IUser';
import userModel from './model';

class UserRepository extends BaseRepository<IUser> {
    constructor() {
        super(userModel);
    }

    getAll = async (): Promise<IUser[] | null> => {
        const result = await this.findAll();
        return result;
    };

    getByUserName = async (username: string): Promise<IUser | null> => {
        const result = await this.model.findOne({ username });
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

    deleteByUserName = async (username: string): Promise<void> => {
        await this.model.deleteOne({ username });
    };

    deleteAll = async (): Promise<void> => {
        await this.removeAll();
    };
}

export default UserRepository;
