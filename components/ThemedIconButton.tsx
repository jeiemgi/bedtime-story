import { ThemedText } from "@/components/ThemedText";
import {
  View,
  StyleSheet,
  TouchableOpacityProps,
  TouchableHighlight,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ReactNode } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { ThemedView } from "@/components/ThemedView";

export type ThemedIconButtonProps = TouchableOpacityProps & {
  title?: string;
  icon: ReactNode;
};

export default function ThemedIconButton({
  icon,
  onPress,
  title,
}: ThemedIconButtonProps) {
  const backgroundColor = useThemeColor(
    { light: Colors.dark.background, dark: Colors.light.text },
    "background",
  );
  return (
    <ThemedView style={styles.button}>
      <LinearGradient
        style={styles.background}
        colors={["#9b9b9b", "#646464"]}
      />
      <TouchableHighlight
        onPress={onPress}
        activeOpacity={0.9}
        style={[styles.inner, { backgroundColor }]}
      >
        <View>
          <View style={styles.icon}>{icon}</View>
          {title ? (
            <ThemedText
              lightColor={Colors.dark.text}
              darkColor={Colors.light.text}
              style={styles.text}
            >
              {title}
            </ThemedText>
          ) : null}
        </View>
      </TouchableHighlight>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 2,
    width: 100,
    overflow: "hidden",
    borderRadius: 200,
  },
  background: {
    top: 0,
    left: 0,
    width: "120%",
    height: "120%",
    position: "absolute",
  },
  inner: {
    aspectRatio: 1,
    borderColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 200,
  },
  icon: {
    marginBottom: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 12,
    lineHeight: 14,
    flexWrap: "wrap",
    textAlign: "center",
  },
});
