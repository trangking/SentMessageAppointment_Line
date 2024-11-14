import "dotenv/config";

export const LINE_ACCESS_TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN || "";
export const LINE_SENDMESSAGE_URL = "https://api.line.me/v2/bot/message/push";
export const LINE_OAUTH_URL = "https://api.line.me/oauth2/v2.1/token";
