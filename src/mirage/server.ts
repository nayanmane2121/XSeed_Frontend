import { createServer, Server } from "miragejs";
import seeds from "./seeds";
import models from "./models";
import authRoutes from "./routes/auth";
import interviewRoutes from "./routes/job-pipeline";
import questionsRoutes from "./routes/questions";

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
      interviewRoutes(this);
      questionsRoutes(this);

      // Add more routes as needed
    }
  });

  return server;
}
