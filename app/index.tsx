import { StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import ThemedIconButton, {
  ThemedIconButtonProps,
} from "@/components/ThemedIconButton";
import ScreenTemplate from "@/components/ScreenTemplate";
import { useRouter } from "expo-router";

const profiles: Array<{
  name: string;
  icon: ThemedIconButtonProps["icon"];
  href: string;
}> = [
  {
    name: "Matt",
    icon: "toys",
    href: "story",
  },
  {
    name: "Alice",
    icon: "smart-toy",
    href: "story",
  },
  {
    name: "José",
    icon: "castle",
    href: "story",
  },
];

// const prompt = `Create a bedtime story for a ${age}-year-old interested in ${interests}.`;

export default function HomeScreen() {
  const router = useRouter();

  const onClick = (href: string, name?: string) => {
    if (name) {
      router.push(`${href}?name=${name}`);
    } else {
      router.push(href);
    }
  };

  return (
    <ScreenTemplate>
      <ThemedView>
        <ThemedView style={styles.titleContainer}>
          <ThemedText align={"center"} type="h2">
            Welcome to
          </ThemedText>
          <ThemedText align={"center"} type="h2">
            Bedtime Story✨
          </ThemedText>
        </ThemedView>

        <ThemedText align={"center"} style={styles.container}>
          Try one of this testing profiles to generate a new story with some AI
          Magic, you can also create your own.
        </ThemedText>

        <ThemedView style={styles.buttonGroup}>
          {profiles.map(({ href, name, icon }, index) => (
            <ThemedIconButton
              icon={icon}
              title={name}
              onPress={() => onClick(href, name)}
              key={`Home-Button-${index}`}
            />
          ))}
          <ThemedIconButton
            title={"New"}
            icon={"add"}
            onPress={() => onClick("profile-create")}
          />
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
  titleContainer: {
    marginVertical: 50,
  },
  container: {
    marginBottom: 32,
  },
});
