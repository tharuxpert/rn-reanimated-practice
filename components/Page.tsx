import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

interface PageProps {
  title: string;
  index: number;
  translateX: Animated.SharedValue<number>;
}

const { height, width } = Dimensions.get("window");

const SIZE = width * 0.7;

const Page: React.FC<PageProps> = ({ index, title, translateX }) => {
  const inuptRange = [(index - 1) * width, index * width, (index + 1) * width];

  const rStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      inuptRange,
      [0, 1, 0],
      Extrapolation.CLAMP
    );

    const borderRadius = interpolate(
      translateX.value,
      inuptRange,
      [0, SIZE / 2, 0],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ scale }],
      borderRadius,
    };
  });

  const rTextStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      translateX.value,
      inuptRange,
      [height / 2, 0, -height / 2],
      Extrapolation.CLAMP
    );

    const opacity = interpolate(
      translateX.value,
      inuptRange,
      [-2, 1, -2],
      Extrapolation.CLAMP
    );

    return {
      opacity,
      transform: [{ translateY }],
    };
  });

  return (
    <View
      style={[
        styles.pageContainer,
        {
          backgroundColor: `rgba(0,0,256,0.${index + 2}
    )`,
        },
      ]}
    >
      <Animated.View style={[styles.square, rStyle]} />
      <Animated.View style={[{ position: "absolute" }, rTextStyle]}>
        <Text style={styles.text}>{title}</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    height,
    width,
    alignItems: "center",
    justifyContent: "center",
  },
  square: {
    height: SIZE,
    width: SIZE,
    backgroundColor: "rgba(0,0,256,0.4)",
  },
  text: {
    fontSize: 70,
    color: "white",
    textTransform: "uppercase",
    fontWeight: "700",
  },
});

export { Page };
