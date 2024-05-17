import OpenAI from "openai";
import { OPEN_AI_API_KEY } from "@/constants";

export const OpenAIAPI = new OpenAI({
  apiKey: OPEN_AI_API_KEY,
});
