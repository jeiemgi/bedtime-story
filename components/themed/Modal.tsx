import React from "react";
import { Modal as RawModal, ModalProps, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled from "styled-components/native";
import View from "@/components/themed/View";

const ModalStyle = styled(RawModal)`
  flex: 1;
  background-color: red;
`;

const ModalContent = styled(View)`
  flex: 1;
`;

function Modal({ children, ...props }: ModalProps) {
  const { top, bottom } = useSafeAreaInsets();
  return (
    <ModalStyle {...props}>
      <ModalContent>
        <ScrollView
          contentContainerStyle={{
            paddingTop: top,
            paddingBottom: bottom,
            paddingHorizontal: 32,
          }}
        >
          {children}
        </ScrollView>
      </ModalContent>
    </ModalStyle>
  );
}

export default Modal;
