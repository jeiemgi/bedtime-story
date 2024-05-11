import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Colors } from "@/constants/Colors";
import { ThemedView } from "@/components/ThemedView";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
}
export function ThemedButton({ title, ...props }: ButtonProps) {
  const borderColor = useThemeColor(
    {
      light: Colors.light.text,
      dark: Colors.light.text,
    },
    "border",
  );
  return (
    <TouchableOpacity {...props}>
      <ThemedView style={[styles.container, { borderColor }]}>
        <ThemedText style={styles.title}>{title}</ThemedText>
      </ThemedView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderWidth: 2,
    borderRadius: 10,
  },
  title: {
    textAlign: "center",
    fontFamily: "SourceSansBold",
  },
});
