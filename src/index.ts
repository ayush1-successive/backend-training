import { serverConfig } from './config';
import Server from './server';

const server: Server = new Server(serverConfig);
server.bootStrap();
server.run();
