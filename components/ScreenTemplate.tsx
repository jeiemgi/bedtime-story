import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { ThemedView } from "@/components/ThemedView";
import { LinearGradient } from "expo-linear-gradient";
import styled from "styled-components/native";
import type { PropsWithChildren, ReactNode } from "react";
import { ScrollView } from "react-native";

const Container = styled(ThemedView)`
  flex: 1;
`;

const Content = styled(SafeAreaView)`
  flex: 1;
  padding: 0 32px;
`;

export default function ScreenTemplate({ children }: PropsWithChildren) {
  const { top } = useSafeAreaInsets();

  return (
    <Container style={{ paddingTop: top }}>
      <Content>{children}</Content>
    </Container>
  );
}

export function ScreenTemplateScroll({
  children,
  BottomView,
}: PropsWithChildren<{ BottomView?: ReactNode }>) {
  const { top } = useSafeAreaInsets();

  return (
    <Container style={{ paddingTop: top }}>
      <Container as={SafeAreaView}>
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 32,
            paddingBottom: BottomView ? 150 : 0,
          }}
        >
          {children}
        </ScrollView>
      </Container>
      <ScreenBottom>{BottomView}</ScreenBottom>
    </Container>
  );
}
export const ScreenBottom = ({ children }: { children: ReactNode }) => {
  const { bottom } = useSafeAreaInsets();
  return (
    <BottomGradient
      style={{ paddingVertical: bottom }}
      locations={[0, 0.5]}
      colors={["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.8)"]}
    >
      {children}
    </BottomGradient>
  );
};

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
