import Box from "@/components/themed/Box";
import Text from "@/components/themed/Text";
import Modal from "@/components/themed/Modal";
import Pressable from "@/components/themed/Pressable";
import { MaterialIcons } from "@expo/vector-icons";
import styled from "styled-components/native";
import type { ModalProps } from "react-native";
import type { IconButtonProps } from "@/components/themed/IconButton";
import useThemeColor from "@/hooks/useThemeColor";

const icons: IconButtonProps["icon"][] = [
  "person",
  "celebration",
  "toys",
  "smart-toy",
  "smart-toy",
  "child-care",
];

const PressableStyle = styled(Pressable)`
  padding: 16px;
  aspect-ratio: 1;
  align-self: center;
  align-items: center;
  justify-content: center;
  border-radius: 100px;
`;

function IconsModal({
  onItemPress,
  ...props
}: ModalProps & { onItemPress: (iconName: string) => void }) {
  const backgroundColor = useThemeColor({}, "backgroundDif");

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
        {icons.map((icon, index) =>
          icon ? (
            <PressableStyle
              key={`Icon-${index}`}
              onPress={() => onItemPress(icon)}
              style={{ backgroundColor }}
            >
              <MaterialIcons size={50} name={icon} />
            </PressableStyle>
          ) : null,
        )}
      </Box>
    </Modal>
  );
}

export default IconsModal;
