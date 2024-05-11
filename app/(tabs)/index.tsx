import { StyleSheet, useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import ThemedIconButton from "@/components/ThemedIconButton";
import ScreenTemplate from "@/components/ScreenTemplate";
import { useRouter } from "expo-router";
import { ComponentProps } from "react";

const profiles: Array<{
  name: string;
  iconName: HomeButtonProps["iconName"];
}> = [
  {
    name: "Matt",
    iconName: "toys",
  },
  {
    name: "Alice",
    iconName: "smart-toy",
  },
  {
    name: "José",
    iconName: "castle",
  },
];

interface HomeButtonProps {
  name: string;
  iconName: ComponentProps<typeof MaterialIcons>["name"];
  onPress: () => void;
}
const HomeButton = ({
  name,
  iconName,
  onPress,
}: {
  name: string;
  iconName: ComponentProps<typeof MaterialIcons>["name"];
  onPress: () => void;
}) => {
  return (
    <ThemedIconButton
      title={name}
      onPress={onPress}
      icon={
        <MaterialIcons
          size={20}
          name={iconName}
          color={Colors.light.background}
        />
      }
    />
  );
};
export default function HomeScreen() {
  const router = useRouter();
  const onClick = () => {
    router.push("/story-create");
  };

  return (
    <ScreenTemplate title={"Welcome"}>
      <ThemedView>
        <ThemedView style={styles.titleContainer}>
          <ThemedText style={styles.title} type="h2">
            Bedtime Story
          </ThemedText>
          <ThemedText type={"caption"}>
            Where every night is an adventure ✨
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.container}>
          <ThemedText>
            Try one of this profiles to generate a story with some AI Magic.
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.buttonGroup}>
          {profiles.map((item, index) => (
            <HomeButton
              key={`HomeButton-${index}`}
              onPress={onClick}
              {...item}
            />
          ))}
          <HomeButton onPress={onClick} name={"New"} iconName={"add"} />
        </ThemedView>
      </ThemedView>
    </ScreenTemplate>
  );
}

const styles = StyleSheet.create({
  buttonGroup: {
    gap: 8,
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "space-evenly",
  },
  title: {
    marginBottom: 8,
  },
  titleContainer: {
    marginBottom: 32,
  },
  container: {
    marginBottom: 32,
  },
});
