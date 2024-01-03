import { type Model } from 'mongoose';

class BaseRepository<T> {
    model: Model<T>;

    constructor(model: Model<T>) {
        this.model = model;
    }

    findAll = async (): Promise<T[] | null> => {
        const result: T[] | null = await this.model.find({});
        return result;
    };

    getById = async (id: string): Promise<T | null> => {
        const result: T | null = await this.model.findById(id);
        return result;
    };

    removeAll = async (): Promise<void> => {
        await this.model.deleteMany({});
    };

    createOne = async (data: T): Promise<T> => {
        const result: T = await this.model.create(data);
        return result;
    };

    deleteById = async (id: string): Promise<void> => {
        await this.model.deleteOne({ _id: id });
    };

    deleteAll = async (): Promise<void> => {
        await this.model.deleteMany({});
    };
}

export default BaseRepository;
