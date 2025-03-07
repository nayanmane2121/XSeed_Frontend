import { Server } from "miragejs";
import { users } from "./mock-data/users";
import { availableSteps } from "./mock-data/steps-data"; // Import mock interview steps
import { availableQuestions } from "./mock-data/questions-data";

export default function seeds(server: Server) {
  server.db.loadData({
    users,
    interviewSteps: availableSteps, // Load interview steps into Mirage DB
    questions: availableQuestions, // Load questions into Mirage DB
  });
}
