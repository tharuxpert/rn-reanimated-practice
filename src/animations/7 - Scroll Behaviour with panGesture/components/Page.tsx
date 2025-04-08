import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import Animated, {
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

interface PageProps {
  index: number;
  title: string;
  translateX: SharedValue<number>;
}

const { width: PAGE_WIDTH } = Dimensions.get("window"); // Assuming each page has a fixed width of 300

const Page: React.FC<PageProps> = ({ index, title, translateX }) => {
  const pageOffset = PAGE_WIDTH * index;

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value + pageOffset }],
    };
  });

  return (
    <Animated.View
      style={[
        {
          ...StyleSheet.absoluteFillObject,
          backgroundColor: `rgba(0,0,256,0.${index + 2})`,
          alignItems: "center",
          justifyContent: "center",
        },
        rStyle,
      ]}
    >
      <Text
        style={{
          fontSize: 60,
          fontWeight: "700",
          letterSpacing: 1.5,
          textTransform: "uppercase",
        }}
      >
        {title}
      </Text>
    </Animated.View>
  );
};

export { PAGE_WIDTH };
export default Page;

const styles = StyleSheet.create({});
