import { serverConfig } from "./config";
import { Server } from "./server";

const server = new Server(serverConfig);
server
  .run()
  .then(() => {
    console.log("Server stopped!");
  })
  .catch(() => {
    console.log("Error occured while running server!");
  });
