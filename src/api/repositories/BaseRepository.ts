import mongoose from "mongoose";

class BaseRepository<T> {
  createdOn: number = Date.now();

  model = mongoose.Model<T>;

  constructor(model: any) {
    this.model = model;
  }
}

export default BaseRepository;
