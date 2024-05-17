import { useMemo, useState } from "react";
import { useFormik } from "formik";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useProfilesContext } from "@/containers/ProfilesContext";
import { number, object, string } from "yup";
import { KeyboardAvoidingView } from "react-native";
import ScreenTemplate, {
  ScreenBottom,
  ScreenTemplateScroll,
} from "@/components/themed/ScreenTemplate";
import ProfileCreateForm from "@/containers/profile/ProfileCreateForm";
import type { StoryProfile } from "@/js/StoryProfile";
import IconsModal from "@/containers/IconsModal";
import Box from "@/components/themed/Box";
import Button from "@/components/themed/Button";

const defaultInitialValues: StoryProfile = {
  id: "",
  age: "",
  name: "",
  interests: "",
  icon: "add",
  isDefault: false,
};

const requiredMsg = "This field is required.";
const numberMsg = "This field should be a number.";

const validationSchema = object().shape({
  name: string().required(requiredMsg),
  age: number().typeError(numberMsg).required(requiredMsg),
  interests: string().required(requiredMsg),
  icon: string().required(requiredMsg),
});

function Profile() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id: string }>();
  const { saveProfile, getProfile } = useProfilesContext();

  const onSubmit = async (newProfile: StoryProfile) => {
    saveProfile({ ...newProfile, isDefault: false });
    router.replace(`story?id=${newProfile.id}`);
  };

  const formInitialValues = useMemo(() => {
    if (params.id) {
      const profile = getProfile(params.id);
      return { ...profile, isDefault: false } as StoryProfile;
    }
  }, [getProfile]);

  const formik = useFormik({
    initialValues: formInitialValues || defaultInitialValues,
    validationSchema,
    validateOnBlur: false,
    onSubmit,
  });

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={"padding"}>
      <ScreenTemplateScroll
        BottomView={
          <Button
            title={"Create my story"}
            disabled={!formik.isValid}
            onPress={() => formik.handleSubmit()}
          />
        }
      >
        <ProfileCreateForm {...formik} />
      </ScreenTemplateScroll>
    </KeyboardAvoidingView>
  );
}

export default Profile;
