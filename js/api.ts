import OpenAI from "openai";
import { OPEN_AI_API_KEY } from "@/constants";
import { ChatCompletion } from "openai/resources";

const openai = new OpenAI({
  apiKey: OPEN_AI_API_KEY,
});

type GenerateStory = (prompt: string) => Promise<ChatCompletion | null>;

export const getPrompt = (age: string, interests: string) => {
  return `Write a really short bedtime story for a ${age}-year-old whose interests are ${interests}.
  Write it about something he is interested in, not about himself, try to be concise and straight to the story, do not give context.`;
};

export const generateStory: GenerateStory = async (prompt) => {
  return openai.chat.completions.create({
    max_tokens: 100,
    model: "gpt-3.5-turbo",
    messages: [
      { role: "user", content: prompt },
      { role: "user", content: "What's the title?" },
    ],
  });
};
