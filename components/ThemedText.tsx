import { Text, type TextProps, StyleSheet, TextStyle } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

type TextType = keyof typeof styles;

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  align?: TextStyle["textAlign"];
  type?: TextType;
};

export function ThemedText({
  align,
  style,
  lightColor,
  darkColor,
  type = "default",
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  return (
    <Text
      style={[
        {
          color,
          textAlign: align,
        },
        styles[type] ? styles[type] : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: "SourceSans3",
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
    fontFamily: "SourceSans3",
  },
  caption: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: "SourceSans3",
  },
  display: {
    fontSize: 50,
    lineHeight: 55,
    fontFamily: "PlayfairDisplayBold",
  },
  h1: {
    fontSize: 40,
    lineHeight: 42,
    fontFamily: "PlayfairDisplayBold",
  },
  h2: {
    fontSize: 30,
    lineHeight: 35,
    fontFamily: "PlayfairDisplayBold",
  },
  h3: {
    fontSize: 20,
    lineHeight: 30,
    fontFamily: "PlayfairDisplayBold",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "SourceSans3",
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: "#0a7ea4",
    fontFamily: "SourceSans3",
  },
});
