import { ThemedText } from "@/components/ThemedText";
import {
  View,
  StyleSheet,
  TouchableOpacityProps,
  TouchableOpacity,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ComponentProps } from "react";
import { MaterialIcons } from "@expo/vector-icons";

export type ThemedIconButtonProps = TouchableOpacityProps & {
  title?: string;
  icon: ComponentProps<typeof MaterialIcons>["name"];
};

export default function ThemedIconButton({
  icon,
  onPress,
  title,
}: ThemedIconButtonProps) {
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
        <MaterialIcons size={40} name={icon} color={Colors.light.text} />
        {title ? <ThemedText style={styles.text}>{title}</ThemedText> : null}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    aspectRatio: 1,
    width: 100,
    paddingVertical: 16,
    borderWidth: 2,
    borderRadius: 200,
  },
  inner: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 12,
    flexWrap: "wrap",
    textAlign: "center",
  },
});
