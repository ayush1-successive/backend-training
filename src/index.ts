import { serverConfig } from './config';
import Server from './server';

const server: Server = Server.getInstance(serverConfig);
server.run();
