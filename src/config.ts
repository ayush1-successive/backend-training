import dotenv from "dotenv";

// dot config
dotenv.config();

interface IServerConfig {
  devMode: string;
  port: number;
  dummyToken: string;
  jwtSecret: string;
}

// Load configuration from .env file
const serverConfig: IServerConfig = {
  devMode: process.env.DEV_MODE ?? "development",
  port: parseInt(process.env.PORT ?? "3000"),
  dummyToken: process.env.DUMMY_TOKEN ?? "",
  jwtSecret: process.env.JWT_SECRET ?? "",
};

export { serverConfig, type IServerConfig };
