import Box from "@/components/themed/Box";
import Text from "@/components/themed/Text";
import { ModalProps, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Modal from "@/components/themed/Modal";
import { IconButtonProps } from "@/components/themed/IconButton";
import styled from "styled-components/native";

const icons: IconButtonProps["icon"][] = [
  "person",
  "celebration",
  "toys",
  "smart-toy",
  "smart-toy",
  "child-care",
];

const PressableStyle = styled.Pressable`
  aspect-ratio: 1;
  align-self: center;
  align-items: center;
  justify-content: center;
  padding: 16px;
`;

function IconsModal({
  onItemPress,
  ...props
}: ModalProps & { onItemPress: (iconName: string) => void }) {
  return (
    <Modal {...props} animationType="slide" transparent={true}>
      <Box mb={4}>
        <Text type={"h1"}>Icons</Text>
      </Box>
      <Box
        flexDirection={"row"}
        justifyContent={"flex-start"}
        style={{ gap: 8, flexWrap: "wrap" }}
      >
        {icons.map((icon, index) => (
          <PressableStyle
            key={`Icon-${index}`}
            onPress={() => onItemPress(icon)}
          >
            <MaterialIcons size={50} name={icon} />
          </PressableStyle>
        ))}
      </Box>
    </Modal>
  );
}

export default IconsModal;
