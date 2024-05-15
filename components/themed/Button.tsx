import useThemeColor from "@/hooks/useThemeColor";
import Colors from "@/constants/Colors";
import Text from "@/components/themed/Text";
import View from "@/components/themed/View";
import { Pressable, ViewStyle } from "react-native";
import styled from "styled-components/native";
import { type PressableProps } from "react-native";

interface ButtonProps extends PressableProps {
  title: string;
}

const InnerStyle = styled(View)`
  height: 60px;
  border-width: 2px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
`;

const ButtonText = styled(Text)`
  font-size: 20px;
  line-height: normal;
  font-family: "SourceSansBold";
`;

ButtonText.defaultProps = {
  lightColor: Colors.dark.text,
  darkColor: Colors.light.text,
};

function Button({ title, disabled, ...props }: ButtonProps) {
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
        <ButtonText>{title}</ButtonText>
      </InnerStyle>
    </Pressable>
  );
}

export default Button;
