import { OpenAIAPI } from "@/js/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { IconButtonProps } from "@/components/themed/IconButton";

const ASYNC_STORAGE_PROFILES_KEY = "bedtime_story";

export type StoryProfile = {
  id: string;
  age: string;
  name: string;
  interests: string;
  icon: IconButtonProps["icon"] | "";
  isDefault: boolean;
};

export const getProfilePath = (
  page: string,
  { name, id, age, icon, interests }: StoryProfile,
) => {
  return (
    `/${page}` +
    `?name=${name}` +
    `&id=${id}` +
    `&age=${age}` +
    `&icon=${icon}` +
    `&interests=${interests}`
  );
};

export const isProfileValid = (profile: Partial<StoryProfile>) => {
  return (
    profile &&
    profile.id &&
    profile.age &&
    profile.icon &&
    profile.interests &&
    profile.name
  );
};

export class StoryProfileController {
  id: string;
  age = "";
  name = "";
  interests = "";
  icon: IconButtonProps["icon"] | "";

  constructor({ id, age, name, interests, icon }: StoryProfile) {
    this.id = id;
    this.age = age;
    this.name = name;
    this.icon = icon;
    this.interests = interests;
  }

  get isValid() {
    return isProfileValid(this);
  }

  storeProfiles = async (value: StoryProfile[]) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(ASYNC_STORAGE_PROFILES_KEY, jsonValue);
    } catch (e) {
      return e;
    }
  };

  getAllProfiles: () => Promise<StoryProfile[] | undefined> = async () => {
    try {
      const value = await AsyncStorage.getItem(ASYNC_STORAGE_PROFILES_KEY);
      if (value !== null) return JSON.parse(value);
      else return undefined;
    } catch (e) {
      return e;
    }
  };

  get storyPrompt() {
    return (
      `Write a really short bedtime story for a ${this.age}-year-old whose interests are ${this.interests}.` +
      `Write it about something he is interested in, not about himself, ` +
      `try to be concise and straight to the story, do not give context.`
    );
  }

  generateStory = async () => {
    return OpenAIAPI.chat.completions.create({
      model: "gpt-4",
      max_tokens: 100,
      stream: true,
      messages: [{ role: "user", content: this.storyPrompt }],
    });
  };
}
