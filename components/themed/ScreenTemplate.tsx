import {
  EdgeInsets,
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import View from "@/components/themed/View";
import { ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import styled from "styled-components/native";
import type { PropsWithChildren, ReactNode } from "react";

const Container = styled(View)`
  flex: 1;
`;

const Content = styled(SafeAreaView)`
  flex: 1;
  padding: 0 32px;
`;

type ScreenProps = PropsWithChildren<{
  BottomView?: ReactNode;
  safeAreaView?: boolean;
}>;

export default function ScreenTemplate({
  children,
  BottomView,
  safeAreaView,
}: ScreenProps) {
  const { top } = useSafeAreaInsets();
  return (
    <Container style={{ paddingTop: top }}>
      <Content>{children}</Content>
      {BottomView ? <ScreenBottom>{BottomView}</ScreenBottom> : null}
    </Container>
  );
}

export function ScreenTemplateScroll({ children, BottomView }: ScreenProps) {
  const { top } = useSafeAreaInsets();

  return (
    <Container>
      <ScrollView
        contentContainerStyle={{
          paddingTop: top,
          paddingBottom: BottomView ? 150 : 0,
        }}
      >
        <Content>{children}</Content>
      </ScrollView>

      {BottomView ? <ScreenBottom>{BottomView}</ScreenBottom> : null}
    </Container>
  );
}
export const ScreenBottom = ({ children }: PropsWithChildren) => {
  const insets = useSafeAreaInsets();
  return (
    <BottomGradient
      locations={[0, 0.33, 0.7]}
      colors={[
        "rgba(255,255,255,0)",
        "rgba(255,255,255,0.7)",
        "rgba(255,255,255, 0.8)",
      ]}
    >
      <ScreenBottomStyle $insets={insets}>{children}</ScreenBottomStyle>
    </BottomGradient>
  );
};

const ScreenBottomStyle = styled.View<{ $insets: EdgeInsets }>`
  padding: ${(props) => `32px ${props.$insets.bottom}px`};
`;

const BottomGradient = styled(LinearGradient)`
  left: 0;
  bottom: 0;
  width: 100%;
  position: absolute;
`;
