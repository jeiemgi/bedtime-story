import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useProfilesContext } from "@/containers/ProfilesContext";
import Box from "@/components/themed/Box";
import Text from "@/components/themed/Text";
import IconButton from "@/components/themed/IconButton";
import ScreenTemplate from "@/components/themed/ScreenTemplate";
import PressableText from "@/components/themed/PressableText";
import HomeProfileButton from "@/containers/HomeProfileButton";
import { DEFAULT_PROFILES } from "@/constants/data";

export default function HomeScreen() {
  const router = useRouter();
  const { profiles, deleteProfile, deleteAllProfiles } = useProfilesContext();

  const onClick = (id: string) => {
    router.push(`profile?id=${id}`);
  };

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
        {profiles.map((profile, index) => (
          <HomeProfileButton
            profile={profile}
            onPress={() => onClick(profile.id)}
            onDelete={
              !profile.isDefault ? () => deleteProfile(profile.id) : undefined
            }
            key={`HomeProfileButton-${profile.id}`}
          />
        ))}
        <IconButton
          title={"New"}
          icon={"add"}
          onPress={() => router.push(`profile?id=${profiles.length + 1}`)}
        />
      </Box>

      {profiles ? (
        <Box my={8} alignItems={"center"}>
          <PressableText
            type={"subtitle"}
            onPress={deleteAllProfiles}
            disabled={profiles.length === DEFAULT_PROFILES.length}
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
