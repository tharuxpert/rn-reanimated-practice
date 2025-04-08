import Page, { PAGE_WIDTH } from "src/animations/7 - Scroll Behaviour with panGesture/components/Page";
import React from "react";
import { StyleSheet } from "react-native";
import {
  GestureHandlerRootView,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  cancelAnimation,
  useAnimatedGestureHandler,
  useDerivedValue,
  useSharedValue,
  withDecay,
} from "react-native-reanimated";

const titles = ["What's", "up", "mobile", "devs?"];

type ContextType = {
  x: number;
};

export default function App() {
  const translateX = useSharedValue(0);
  const clampedTranslateX = useDerivedValue(() => {
    const MAX_TRANSLATE_X = -PAGE_WIDTH * (titles.length - 1);
    return Math.max(Math.min(translateX.value, 0), MAX_TRANSLATE_X);
  });

  const panGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextType
  >({
    onStart: (_, context) => {
      context.x = clampedTranslateX.value;
      cancelAnimation(translateX);
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.x;
    },
    onEnd: (event) => {
      translateX.value = withDecay({ velocity: event.velocityX });
    },
  });

  return (
    <GestureHandlerRootView style={styles.container}>
      <PanGestureHandler onGestureEvent={panGestureEvent}>
        <Animated.View style={{ flex: 1, flexDirection: "row" }}>
          {titles.map((title, index) => {
            return (
              <Page
                key={index.toString()}
                index={index}
                title={title}
                translateX={clampedTranslateX}
              />
            );
          })}
        </Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
