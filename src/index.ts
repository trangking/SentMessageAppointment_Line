import { Elysia } from "elysia";
import { registerRoutes } from "./routes/lineRoutes"; // Adjust the path if needed
import { cors } from "@elysiajs/cors";
const app = new Elysia();

// Register routes
registerRoutes(app);

app.get("/", () => "Hello Elysia");

app.use(cors()).listen(3001);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
