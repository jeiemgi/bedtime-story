import { useFormik } from "formik";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { number, object, string } from "yup";
import { Colors } from "@/constants/Colors";
import { View } from "react-native";
import { Input } from "@/components/Themed";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import styled from "styled-components/native";
import { StoryProfile } from "@/app/story";

const ErrorMessage = ({ error }: { error: string | undefined }) => {
  return (
    <>
      {error ? (
        <ThemedText
          lightColor={Colors.scheme.error}
          darkColor={Colors.scheme.error}
          type={"caption"}
        >
          {error}
        </ThemedText>
      ) : null}
    </>
  );
};

const initialValues = {
  age: "12",
  name: "José",
  interests: "Astronauts, Cars",
};

const requiredMsg = "This field is required.";
const numberMsg = "This field should be a number.";

const validationSchema = object().shape({
  name: string().required(requiredMsg),
  age: number().typeError(numberMsg).required(requiredMsg),
  interests: string().required(requiredMsg),
});

function ProfileCreateForm({
  onSubmit,
}: {
  onSubmit: (values: StoryProfile) => void;
}) {
  const { handleChange, handleBlur, handleSubmit, values, errors, isValid } =
    useFormik({
      initialValues,
      validationSchema,
      validateOnBlur: false,
      onSubmit,
    });

  const { top, bottom } = useSafeAreaInsets();
  return (
    <View style={{ flex: 1, paddingTop: top, paddingBottom: bottom }}>
      <FormContainer>
        <InputWrapper>
          <ThemedText type={"caption"}>Tell us your name:</ThemedText>
          <Input
            value={values.name}
            onBlur={handleBlur("name")}
            onChangeText={handleChange("name")}
            placeholder={"e.g Thomas"}
          />
          <ErrorMessage error={errors.name} />
        </InputWrapper>

        <InputWrapper>
          <ThemedText type={"caption"}>How old are you?</ThemedText>
          <Input
            value={values.age}
            placeholder={"e.g 5"}
            inputMode={"numeric"}
            onBlur={handleBlur("age")}
            onChangeText={handleChange("age")}
          />
          <ErrorMessage error={errors.age} />
        </InputWrapper>

        <InputWrapper>
          <ThemedText type={"caption"}>What are you interested in?</ThemedText>
          <Input
            value={values.interests}
            onBlur={handleBlur("interests")}
            onChangeText={handleChange("interests")}
            placeholder={"e.g Astronauts, Trucks, Castles."}
          />
          <ErrorMessage error={errors.interests} />
        </InputWrapper>
      </FormContainer>

      <ThemedButton
        disabled={!isValid}
        title={"Create my story"}
        onPress={() => handleSubmit()}
      />
    </View>
  );
}

const FormContainer = styled.View`
  flex: 1;
`;

const InputWrapper = styled.View`
  gap: 8px;
  width: 100%;
  margin-bottom: 16px;
`;

export default ProfileCreateForm;
