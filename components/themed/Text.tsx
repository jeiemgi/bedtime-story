import useThemeColor from "@/hooks/useThemeColor";
import { Text as RawText, StyleSheet, TextStyle } from "react-native";
import { type TextProps as RNTextProps } from "react-native";

export type TextType = keyof typeof styles;

export type TextProps = RNTextProps & {
  lightColor?: string;
  darkColor?: string;
  align?: TextStyle["textAlign"];
  type?: TextType;
};

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

function Text({
  align,
  style,
  lightColor,
  darkColor,
  type = "default",
  ...rest
}: TextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  return (
    <RawText
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

export default Text;
