import Ripple from "src/animations/12 - Ripple Effect/components/Ripple";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Ripple style={styles.ripple} onTap={() => console.log("Tapped")}>
        <Text style={{ fontSize: 25 }}>Tap</Text>
      </Ripple>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  ripple: {
    width: 200,
    height: 200,
    backgroundColor: "white",
    elevation: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
  },
});
