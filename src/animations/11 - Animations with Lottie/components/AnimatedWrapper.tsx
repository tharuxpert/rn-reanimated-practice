import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import LottieView, { LottieViewProps } from "lottie-react-native";

interface AnimatedWrapperProps extends LottieViewProps {
  children: React.ReactNode;
  showAnimation?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  title?: string;
}

const AnimatedWrapper: React.FC<AnimatedWrapperProps> = ({
  children,
  showAnimation,
  containerStyle,
  textStyle,
  title,
  style,
  ...lottieProps
}) => {
  if (!showAnimation) {
    return <>{children}</>;
  }

  return (
    <View
      style={[
        {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "30%",
        },
        containerStyle,
      ]}
    >
      <LottieView
        loop
        autoPlay
        style={[
          {
            width: "80%",
            aspectRatio: 1,
          },
          style,
        ]}
        {...lottieProps}
      />
      {title && (
        <Text style={[{ fontSize: 25, fontWeight: "300" }, textStyle]}>
          {title}
        </Text>
      )}
    </View>
  );
};

export default AnimatedWrapper;

const styles = StyleSheet.create({});
