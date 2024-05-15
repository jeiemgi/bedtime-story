import { useLocalSearchParams, useRouter } from "expo-router";
import ScreenTemplate from "@/components/themed/ScreenTemplate";
import ProfileCreateForm from "@/containers/forms/ProfileCreateForm";
import { getAllProfiles, storeProfiles } from "@/js/AsyncStorage";
import { type StoryProfile } from "@/constants/data";

function Profile() {
  const router = useRouter();

  const onSubmit = async (values: StoryProfile) => {
    const stored = (await getAllProfiles()) || [];
    const newProfiles = [...stored, { ...values }];
    await storeProfiles(newProfiles);
    router.replace(
      `/story` +
        `?name=${values.name}` +
        `&age=${values.age}` +
        `&icon=${values.icon}` +
        `&interests=${values.interests}`,
    );
  };

  const params = useLocalSearchParams<StoryProfile>();
  const formInitialValues: StoryProfile | undefined =
    params.name && params.age && params.interests
      ? {
          name: params.name,
          age: params.age,
          interests: params.interests,
          icon: params.icon ?? "add",
        }
      : undefined;

  return (
    <ScreenTemplate>
      <ProfileCreateForm
        onSubmit={onSubmit}
        initialValues={formInitialValues}
      />
    </ScreenTemplate>
  );
}

export default Profile;
