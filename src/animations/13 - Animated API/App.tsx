import React, { useEffect, useRef } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";

export default function App() {
  const progress = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.spring(progress, { toValue: 0.5, useNativeDriver: true }),
          Animated.spring(progress, { toValue: 1, useNativeDriver: true }),
        ]),

        Animated.sequence([
          Animated.spring(scale, { toValue: 2, useNativeDriver: true }),
          Animated.spring(scale, { toValue: 1, useNativeDriver: true }),
        ]),
      ]),
      { iterations: 3 }
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.square,
          {
            // borderRadius: progress.interpolate({
            //   inputRange: [0.5, 1],
            //   outputRange: [SIZE / 4, SIZE / 2],
            // }),
            borderRadius: Animated.multiply(progress, SIZE / 2),
            opacity: progress,
            transform: [
              { scale },
              {
                rotate: progress.interpolate({
                  inputRange: [0.5, 1],
                  outputRange: ["180deg", "360deg"],
                }),
              },
            ],
          },
        ]}
      ></Animated.View>
    </View>
  );
}

const SIZE = 100.0;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#444B6F",
    justifyContent: "center",
    alignItems: "center",
  },
  square: {
    width: SIZE,
    height: SIZE,
    backgroundColor: "#A6E1FA",
    elevation: 25,
  },
});
