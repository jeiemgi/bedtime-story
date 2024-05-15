import React from "react";
import { Pressable, type PressableProps } from "react-native";
import Text, { type TextProps } from "@/components/themed/Text";
import Colors from "@/constants/Colors";

function PressableText({
  children,
  lightColor,
  darkColor,
  align,
  type,
  disabled,
  ...props
}: PressableProps & TextProps) {
  return (
    <Pressable
      disabled={disabled}
      style={({ pressed }) => [
        {
          opacity: disabled ? 0.2 : pressed ? 0.5 : 1,
        },
        props.style,
      ]}
      {...props}
    >
      <Text
        {...{
          type,
          align,
          lightColor: disabled ? Colors.light.text : Colors.scheme.link,
          darkColor: disabled ? Colors.dark.text : Colors.scheme.link,
        }}
      >
        {children}
      </Text>
    </Pressable>
  );
}

export default PressableText;
