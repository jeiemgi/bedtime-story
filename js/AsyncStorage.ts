import AsyncStorage from "@react-native-async-storage/async-storage";
import { DEFAULT_PROFILES, StoryProfile } from "@/constants/data";

const ASYNC_STORAGE_PROFILES_KEY = "bedtime_story";

export const storeProfiles = async (value: typeof DEFAULT_PROFILES) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(ASYNC_STORAGE_PROFILES_KEY, jsonValue);
  } catch (e) {
    return e;
  }
};

export const getAllProfiles: () => Promise<
  StoryProfile[] | undefined
> = async () => {
  try {
    const value = await AsyncStorage.getItem(ASYNC_STORAGE_PROFILES_KEY);
    if (value !== null) return JSON.parse(value);
    else return undefined;
  } catch (e) {
    return e;
  }
};
