import { Elysia, t } from "elysia";
import axios from "axios";
import {
  LINE_ACCESS_TOKEN,
  LINE_SENDMESSAGE_URL,
  LINE_OAUTH_URL,
} from "../config/lineConfig";
import { error } from "console";

// Define types if Elysia doesn’t provide them
interface Request {
  body: {
    userId?: string;
    message?: string;
    id_token?: string;
    client_id?: string;
  };
}

interface Response {
  status: (code: number) => Response;
  json: (data: object) => void;
}

export const AuthLine = async (req: Request, res: Response) => {
  const { id_token, client_id } = req.body;
  if (!id_token || client_id) {
    return res
      .status(400)
      .json({ error: "id_token and client_id are required" });
  }
  try {
    const response = await axios.get(LINE_OAUTH_URL, {
      params: {
        id_token: id_token,
        client_id: client_id,
      },
    });
    res.status(200).json({ success: true, data: response.data });
  } catch (error) {
    // จัดการ error
    console.error("Error verifying LINE token:", error);
    res.status(500).json({ error: "Failed to verify token" });
  }
};

export const sendLineMessage = async (req: Request, res: Response) => {
  const { userId, message } = req.body;

  // Validate that userId and message are provided
  if (!userId || !message) {
    return res.status(400).json({ error: "User ID and message are required" });
  }

  try {
    // Send POST request to LINE API
    const response = await axios.post(
      LINE_SENDMESSAGE_URL,
      {
        to: userId,
        messages: [
          {
            type: "text",
            text: message,
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${LINE_ACCESS_TOKEN}`,
        },
      }
    );

    // Send success response
    res.status(200).json({ success: true, data: response.data });
  } catch (error) {
    // Handle error
    console.error("Error sending message to LINE:", error);
    res.status(500).json({ error: "Failed to send message" });
  }
};
