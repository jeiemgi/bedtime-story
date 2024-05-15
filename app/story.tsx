import { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import useThemeColor from "@/hooks/useThemeColor";
import Text from "@/components/themed/Text";
import Button from "@/components/themed/Button";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { ActivityIndicator } from "react-native";
import { DEFAULT_STORY, DEFAULT_TITLE, StoryProfile } from "@/constants/data";
import ScreenTemplate, {
  ScreenTemplateScroll,
} from "@/components/themed/ScreenTemplate";
import styled from "styled-components/native";
import Box from "@/components/themed/Box";

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
  const [title, setTitle] = useState<string | null>(null);
  const [story, setStory] = useState<string | null>(null);

  useEffect(() => {
    // import { generateStory } from "@/js/api";
    // Example on how it would work when actually fetching the API.
    // SEE "/js/api.ts" to se the example.
    //
    // const fetch = async () => {
    //   const prompt = getPrompt();
    //   await generateStory(prompt).then((res) => {
    //     const storyRes = res?.choices[0].message.content;
    //     if (storyRes) setStory(storyRes);
    //   });
    // };
    //
    // setStory(null);
    // fetch()

    // Just test data
    setTimeout(() => {
      setStory(DEFAULT_STORY);
      setTitle(DEFAULT_TITLE);
    }, 2000);
  }, []);

  const router = useRouter();
  return (
    <>
      {story ? (
        <ScreenTemplateScroll
          BottomView={
            <Button title={"Go back home"} onPress={() => router.back()} />
          }
        >
          <Text
            type={"display"}
            align={"center"}
            style={{ marginBottom: 32, marginHorizontal: 16 }}
          >
            {title}
          </Text>
          <Box mb={8}>
            <Text
              style={{
                fontSize: 18,
                lineHeight: 25,
                textAlign: "justify",
              }}
            >
              {story}
            </Text>
          </Box>
          <Text
            style={{
              fontSize: 18,
              lineHeight: 25,
            }}
          >
            Good night {params.name}! 🌝
          </Text>
        </ScreenTemplateScroll>
      ) : (
        <AnimatedView
          entering={FadeIn}
          exiting={FadeOut}
          style={{ backgroundColor }}
        >
          <ScreenTemplate>
            <TopContainer>
              <Text
                align={"center"}
                style={{ marginBottom: 16 }}
                type={"display"}
              >
                Hi {params.name}!
              </Text>
              <Text align={"center"} type={"defaultSemiBold"}>
                We're creating your next big adventure ...
              </Text>
            </TopContainer>

            <ActivityIndicator color={indicatorColor} />
          </ScreenTemplate>
        </AnimatedView>
      )}
    </>
  );
}

export default Story;
