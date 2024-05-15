import { type ViewProps } from "react-native";
import { View as RawView } from "react-native";
import useThemeColor from "@/hooks/useThemeColor";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

function View({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background",
  );

  return <RawView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export default View;
