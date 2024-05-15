import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import Box from "@/components/themed/Box";
import Text from "@/components/themed/Text";
import IconButton from "@/components/themed/IconButton";
import ScreenTemplate from "@/components/themed/ScreenTemplate";
import { getAllProfiles, storeProfiles } from "@/js/AsyncStorage";
import { DEFAULT_PROFILES, StoryProfiles } from "@/constants/data";
import { type StoryProfile } from "@/constants/data";
import PressableText from "@/components/themed/PressableText";

export default function HomeScreen() {
  const router = useRouter();
  const [profiles, setProfiles] = useState<StoryProfiles>([]);

  const onClick = (profile?: StoryProfile) => {
    if (profile) {
      router.push(
        `profile` +
          `?name=${profile.name}` +
          `&age=${profile.age}` +
          `&icon=${profile.icon}` +
          `&interests=${profile.interests}`,
      );
    } else {
      router.push(`profile`);
    }
  };

  const onClean = () => {
    storeProfiles([]);
    setProfiles([]);
  };

  useEffect(() => {
    const initCheck = async () => {
      const storedProfiles = await getAllProfiles();
      if (storedProfiles) {
        setProfiles(storedProfiles);
      }
    };

    initCheck();
  }, []);

  return (
    <ScreenTemplate>
      <Box mb={4}>
        <Text align={"center"} type="h2">
          Welcome to {"\n"}
          Bedtime Story✨
        </Text>
      </Box>
      <Box mb={4}>
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
          <IconButton
            icon={profile.icon}
            title={profile.name}
            onPress={() => onClick(profile)}
            key={`Home-Button-${index}`}
          />
        ))}
        {profiles.map((profile, index) => (
          <IconButton
            title={profile.name}
            icon={profile.icon}
            onPress={() => onClick(profile)}
            key={`Home-Button-${index}`}
          />
        ))}
        <IconButton title={"New"} icon={"add"} onPress={() => onClick()} />
      </Box>

      {profiles ? (
        <Box my={8} alignItems={"center"}>
          <PressableText onPress={onClean} type={"subtitle"}>
            Clean Profiles
          </PressableText>
        </Box>
      ) : null}
    </ScreenTemplate>
  );
}

const styles = StyleSheet.create({
  buttonGroup: {
    gap: 4,
    marginBottom: 4,
    flexWrap: "wrap",
  },
});
