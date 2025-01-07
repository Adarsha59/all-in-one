import { StyleSheet, Text, View } from "react-native";
import React from "react";

const TodoHeader = () => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>My To-Do List</Text>
    </View>
  );
};

export default TodoHeader;

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#6200ee", // A stylish purple color
    padding: 20,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5, // Adds a shadow effect for Android
  },
  headerTitle: {
    color: "#fff", // Contrasting text color
    fontSize: 24,
    fontWeight: "bold",
    letterSpacing: 1.5,
  },
});
