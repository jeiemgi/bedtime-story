import ScreenTemplate from "@/components/themed/ScreenTemplate";
import ProfileCreateForm from "@/containers/forms/ProfileCreateForm";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getAllProfiles, storeProfiles } from "@/js/AsyncStorage";
import { DEFAULT_PROFILES, type StoryProfile } from "@/constants/data";

function Profile() {
  const router = useRouter();

  const onSubmit = async (newProfile: StoryProfile) => {
    const storedProfiles = (await getAllProfiles()) || [];
    const isDefault = DEFAULT_PROFILES.find(
      (_prof) => _prof.id === newProfile.id,
    );

    if (!isDefault) {
      if (storedProfiles.length !== 0) {
        // Add the profiles to the storage
        const newProfiles: StoryProfile[] = storedProfiles.map((storedP) => {
          if (storedP.id === newProfile.id) {
            return { ...storedP, ...newProfile };
          } else {
            return newProfile;
          }
        });
        await storeProfiles(newProfiles);
      } else {
        await storeProfiles([newProfile]);
      }
    }

    router.replace(
      `/story` +
        `?name=${newProfile.name}` +
        `&id=${newProfile.id}` +
        `&age=${newProfile.age}` +
        `&icon=${newProfile.icon}` +
        `&interests=${newProfile.interests}`,
    );
  };

  const params = useLocalSearchParams<StoryProfile>();
  const formInitialValues: StoryProfile = {
    id: params.id || "",
    name: params.name || "",
    age: params.age || "",
    interests: params.interests || "",
    icon: params.icon || "",
  };

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
