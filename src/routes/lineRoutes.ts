import { Elysia } from "elysia";
import { sendLineMessage } from "../controllers/lineController";

export const registerRoutes = (app: Elysia) => {
  app.post("/send", async ({ body, set }) => {
    const messageBody: any = body;

    const response = await sendLineMessage(
      messageBody.userId,
      messageBody.message
    );

    if (response.status === "error") {
      set.status = 400;
      return { message: "เกิดข้อผิดพลาดไม่สามารถส่งข้อความได้" };
    } else {
      set.status = 200;
      return { message: "ส่งข้อความเสร็จสิ้น" };
    }
  });
};
