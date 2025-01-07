import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const TodoCard = ({ title, description, date, onDelete }) => {
  const [isDone, setIsDone] = useState(false);

  const toggleDone = () => setIsDone(!isDone);

  return (
    <View style={[styles.card, isDone && styles.doneCard]}>
      {/* Header: Title and Priority */}
      <View style={styles.header}>
        <Text style={[styles.title, isDone && styles.doneText]}>{title}</Text>
      </View>

      {/* Description */}
      {description ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}

      {/* Footer: Date and Actions */}
      <View style={styles.footer}>
        <Text style={styles.date}>{date}</Text>
        <View style={styles.actions}>
          <TouchableOpacity onPress={toggleDone} style={styles.doneButton}>
            <Text style={styles.buttonText}>{isDone ? "Undo" : "Done"}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default TodoCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 6,
    borderColor: "#2196F3", // Default priority color
  },
  doneCard: {
    backgroundColor: "#E8F5E9",
    borderColor: "#4CAF50",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  doneText: {
    textDecorationLine: "line-through",
    color: "#888",
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginTop: 8,
    marginBottom: 12,
  },
  priorityIndicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  priority_high: {
    backgroundColor: "#F44336",
  },
  priority_medium: {
    backgroundColor: "#FFC107",
  },
  priority_low: {
    backgroundColor: "#4CAF50",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  date: {
    fontSize: 12,
    color: "#757575",
  },
  actions: {
    flexDirection: "row",
  },
  doneButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 8,
    marginRight: 8,
  },
  deleteButton: {
    backgroundColor: "#F44336",
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});
