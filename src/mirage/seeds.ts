import { Server } from "miragejs";
import { users } from "./mock-data/users";

export default function seeds(server: Server) {
  server.db.loadData({
    users
  });
}
