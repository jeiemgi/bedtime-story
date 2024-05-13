import { useRouter } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import ScreenTemplate from "@/components/ScreenTemplate";
import ProfileCreateForm from "@/containers/forms/ProfileCreateForm";
import { type StoryProfile } from "@/app/story";

function ProfileCreate() {
  const router = useRouter();

  const onSubmit = (values: StoryProfile) => {
    router.replace(
      `/story?name=${values.name}&age=${values.age}&interests=${values.interests}`,
    );
  };

  return (
    <ScreenTemplate>
      <ThemedText type={"h2"}>Let's create a new profile</ThemedText>
      <ProfileCreateForm onSubmit={onSubmit} />
    </ScreenTemplate>
  );
}

export default ProfileCreate;
