import { ScrollView, StyleSheet, View } from "react-native";
import type { PropsWithChildren, ReactNode } from "react";
import { ThemedView } from "@/components/ThemedView";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";
import styled from "styled-components/native";
import { ThemedButton } from "@/components/ThemedButton";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/Colors";

const HEADER_HEIGHT = 200;
interface Props {
  title?: string;
  BottomView: ReactNode;
}

export default function ScreenTemplate({
  title,
  children,
  BottomView,
}: PropsWithChildren<Props>) {
  const { top, bottom } = useSafeAreaInsets();
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={{ paddingTop: top }}>
        {title ? (
          <ThemedText style={styles.title} type={"display"}>
            {title}
          </ThemedText>
        ) : null}
      </ThemedView>

      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <ThemedView style={styles.content}>{children}</ThemedView>
      </ScrollView>
      {BottomView ? (
        <BottomGradient
          style={{ paddingBottom: bottom }}
          colors={["white", "white"]}
        >
          {BottomView}
        </BottomGradient>
      ) : null}
    </ThemedView>
  );
}

const BottomGradient = styled(LinearGradient)`
  flex: 1;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 120px;
  padding-left: 32px;
  padding-right: 32px;
  position: absolute;
`;

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
  title: {
    paddingVertical: 8,
    paddingHorizontal: 32,
  },
  content: {
    flex: 1,
    paddingHorizontal: 32,
  },
});
