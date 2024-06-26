import { Stack } from "expo-router";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import Colors from "@/constants/Colors";
import { useEffect } from "react";
import { useFonts } from "expo-font";
import { ProfilesContextProvider } from "@/containers/ProfilesContext";
import useColorScheme from "@/hooks/useColorScheme";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    SourceSansMedium: require("../assets/fonts/SourceSans3-Medium.ttf"),
    SourceSansRegular: require("../assets/fonts/SourceSans3-Regular.ttf"),
    SourceSansSemiBold: require("../assets/fonts/SourceSans3-SemiBold.ttf"),
    SourceSansBold: require("../assets/fonts/SourceSans3-Bold.ttf"),
    PlayfairDisplayBold: require("../assets/fonts/PlayfairDisplay-Bold.ttf"),
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const headerTintColor =
    colorScheme === "dark" ? Colors.dark.tint : Colors.light.tint;

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <ProfilesContextProvider>
        <Stack
          screenOptions={{
            headerTintColor,
            headerTitle: "",
            headerTransparent: true,
            headerBackTitleVisible: false,
          }}
        >
          <Stack.Screen name={"index"} />
          <Stack.Screen name={"profile"} />
          <Stack.Screen name={"story"} />
          <Stack.Screen name={"+not-found"} />
        </Stack>
      </ProfilesContextProvider>
    </ThemeProvider>
  );
}
