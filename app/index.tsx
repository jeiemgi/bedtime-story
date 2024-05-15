import { Alert, StyleSheet } from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import Box from "@/components/themed/Box";
import Text from "@/components/themed/Text";
import IconButton from "@/components/themed/IconButton";
import ScreenTemplate from "@/components/themed/ScreenTemplate";
import PressableText from "@/components/themed/PressableText";
import HomeProfileButton from "@/containers/HomeProfileButton";
import { getAllProfiles, storeProfiles } from "@/js/AsyncStorage";
import { DEFAULT_PROFILES, StoryProfiles } from "@/constants/data";
import { type StoryProfile } from "@/constants/data";

export default function HomeScreen() {
  const router = useRouter();
  const [profiles, setProfiles] = useState<StoryProfiles>([]);

  useFocusEffect(
    useCallback(() => {
      const initCheck = async () => {
        const storedProfiles = await getAllProfiles();
        if (storedProfiles) {
          setProfiles(storedProfiles);
        }
      };
      initCheck();
    }, []),
  );

  const onClick = (profile: StoryProfile) => {
    router.push(
      `profile` +
        `?id=${profile.id}` +
        `&name=${profile.name}` +
        `&age=${profile.age}` +
        `&icon=${profile.icon}` +
        `&interests=${profile.interests}`,
    );
  };

  const onDeleteItem = (profile: StoryProfile) => {
    const deleteProfile = async () => {
      const storedProfiles = (await getAllProfiles()) || [];
      const newProfiles: StoryProfile[] = [...storedProfiles].filter(
        (_p) => _p.id !== profile.id,
      );
      await storeProfiles(newProfiles);
      setProfiles(newProfiles);
    };

    Alert.alert("Delete Profile?", "This action cannot be undone.", [
      { text: "Cancel" },
      { text: "Delete", style: "destructive", onPress: deleteProfile },
    ]);
  };

  const onClean = async () => {
    const cleanProfiles = async () => {
      await storeProfiles([]);
      setProfiles([]);
    };

    Alert.alert("Delete all profiles?", "All default profiles will stay", [
      { text: "Cancel" },
      { text: "Delete", style: "destructive", onPress: cleanProfiles },
    ]);
  };

  const allProfiles = useMemo(
    () => [...DEFAULT_PROFILES, ...profiles],
    [profiles],
  );

  return (
    <ScreenTemplate>
      <Box>
        <Text align={"center"} type="h1">
          Welcome to {"\n"}
          Bedtime Story✨
        </Text>
      </Box>
      <Box my={6}>
        <Text align={"center"}>
          Try one of this testing profiles to generate a new story with some AI
          Magic, you can also create your own.
        </Text>
      </Box>

      <Box
        flexDirection={"row"}
        justifyContent={"center"}
        style={styles.buttonGroup}
      >
        {DEFAULT_PROFILES.map((profile, index) => (
          <HomeProfileButton
            key={`Profile-Button-${index}`}
            onPress={() => onClick(profile)}
            profile={{ ...profile, id: `${index}` }}
          />
        ))}
        {profiles.map((profile, index) => (
          <HomeProfileButton
            key={`Profile-Button-${index}`}
            onDelete={() => onDeleteItem(profile)}
            onPress={() => onClick(profile)}
            profile={{ ...profile, id: `${index}` }}
          />
        ))}
        <IconButton
          title={"New"}
          icon={"add"}
          onPress={() => router.push(`profile?id=${allProfiles.length + 1}`)}
        />
      </Box>

      {profiles ? (
        <Box my={8} alignItems={"center"}>
          <PressableText
            type={"subtitle"}
            onPress={onClean}
            disabled={profiles.length === 0}
          >
            Clean Profiles
          </PressableText>
        </Box>
      ) : null}
    </ScreenTemplate>
  );
}

const styles = StyleSheet.create({
  buttonGroup: {
    gap: 16,
    marginBottom: 4,
    flexWrap: "wrap",
  },
});
