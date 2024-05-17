import useThemeColor from "@/hooks/useThemeColor";
import Colors from "@/constants/Colors";
import Text from "@/components/themed/Text";
import View from "@/components/themed/View";
import { Falsy, Pressable, ViewStyle } from "react-native";
import styled from "styled-components/native";
import { type PressableProps } from "react-native";

interface ButtonProps extends PressableProps {
  title: string;
}

function Button({ title, disabled, ...props }: ButtonProps) {
  const backgroundPressable = useThemeColor({}, "background");

  const backgroundColor = useThemeColor({
    light: Colors.dark.background,
    dark: Colors.light.background,
  });

  return (
    <PressableStyle
      disabled={disabled}
      style={[
        { backgroundColor: backgroundPressable },
        props.style as ViewStyle,
      ]}
      {...props}
    >
      {({ pressed }) => (
        <InnerStyle
          $pressed={pressed}
          $disabled={disabled}
          style={{ backgroundColor }}
        >
          <ButtonText>{title}</ButtonText>
        </InnerStyle>
      )}
    </PressableStyle>
  );
}

const PressableStyle = styled(Pressable)`
  height: 60px;
  overflow: hidden;
  border-radius: 16px;
`;

const InnerStyle = styled(View)<{
  $pressed: boolean | null | undefined;
  $disabled: boolean | null | undefined;
}>`
  height: 100%;
  border-width: 2px;
  align-items: center;
  justify-content: center;
  opacity: ${(props) => (props.$pressed || props.$disabled ? 0.5 : 1)};
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

export default Button;
