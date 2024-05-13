import styled from "styled-components/native";
import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Pressable, ViewStyle } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { type PressableProps } from "react-native";

interface ButtonProps extends PressableProps {
  title: string;
}

const InnerStyle = styled(ThemedView)`
  height: 60px;
  border-width: 2px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
`;

const Text = styled(ThemedText)`
  font-size: 20px;
  line-height: normal;
  font-family: "SourceSansBold";
`;

Text.defaultProps = {
  lightColor: Colors.dark.text,
  darkColor: Colors.light.text,
};

export function ThemedButton({ title, disabled, ...props }: ButtonProps) {
  const backgroundColor = useThemeColor({
    light: Colors.dark.background,
    dark: Colors.dark.background,
  });

  return (
    <Pressable
      style={({ pressed }) => [
        { opacity: disabled || pressed ? 0.5 : 1 },
        props.style as ViewStyle,
      ]}
      {...props}
    >
      <InnerStyle style={{ backgroundColor }}>
        <Text>{title}</Text>
      </InnerStyle>
    </Pressable>
  );
}
