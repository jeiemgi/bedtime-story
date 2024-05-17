import { Alert } from "react-native";
import { getAllProfiles, storeProfiles } from "@/js/AsyncStorage";
import { createContext, useCallback, useContext, useState } from "react";
import { DEFAULT_PROFILES } from "@/constants/data";
import type { StoryProfile } from "@/js/StoryProfile";
import type { PropsWithChildren } from "react";

interface ProfilesContext {
  profiles: StoryProfile[];
  deleteAllProfiles: () => void;
  deleteProfile: (id: string) => void;
  saveProfile: (newProfile: StoryProfile) => void;
  getProfile: (id: string) => StoryProfile | undefined;
}

const initialContext = {
  profiles: DEFAULT_PROFILES,
  getProfile: () => undefined,
  saveProfile: () => undefined,
  deleteProfile: () => undefined,
  deleteAllProfiles: () => undefined,
};

export const ProfilesContext = createContext<ProfilesContext>(initialContext);

export const ProfilesContextProvider = ({ children }: PropsWithChildren) => {
  const [profiles, setProfiles] = useState<StoryProfile[]>(DEFAULT_PROFILES);

  const getProfile = useCallback((id: string) => {
    return profiles.find((i) => i.id === id);
  }, []);

  const saveProfile = useCallback(async (newProfile: StoryProfile) => {
    const storedProfiles = await getAllProfiles();
    if (storedProfiles && storedProfiles.length > 0) {
      if (storedProfiles.length !== 0) {
        // Add the profiles to the storage
        const newProfiles: StoryProfile[] = storedProfiles.map((storedP) => {
          if (storedP.id === newProfile.id) {
            return { ...storedP, ...newProfile };
          } else {
            return newProfile;
          }
        });
        await storeProfiles(newProfiles);
      }
    }
  }, []);

  const deleteProfile = useCallback(async (id: string) => {
    const onConfirm = async () => {
      const storedProfiles = (await getAllProfiles()) || [];
      const newProfiles: StoryProfile[] = [...storedProfiles].filter(
        (_p) => _p.id !== id,
      );
      await storeProfiles(newProfiles);
      setProfiles(newProfiles);
    };

    Alert.alert("Delete Profile?", "This action cannot be undone.", [
      { text: "Cancel" },
      { text: "Delete", style: "destructive", onPress: onConfirm },
    ]);
  }, []);

  const deleteAllProfiles = async () => {
    const onConfirm = async () => {
      await storeProfiles(DEFAULT_PROFILES);
      setProfiles(DEFAULT_PROFILES);
    };

    Alert.alert("Delete all profiles?", "All default profiles will stay", [
      { text: "Cancel" },
      { text: "Delete", style: "destructive", onPress: onConfirm },
    ]);
  };

  return (
    <ProfilesContext.Provider
      value={{
        profiles,
        getProfile,
        saveProfile,
        deleteProfile,
        deleteAllProfiles,
      }}
    >
      {children}
    </ProfilesContext.Provider>
  );
};

export const useProfilesContext = () => useContext(ProfilesContext);
