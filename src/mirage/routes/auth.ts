import { Server, Response } from "miragejs";
import { users } from "../mock-data/users";

export default function authRoutes(server: Server) {
  server.post("/auth/login", (schema, request) => {
    const { email, password } = JSON.parse(request.requestBody);

    // Find candidate by email
    const user = users.find((c) => c.email === email);

    if (user && password === "password123") {
      return {
        token: "mock-jwt-token",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          userRole: user.userRole,
        },
      };
    }

    return new Response(401, {}, { error: "Invalid email or password" });
  });

  server.post("/auth/logout", () => {
    return new Response(204);
  });
}
