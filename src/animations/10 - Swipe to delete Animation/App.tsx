import ListItem from "./components/ListItem";
import React, { useCallback, useRef, useState } from "react";
import { StyleSheet, Text } from "react-native";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const TITLES = [
  "Record the dismissible tutorial 🎥",
  "Leave a 👍🏼 to the video",
  "Check YouTube comments",
  "Subscribe to the channel 🚀",
  "Leave a ⭐️ on the GitHub Repo",
];

export interface TaskInterface {
  title: string;
  index: number;
}

const TASKS: TaskInterface[] = TITLES.map((title, index) => ({ title, index }));

// const TASKS = [
//   {
//     index: 0,
//     title: 'Record the dismissible tutorial 🎥',
//   },
//   { ... }, { ... }, { ... }
// ];

const BACKGROUND_COLOR = "#FAFBFF";

export default function App() {
  const [tasks, setTasks] = useState(TASKS);

  const onDimiss = useCallback((task: TaskInterface) => {
    setTasks((tasks) => tasks.filter((item) => item.index !== task.index));
  }, []);

  const scrollRef = useRef(null);

  return (
    <GestureHandlerRootView>
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Tasks</Text>
        <ScrollView ref={scrollRef} style={{ flex: 1 }}>
          {tasks.map((task) => (
            <ListItem
              simultaneousHandlers={scrollRef}
              key={task.index}
              task={task}
              onDismiss={onDimiss}
            />
          ))}
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  header: {
    fontSize: 60,
    marginVertical: 20,
    paddingLeft: "5%",
  },
});
