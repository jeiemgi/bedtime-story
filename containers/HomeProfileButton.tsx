import Box from "@/components/themed/Box";
import IconButton from "@/components/themed/IconButton";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import styled from "styled-components/native";
import type { StoryProfile } from "@/js/StoryProfile";

function HomeProfileButton({
  profile,
  onDelete,
  ...props
}: {
  profile: StoryProfile;
  onPress: () => void;
  onDelete?: (id: string) => void;
}) {
  return (
    <Box>
      {profile.icon !== "" ? (
        <IconButton
          {...props}
          icon={profile.icon}
          title={profile.name}
          onPress={props.onPress}
        />
      ) : null}
      {onDelete ? (
        <PressableStyle onPress={() => onDelete(profile.id)}>
          <MaterialIcons size={20} color={"white"} name={"delete"} />
        </PressableStyle>
      ) : null}
    </Box>
  );
}

const PressableStyle = styled.Pressable`
  top: -5px;
  left: -5px;
  padding: 8px;
  border-radius: 50px;
  background-color: ${Colors.scheme.error};
  align-self: center;
  position: absolute;
`;

export default HomeProfileButton;
