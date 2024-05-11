import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import styled from "styled-components/native";

SplashScreen.preventAutoHideAsync();

const HeaderWrapper = styled.View`
  padding: 16px;
`;
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

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="story-create" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
