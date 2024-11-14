import { Elysia } from "elysia";
import { sendLineMessage } from "../controllers/lineController";

export const registerRoutes = (app: Elysia) => {
  app.post("/send", sendLineMessage);
};
