import { Pressable as PressableRaw } from "react-native";
import type { PropsWithChildren } from "react";
import type {
  PressableProps as PressableRawProps,
  ViewStyle,
} from "react-native";

type PressableProps = PropsWithChildren<
  PressableRawProps & { activeOpacity?: number }
>;

export const Pressable = ({
  children,
  activeOpacity = 0.9,
  ...props
}: PropsWithChildren<PressableProps>) => {
  return (
    <PressableRaw
      style={({ pressed }) => [
        { opacity: pressed ? activeOpacity : 1 },
        props.style as ViewStyle,
      ]}
      {...props}
    >
      {children}
    </PressableRaw>
  );
};

export default Pressable;
