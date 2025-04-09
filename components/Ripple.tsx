import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import React from "react";
import {
  GestureHandlerRootView,
  TapGestureHandler,
  TapGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  measure,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface RippleProps {
  style?: StyleProp<ViewStyle>;
  onTap?: () => void;
  children?: React.ReactNode;
}

const Ripple: React.FC<RippleProps> = ({ style, onTap, children }) => {
  const centerX = useSharedValue(0);
  const centerY = useSharedValue(0);
  const scale = useSharedValue(0);

  const aRef = useAnimatedRef<View>();
  const width = useSharedValue(0);
  const height = useSharedValue(0);

  const rippleOpacity = useSharedValue(1);

  const tapGestureEvent =
    useAnimatedGestureHandler<TapGestureHandlerGestureEvent>({
      onStart: (tapEvent) => {
        const layout = measure(aRef);
        // if (layout === null) return;
        width.value = layout?.width ?? 0;
        height.value = layout?.height ?? 0;

        centerX.value = tapEvent.x;
        centerY.value = tapEvent.y;

        rippleOpacity.value = 1;

        scale.value = 0;
        scale.value = withTiming(1, { duration: 1000 });
      },
      onActive: () => {
        if (onTap) runOnJS(onTap)();
      },
      onFinish: () => {
        rippleOpacity.value = withTiming(0);
      },
    });

  const rStyle = useAnimatedStyle(() => {
    const circleRadius = Math.sqrt(width.value ** 2 + height.value ** 2);

    const translateX = centerX.value - circleRadius;
    const translateY = centerY.value - circleRadius;

    return {
      width: circleRadius * 2,
      height: circleRadius * 2,
      borderRadius: circleRadius,
      opacity: rippleOpacity.value,
      backgroundColor: "rgba(0, 0, 0, 0.2)",
      position: "absolute",
      transform: [{ translateX }, { translateY }, { scale: scale.value }],
      top: 0,
      left: 0,
    };
  });

  return (
    <View ref={aRef} style={style}>
      <GestureHandlerRootView>
        <TapGestureHandler onGestureEvent={tapGestureEvent}>
          <Animated.View style={[style, { overflow: "hidden" }]}>
            <View>{children}</View>
            <Animated.View style={rStyle} />
          </Animated.View>
        </TapGestureHandler>
      </GestureHandlerRootView>
    </View>
  );
};

export default Ripple;

const styles = StyleSheet.create({});
