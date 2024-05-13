import { StyleSheet, useColorScheme } from "react-native";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";
import { ThemedView } from "@/components/ThemedView";
import type { PropsWithChildren } from "react";

const HEADER_HEIGHT = 200;

export default function ParallaxScrollView({ children }: PropsWithChildren) {
  const colorScheme = useColorScheme() ?? "light";

  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const headerBackgroundColor = {
    light: "#f0f0f0",
    dark: "#1D3D47",
  };

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75],
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [2, 1, 1],
          ),
        },
      ],
    };
  });

  return (
    <ThemedView style={styles.container}>
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
        <Animated.View
          style={[
            styles.header,
            { backgroundColor: headerBackgroundColor[colorScheme] },
            headerAnimatedStyle,
          ]}
        >
          {/*<Video
            shouldPlay
            isLooping
            resizeMode={ResizeMode.COVER}
            style={styles.headerAsset}
            source={{
              uri: "https://cdn.dribbble.com/userupload/8603238/file/original-884dd8844c3fa4b38c9dd4d2d7c4c69a.mp4",
            }}
          />*/}
        </Animated.View>
        <ThemedView style={styles.content}>{children}</ThemedView>
      </Animated.ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: HEADER_HEIGHT,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  headerAsset: {
    top: 0,
    left: 0,
    height: HEADER_HEIGHT,
    width: "100%",
    position: "absolute",
  },
  blurContainer: {
    padding: 10,
    justifyContent: "center",
    overflow: "hidden",
  },
  content: {
    flex: 1,
    gap: 16,
    marginTop: -20,
    minHeight: 2000,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 32,
  },
});
