import { StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

function OnBoarding() {
  return (
    <ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type={"defaultSemiBold"}>1. Personalize</ThemedText>
        <ThemedText>
          Tell us a little about your child—like their age, interests, and
          favorite characters. This helps us tailor stories that spark their
          curiosity and joy.
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type={"defaultSemiBold"}>2. Create</ThemedText>
        <ThemedText>
          With just a few taps, generate a unique story crafted specifically for
          your child. Our AI-driven platform uses the details you provide to
          ensure each story resonates and enriches.
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type={"defaultSemiBold"}>3. Enjoy</ThemedText>
        <ThemedText>
          Read aloud and watch your child marvel at a tale where their interests
          come to life. Save your favorites and share them with friends and
          family for more smiles around.
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 16,
  },
  image: {
    height: "100%",
    width: "100%",
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});

export default OnBoarding;
