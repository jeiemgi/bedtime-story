import { useFormik } from "formik";
import Box from "@/components/themed/Box";
import Colors from "@/constants/Colors";
import Input from "@/components/themed/Input";
import Text from "@/components/themed/Text";
import IconsModal from "@/containers/IconsModal";
import IconButton from "@/components/themed/IconButton";
import Button from "@/components/themed/Button";
import { number, object, string } from "yup";
import { useState } from "react";
import { type StoryProfile } from "@/constants/data";
import PressableText from "@/components/themed/PressableText";

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

const defaultInitialValues = {
  id: 0,
  age: "",
  name: "",
  interests: "",
  icon: "",
};

const requiredMsg = "This field is required.";
const numberMsg = "This field should be a number.";

const validationSchema = object().shape({
  name: string().required(requiredMsg),
  age: number().typeError(numberMsg).required(requiredMsg),
  interests: string().required(requiredMsg),
  icon: string().required(requiredMsg),
});

function ProfileCreateForm({
  onSubmit,
  initialValues = defaultInitialValues,
}: {
  initialValues?: Omit<StoryProfile, "icon">;
  onSubmit: (values: StoryProfile) => void;
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    values,
    errors,
    isValid,
  } = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: false,
    onSubmit,
  });

  return (
    <>
      <IconsModal
        visible={modalVisible}
        onItemPress={(iconName) => {
          setModalVisible(false);
          setFieldValue("icon", iconName);
        }}
      />

      <Box flex={1}>
        <Box mb={4}>
          <Text type={"h1"} align={"center"}>
            {values.name ? `${values.name}'s Profile` : "New profile"}
          </Text>
        </Box>

        <Box flex={1}>
          <Box mb={4} alignItems={"center"}>
            <Box mb={1}>
              <IconButton
                disabled
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

          <Box mb={4}>
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

        <Button
          disabled={!isValid}
          title={"Create my story"}
          onPress={() => handleSubmit()}
        />
      </Box>
    </>
  );
}

export default ProfileCreateForm;
