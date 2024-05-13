import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { ActivityIndicator } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import styled from "styled-components/native";
import { ThemedButton } from "@/components/ThemedButton";
import { DEFAULT_STORY } from "@/constants/data";
import ScreenTemplate, {
  ScreenTemplateScroll,
} from "@/components/ScreenTemplate";

export type StoryProfile = { name: string; age: string; interests: string };

const TopContainer = styled(Animated.View)`
  margin-bottom: 32px;
`;

const AnimatedView = styled(Animated.View)`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: absolute;
  padding: 32px;
`;

function Story() {
  const params = useLocalSearchParams<StoryProfile>();
  const indicatorColor = useThemeColor({}, "text");
  const backgroundColor = useThemeColor({}, "background");
  const [story, setStory] = useState<string | null>(null);

  useEffect(() => {
    // Example on how it would work when actually fetching the API.
    // SEE "/js/api.ts" to se the example.
    // const getPrompt = () => {
    //   return `Write a really short bedtime story for a ${params.age}-year-old whose interests are ${params.interests}.
    //   Write it about something he is interested in, not about himself, try to be concise and straight to the story, do not give context.`;
    // };
    //
    // const fetch = async () => {
    //   setStory(null);
    //   const prompt = getPrompt();
    //   await generateStory(prompt).then((res) => {
    //     const storyRes = res?.choices[0].message.content;
    //     if (storyRes) setStory(storyRes);
    //   });
    // };
    // fetch()

    setTimeout(() => {
      setStory(DEFAULT_STORY);
    }, 2000);
  }, []);

  return (
    <>
      {story ? (
        <ScreenTemplateScroll BottomView={<ThemedButton title={"Complete"} />}>
          <ThemedText
            type={"display"}
            align={"center"}
            style={{ marginBottom: 32, marginHorizontal: 16 }}
          >
            Finny's Underwater Race
          </ThemedText>
          <ThemedText
            style={{
              fontSize: 18,
              lineHeight: 25,
              textAlign: "justify",
            }}
          >
            {story}
          </ThemedText>
          <ThemedText
            style={{
              fontSize: 18,
              lineHeight: 25,
            }}
          >
            Good night {params.name}! 🌝
          </ThemedText>
        </ScreenTemplateScroll>
      ) : (
        <AnimatedView
          entering={FadeIn}
          exiting={FadeOut}
          style={{ backgroundColor }}
        >
          <ScreenTemplate>
            <TopContainer>
              <ThemedText
                align={"center"}
                style={{ marginBottom: 16 }}
                type={"display"}
              >
                Hi {params.name}!
              </ThemedText>
              <ThemedText align={"center"} type={"defaultSemiBold"}>
                We're creating your next big adventure ...
              </ThemedText>
            </TopContainer>

            <ActivityIndicator color={indicatorColor} />
          </ScreenTemplate>
        </AnimatedView>
      )}
    </>
  );
}

export default Story;
