import { GoogleGenAI, Chat } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const startChat = (): Chat => {
  const chat = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: 'You are a friendly and helpful assistant on the Social Sphere platform. Your goal is to guide users, answer their questions about the platform, and engage in friendly conversation. Keep your responses concise and positive.',
    },
  });
  return chat;
};