import OpenAI from "openai";
import { OPEN_AI_API_KEY } from "@/constants";
import { ChatCompletion } from "openai/resources";

const openai = new OpenAI({
  apiKey: OPEN_AI_API_KEY,
});

type GenerateStory = (prompt: string) => Promise<ChatCompletion | null>;

export const generateStory: GenerateStory = async (prompt) => {
  return openai.chat.completions.create({
    max_tokens: 100,
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
  });
};
