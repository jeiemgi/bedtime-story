import { Text } from "@/components/Text";
import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import styled from "styled-components/native";

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
      <Text style={{ color }} type={"caption"}>
        {label}
      </Text>
    </CheckBoxWrap>
  );
};

export default CheckBox;
