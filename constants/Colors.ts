/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorDark = "#fff";
const tintColorLight = "#5A2AFD";

export const Colors = {
  scheme: {
    primary: tintColorLight,
    primaryDark: "#2b1379",
    primaryLight: "#7c5ce5",
  },
  light: {
    text: "#11181C",
    background: "#fff",
    backgroundDif: "#f1f1f1",
    tint: tintColorLight,
    icon: "#6d0036",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    border: "#11181C",
  },
  dark: {
    text: "#ECEDEE",
    border: "#ECEDEE",
    background: "#151718",
    backgroundDif: "#232728",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
  },
};
