import mongoose from "mongoose";

class Database {
  mongoUrl: string;

  constructor(url: string) {
    this.mongoUrl = url;
  }

  connect = async (): Promise<void> => {
    try {
      await mongoose.connect(this.mongoUrl);
      console.log(`Connected to MongoDB Database ${mongoose.connection.host}`);
    } catch (error: any) {
      console.log(`MongoDB Database Error ${error}`);
    }
  };
}

export default Database;
