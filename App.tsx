import { StatusBar } from "expo-status-bar";
import React, { useCallback } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import {
  GestureHandlerRootView,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { perspective } from "react-native-redash";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "expo-vector-icons";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const THRESHOLD = SCREEN_WIDTH / 3;

export default function App() {
  const translateX = useSharedValue(0);

  const panGestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { x: number }
  >({
    onStart: (_, context) => {
      context.x = translateX.value;
    },
    onActive: (event, context) => {
      translateX.value = Math.max(event.translationX + context.x, 0);
    },
    onEnd: () => {
      if (translateX.value <= THRESHOLD) {
        translateX.value = withTiming(0);
      } else {
        translateX.value = withTiming(SCREEN_WIDTH / 2);
      }
    },
  });

  const rStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      translateX.value,
      [0, SCREEN_WIDTH / 2],
      [0, 3],
      Extrapolation.CLAMP
    );

    const borderRadius = interpolate(
      translateX.value,
      [0, SCREEN_WIDTH / 2],
      [0, 20],
      Extrapolation.CLAMP
    );

    return {
      borderRadius,
      transform: [
        { perspective: 100 },
        { translateX: translateX.value },
        { rotateY: `-${rotate}deg` },
      ],
    };
  });

  const onPress = useCallback(() => {
    if (translateX.value > 0) {
      translateX.value = withTiming(0);
    } else {
      translateX.value = withSpring(SCREEN_WIDTH / 2);
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="inverted" />
      <GestureHandlerRootView>
        <PanGestureHandler onGestureEvent={panGestureHandler}>
          <Animated.View
            style={[{ backgroundColor: "white", flex: 1 }, rStyle]}
          >
            <Feather
              name="menu"
              size={32}
              color={BACKGROUND_COLOR}
              style={{ margin: 15 }}
              onPress={onPress}
            />
          </Animated.View>
        </PanGestureHandler>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}

const BACKGROUND_COLOR = "#1e1e23";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
});
