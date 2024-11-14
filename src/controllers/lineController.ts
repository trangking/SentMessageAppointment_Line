import axios from "axios";
import { Elysia, t } from "elysia";

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`,
};
const LINE_BOT_API = "https://api.line.me/v2/bot";

const sendLineMessage = async (userId: string, nextAppointment: string) => {
  console.log("Received userId:", userId);
  console.log("Received nextAppointment:", nextAppointment);

  try {
    console.log("--------start send Message--------");

    if (!userId || !nextAppointment) {
      return { status: "error" };
    }

    // โครงสร้าง Flex Message
    const body = {
      to: userId,
      messages: [
        {
          type: "flex",
          altText: "การแจ้งเตือนการนัดหมาย",
          contents: {
            type: "bubble",
            hero: {
              type: "image",
              url: "https://www.planfy.com/assets/images/front/industries/veterinarians/woman-veterinarian-with-stethoscope-boy-with-dog--lg.jpg",
              size: "full",
              aspectRatio: "20:13",
              aspectMode: "cover",
            },
            body: {
              type: "box",
              layout: "vertical",
              contents: [
                {
                  type: "text",
                  text: "การแจ้งเตือนการนัดหมาย",
                  weight: "bold",
                  size: "xl",
                  margin: "md",
                },
                {
                  type: "text",
                  text: "การนัดหมายครั้งถัดไปของคุณคือ:",
                  size: "md",
                  color: "#555555",
                  margin: "sm",
                },
                {
                  type: "separator",
                  margin: "lg",
                },
                {
                  type: "box",
                  layout: "vertical",
                  margin: "lg",
                  spacing: "sm",
                  contents: [
                    {
                      type: "box",
                      layout: "baseline",
                      contents: [
                        {
                          type: "text",
                          text: "วันที่",
                          size: "sm",
                          color: "#aaaaaa",
                          flex: 1,
                        },
                        {
                          type: "text",
                          text: nextAppointment, // แสดงวันที่จากตัวแปร
                          size: "sm",
                          color: "#666666",
                          flex: 3,
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          },
        },
      ],
    };

    // ส่ง Flex Message
    await axios.post(`${LINE_BOT_API}/message/push`, body, { headers });

    return { status: "success" };
  } catch (error) {
    console.error("Error sending message:", error);
    return { status: "error" };
  }
};

export { sendLineMessage };
