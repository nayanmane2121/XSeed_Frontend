import { createServer, Server } from "miragejs";
import seeds from "./seeds";
import models from "./models";
import authRoutes from "./routes/auth";

export function makeServer({ environment = "development" } = {}): Server {
  const server = createServer({
    environment,
    models,
    seeds(server) {
      seeds(server);
    },
    routes() {
      this.namespace = "api";

      authRoutes(this);

      // Add more routes as needed
    }
  });

  return server;
}
