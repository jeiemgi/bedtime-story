import React, { useState } from "react";
import ScreenTemplate from "@/components/ScreenTemplate";
import { ThemedText } from "@/components/ThemedText";
import { useRouter } from "expo-router";
import { ThemedButton } from "@/components/ThemedButton";
import { CheckBox, Input } from "@/components/Themed";
import Box from "@/components/Box";
import styled from "styled-components/native";

const defaultInterests = [
  { label: "Astronauts", value: "astronauts" },
  { label: "Castles", value: "castles" },
  { label: "Trucks", value: "trucks" },
  { label: "Planes", value: "planes" },
];

function StoryCreate() {
  const router = useRouter();

  const [interests, setInterests] = useState<boolean[]>([]);

  return (
    <ScreenTemplate
      BottomView={
        <>
          <ThemedButton onPress={router.back} title={"Create"} />
        </>
      }
    >
      <Box mb={4}>
        <ThemedText type={"h2"}>Let's create a new profile</ThemedText>
      </Box>

      <InputWrapper>
        <ThemedText type={"caption"}>Name:</ThemedText>
        <Input placeholder={"e.g Thomas"} />
      </InputWrapper>

      <InputWrapper>
        <ThemedText type={"caption"}>Age:</ThemedText>
        <Input keyboardType={"numeric"} placeholder={"e.g 5"} />
      </InputWrapper>

      <InputWrapper>
        <ThemedText type={"caption"}>Pick your interests</ThemedText>
      </InputWrapper>

      <InputWrapperRow>
        {defaultInterests.map((item, index) => {
          return (
            <CheckBox
              key={`CheckBox-${index}`}
              label={item.label}
              checked={interests[index]}
              onPress={(value) => {
                setInterests((prev) => {
                  const clone = prev.concat();
                  clone[index] = value;
                  return clone;
                });
              }}
            />
          );
        })}
      </InputWrapperRow>
    </ScreenTemplate>
  );
}

const Spacer = styled.View`
  margin-bottom: 32px;
`;

const InputWrapper = styled(Spacer)`
  width: 100%;
  gap: 8px;
`;

const InputWrapperRow = styled.View`
  gap: 8px;
  flex-wrap: wrap;
  flex-direction: row;
`;
export default StoryCreate;
