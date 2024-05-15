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
      style={({ pressed }) => [
        { opacity: disabled || pressed ? 0.5 : 1 },
        props.style,
      ]}
      {...props}
    >
      <Text
        {...{
          type,
          align,
          lightColor: Colors.scheme.link,
          darkColor: Colors.scheme.link,
        }}
      >
        {children}
      </Text>
    </Pressable>
  );
}

export default PressableText;
