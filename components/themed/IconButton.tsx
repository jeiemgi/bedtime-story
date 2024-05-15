import {
  View,
  StyleSheet,
  TouchableOpacityProps,
  TouchableOpacity,
} from "react-native";
import Colors from "@/constants/Colors";
import Text from "@/components/themed/Text";
import useThemeColor from "@/hooks/useThemeColor";
import { MaterialIcons } from "@expo/vector-icons";
import { type ComponentProps } from "react";

export type IconButtonProps = TouchableOpacityProps & {
  title?: string;
  icon?: ComponentProps<typeof MaterialIcons>["name"];
};

export default function IconButton({ icon, onPress, title }: IconButtonProps) {
  const backgroundColor = useThemeColor(
    { light: Colors.light.background, dark: Colors.dark.text },
    "background",
  );

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.5}
      style={[styles.button, { backgroundColor }]}
    >
      <View style={styles.inner}>
        {icon ? (
          <MaterialIcons size={40} name={icon} color={Colors.light.text} />
        ) : null}
        {title ? (
          <Text numberOfLines={1} style={styles.text}>
            {title}
          </Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 95,
    height: 95,
    borderWidth: 2,
    borderRadius: 200,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  inner: {
    gap: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    lineHeight: 12,
    fontSize: 12,
    flexWrap: "wrap",
    textAlign: "center",
    paddingHorizontal: 16,
  },
});
