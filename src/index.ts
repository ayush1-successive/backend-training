import { serverConfig } from "./config";
import { Server } from "./server";


const server = new Server(serverConfig);
server.run();
