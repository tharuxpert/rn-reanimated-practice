import { useEffect, useState } from "react";
import {
  Button,
  Dimensions,
  Pressable,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withRepeat,
  SharedValue,
  useAnimatedGestureHandler,
  useAnimatedScrollHandler,
  interpolateColor,
  useDerivedValue,
} from "react-native-reanimated";
import {
  GestureHandlerRootView,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import { Page } from "components/Page";

// const SIZE = 100.0;

// const CIRCLE_RADIUS = SIZE * 2;

const WORDS = ["What's", "up", "mobile", "devs?"];

type ContextType = {
  translateX: number;
  translateY: number;
};

type Theme = "light" | "dark";

const Colors = {
  dark: {
    background: "#1E1E1E",
    circle: "#252525",
    text: "#F8F8F8",
  },
  light: {
    background: "#F8F8F8",
    circle: "#FFF",
    text: "#1E1E1E",
  },
};

const SWITCH_TRACK_COLOR = {
  true: "rgba(256,0,256,0.2)",
  false: "rgba(0,0,0,0.1)",
};

export default function App() {
  // ----------------------------Introduction----------------------------

  // const progress = useSharedValue(1);
  // const scale = useSharedValue(2);

  // const handleRotation = (progress: SharedValue<number>) => {
  //   "worklet";
  //   return `${progress.value * 2 * Math.PI}rad`;
  // };

  // const reanimatedStyle = useAnimatedStyle(() => {
  //   return {
  //     opacity: progress.value,
  //     borderRadius: (progress.value * SIZE) / 2,
  //     transform: [{ scale: scale.value }, { rotate: handleRotation(progress) }],
  //   };
  // }, []);

  // const animate = () => {
  //   // reset
  //   progress.value = 1;
  //   scale.value = 2;

  //   progress.value = withRepeat(withSpring(0.5), 3, true);
  //   scale.value = withRepeat(withSpring(1), 3, true);
  // };

  // ----------------------------PanGestureHandler----------------------------

  // const translateX = useSharedValue(0);
  // const translateY = useSharedValue(0);

  // const panGestureEvent = useAnimatedGestureHandler<
  //   PanGestureHandlerGestureEvent,
  //   ContextType
  // >({
  //   onStart: (event, context) => {
  //     context.translateX = translateX.value;
  //     context.translateY = translateY.value;
  //   },
  //   onActive: (event, context) => {
  //     translateX.value = event.translationX + context.translateX;
  //     translateY.value = event.translationY + context.translateY;
  //   },
  //   onEnd: () => {
  //     const distance = Math.sqrt(translateX.value ** 2 + translateY.value ** 2);
  //     if (distance < CIRCLE_RADIUS+SIZE/2) {
  //       translateX.value = withSpring(0);
  //       translateY.value = withSpring(0);
  //     }
  //   },
  // });

  // const rStyle = useAnimatedStyle(() => {
  //   return {
  //     transform: [
  //       {
  //         translateX: translateX.value,
  //       },
  //       { translateY: translateY.value },
  //     ],
  //   };
  // });

  // ----------------------------Interpolate ScrollView----------------------------

  // const translateX = useSharedValue(0);

  // const scrollHandler = useAnimatedScrollHandler((event) => {
  //   translateX.value = event.contentOffset.x;
  // });

  // ----------------------------Interpolate Colors----------------------------

  const [theme, setTheme] = useState<Theme>("light");

  // const progress = useSharedValue(0);
  const progress = useDerivedValue(() => {
    return theme === "dark" ? withTiming(1) : withTiming(0);
  }, [theme]);

  const rStyles = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.background, Colors.dark.background]
    );

    return {
      backgroundColor,
    };
  });

  const rCircleStyles = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.circle, Colors.dark.circle]
    );

    return {
      backgroundColor,
    };
  });

  const rTextStyles = useAnimatedStyle(() => {
    const color = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.text, Colors.dark.text]
    );

    return {
      color,
    };
  });

  return (
    // ----------------------------Introduction & PanGestureHandler----------------------------

    // <GestureHandlerRootView style={styles.container}>
    //   <View style={styles.circle}>
    //     <PanGestureHandler onGestureEvent={panGestureEvent}>
    //       <Animated.View style={[styles.square, rStyle]} />
    //     </PanGestureHandler>
    //   </View>

    //   {/* <Pressable style={styles.button}>
    //     <Text style={styles.buttonText}>Animate</Text>
    //   </Pressable> */}
    // </GestureHandlerRootView>

    // ----------------------------Interpolate ScrollView----------------------------

    // <Animated.ScrollView
    //   pagingEnabled
    //   horizontal
    //   style={styles.container}
    //   contentContainerStyle={styles.contentContainer}
    //   onScroll={scrollHandler}
    //   scrollEventThrottle={16}
    // >
    //   {WORDS.map((title, index) => {
    //     return <Page key={index.toString()} title={title} index={index} translateX={translateX} />;
    //   })}
    // </Animated.ScrollView>

    // ----------------------------Interpolate Colors----------------------------

    <Animated.View style={[styles.container, rStyles]}>
      <Animated.Text style={[styles.text,rTextStyles]}>Theme</Animated.Text>
      <Animated.View style={[styles.circle, rCircleStyles]}>
        <Switch
          value={theme === "dark"}
          onValueChange={(toggled) => {
            setTheme(toggled ? "dark" : "light");
          }}
          trackColor={SWITCH_TRACK_COLOR}
          thumbColor={"violet"}
        />
      </Animated.View>
    </Animated.View>
  );
}

const SIZE = Dimensions.get("window").width * 0.7;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    flexGrow: 1,
    alignItems: "flex-end",
  },
  button: {
    backgroundColor: "cyan",
    width: 200,
    height: 50,
    borderRadius: 50,
    justifyContent: "center",
    position: "absolute",
    bottom: 100,
    borderColor: "black",
    borderWidth: 3,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 20,
    padding: 5,
    fontWeight: "500",
  },
  square: {
    width: SIZE,
    height: SIZE,
    backgroundColor: "rgba(0,0,256,0.5)",
    borderRadius: 20,
  },
  circle: {
    width: SIZE,
    height: SIZE,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: SIZE / 2,
    shadowColor: "black",
    elevation: 18,
  },
  text: {
    fontSize: 70,
    textTransform: "uppercase",
    fontWeight: "700",
    letterSpacing: 14,
    marginBottom: 35,
  },
});
