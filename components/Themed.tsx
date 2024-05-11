import React from "react";
import styled from "styled-components/native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Colors } from "@/constants/Colors";
import { ThemedText } from "@/components/ThemedText";

export const Input = styled.TextInput`
  font-size: 16px;
  line-height: 24px;
  padding: 8px 0;
  border-bottom-width: 2px;
  font-family: "SourceSans3";
`;

export const CheckBoxWrap = styled.TouchableOpacity`
  padding: 8px 16px;
  border-width: 2px;
  border-radius: 10px;
`;

export const CheckBox = ({
  label,
  checked,
  onPress,
}: {
  label: string;
  checked: boolean;
  onPress: (value: boolean) => void;
}) => {
  const borderColor = useThemeColor({
    light: Colors.light.border,
    dark: Colors.dark.border,
  });

  const color = useThemeColor({
    light: checked ? "#fff" : "#000",
    dark: checked ? "#000" : "#fff",
  });

  const backgroundColor = useThemeColor(
    {
      light: checked ? Colors.dark.background : Colors.light.background,
      dark: checked ? Colors.light.background : Colors.dark.background,
    },
    "background",
  );

  return (
    <CheckBoxWrap
      onPress={() => onPress(!checked)}
      style={{ backgroundColor, borderColor }}
    >
      <ThemedText style={{ color }} type={"caption"}>
        {label}
      </ThemedText>
    </CheckBoxWrap>
  );
};
