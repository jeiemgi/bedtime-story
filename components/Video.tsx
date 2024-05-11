import * as React from "react";
import { Video as ExpoVideo, VideoProps as ExpoVideoProps } from "expo-av";
import { View, StyleSheet, Button } from "react-native";
import { forwardRef } from "react";

const Video = forwardRef<ExpoVideo, ExpoVideoProps>(
  (props: ExpoVideoProps, ref) => {
    return <ExpoVideo ref={ref} style={styles.video} {...props} />;
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
  },
  video: {
    minWidth: 320,
    minHeight: 200,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Video;
