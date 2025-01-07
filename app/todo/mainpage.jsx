import { StyleSheet, Text, View, Modal, TextInput } from "react-native";
import React, { useState } from "react";
import TodoHeader from "./_components/TodoHeader";
import Todoadd from "./_components/Todoadd";
import TodoCard from "./_components/TodoCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from "react-native";
import { useEffect } from "react";
const mainpage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [deleteTodo, setDeleteTodo] = useState("");
  const [description, setDescription] = useState("");
  const [Todos, setTodo] = useState([
    // Add initial todos here
  ]);

  const handleAddTodo = () => {
    if (!title.trim() || !description.trim()) {
      console.warn("Title and Description cannot be empty.");
      return;
    }

    const newTodo = {
      id: Todos.length + 1,
      title: title.trim(),
      description: description.trim(),
      date: new Date().toLocaleString(),
    };

    const updatedTodos = [...Todos, newTodo];
    setTodo(updatedTodos);
    storeData(updatedTodos);
    console.log("Added Todo:", Todos);
    setTitle("");
    setDescription("");
    setModalVisible(false);
  };

  const handleDeleteTodo = (id) => {
    const updatedTodos = Todos.filter((todo) => todo.id !== id);
    setTodo(updatedTodos);
    storeData(updatedTodos);
  };

  const storeData = async (Todos) => {
    try {
      const jsonValue = JSON.stringify(Todos);
      await AsyncStorage.setItem("my-key", jsonValue);
      console.log("vayo save");
    } catch (e) {
      // saving error
    }
  };
  useEffect(() => {
    // Load todos from AsyncStorage when the component mounts
    getData();
  }, []);
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("my-key");
      if (value !== null) {
        const parsedTodos = JSON.parse(value);
        setTodo(parsedTodos);
        console.log("Todos loaded:", parsedTodos);
      }
    } catch (e) {
      // error reading value
    }
  };
  return (
    <View style={styles.container}>
      <TodoHeader />
      {Todos.map((todo) => (
        <TodoCard
          key={todo.id}
          title={todo.title}
          description={todo.description}
          date={todo.date}
          onDelete={() => handleDeleteTodo(todo.id)}
        />
      ))}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Todo</Text>
            <TextInput
              style={styles.input}
              placeholder="Title"
              value={title}
              onChangeText={(text) => setTitle(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Description"
              value={description}
              onChangeText={(text) => setDescription(text)}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleAddTodo}
              >
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Your main page content */}
      <View style={styles.add}>
        <Todoadd
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      </View>
    </View>
  );
};

export default mainpage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  add: {
    position: "absolute", // Enables absolute positioning
    bottom: 10, // 10 pixels from the bottom
    left: 10, // 10 pixels from the left
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 50,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  saveButton: {
    backgroundColor: "#28a745",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
  },
  cancelButton: {
    backgroundColor: "#dc3545",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});
