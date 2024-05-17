import { useState } from "react";
import { FormikProps } from "formik";
import Box from "@/components/themed/Box";
import Colors from "@/constants/Colors";
import Input from "@/components/themed/Input";
import Text from "@/components/themed/Text";
import IconsModal from "@/containers/IconsModal";
import IconButton from "@/components/themed/IconButton";
import type { StoryProfile } from "@/js/StoryProfile";

const InputErrorMessage = ({ error }: { error: string | undefined }) => {
  return (
    <>
      {error ? (
        <Text
          lightColor={Colors.scheme.error}
          darkColor={Colors.scheme.error}
          type={"caption"}
        >
          {error}
        </Text>
      ) : null}
    </>
  );
};

interface Props extends FormikProps<StoryProfile> {
  initialValues: StoryProfile;
}
function ProfileCreateForm({
  setFieldValue,
  values,
  errors,
  handleBlur,
  handleChange,
}: Props) {
  const [modalVisible, setModalVisible] = useState(false);

  const onIconPress = async (iconName: string) => {
    await setFieldValue("icon", iconName);
    setModalVisible(false);
  };

  return (
    <>
      <IconsModal onItemPress={onIconPress} visible={modalVisible} />
      <Box flex={1}>
        <Input $hidden readOnly value={values.id} />
        <Input $hidden readOnly value={values.icon} />

        <Box>
          <Text
            type={"display"}
            align={"center"}
            numberOfLines={1}
            lightColor={values.name ? "black" : "white"}
          >
            {values.name ? ` ${values.name}'s` : ""}
          </Text>

          <Text align={"center"} type={"caption"}>
            {values.name ? "profile" : " "}
          </Text>

          <Box my={4} alignItems={"center"}>
            <Box mb={1}>
              <IconButton
                icon={values.icon ? values.icon : "add"}
                onPress={() => setModalVisible(true)}
              />
            </Box>
            <InputErrorMessage error={errors.icon} />
          </Box>

          <Box mb={4}>
            <Text type={"caption"}>Tell us your name:</Text>
            <Input
              value={values.name}
              onBlur={handleBlur("name")}
              onChangeText={handleChange("name")}
              placeholder={"e.g Thomas"}
            />
            <InputErrorMessage error={errors.name} />
          </Box>

          <Box mb={4}>
            <Text type={"caption"}>How old are you?</Text>
            <Input
              value={values.age}
              placeholder={"e.g 5"}
              inputMode={"numeric"}
              onBlur={handleBlur("age")}
              onChangeText={handleChange("age")}
            />
            <InputErrorMessage error={errors.age} />
          </Box>

          <Box>
            <Text type={"caption"}>What are you interested in?</Text>
            <Input
              value={values.interests}
              onBlur={handleBlur("interests")}
              onChangeText={handleChange("interests")}
              placeholder={"e.g Astronauts, Trucks, Castles."}
            />
            <InputErrorMessage error={errors.interests} />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default ProfileCreateForm;
