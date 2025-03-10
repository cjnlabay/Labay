import React, { useState, useEffect } from "react";
import {   View,   Text,   TextInput,   TouchableOpacity,   FlatList,   StyleSheet,   ImageBackground } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Task {
  id: string;
  text: string;
  description: string;
  isEditing: boolean;
}

const MyTask = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskText, setTaskText] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [editText, setEditText] = useState("");
  const [editDescription, setEditDescription] = useState("");

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      saveTasks();
    }
  }, [tasks]);

  const saveTasks = async () => {
    try {
      await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
    } catch (error) {
      console.error("Error saving tasks:", error);
    }
  };

  const loadTasks = async () => {
    try {
      const savedTasks = await AsyncStorage.getItem("tasks");
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }
    } catch (error) {
      console.error("Error loading tasks:", error);
    }
  };

  const addTask = () => {
    if (taskText.trim() !== "" && taskDescription.trim() !== "") {
      const newTask = { id: Date.now().toString(), text: taskText, description: taskDescription, isEditing: false };
      setTasks([...tasks, newTask]);
      setTaskText("");
      setTaskDescription("");
    }
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const startEditing = (task: Task) => {
    setEditText(task.text);
    setEditDescription(task.description);
    setTasks(tasks.map((t) => (t.id === task.id ? { ...t, isEditing: true } : t)));
  };

  const saveTask = (id: string) => {
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, text: editText, description: editDescription, isEditing: false } : task
    ));
  };

  return (
    <ImageBackground source={require("./labay.jpg")} style={styles.background} resizeMode="cover">
      <View style={styles.container}>
      <Text style={[styles.title, { textAlign: 'center' }]}>My Tasks</Text>

        <TextInput
          style={styles.input}
          placeholder="Task Title"
          value={taskText}
          onChangeText={setTaskText}
        />

        <TextInput
          style={styles.input}
          placeholder="Task Description"
          value={taskDescription}
          onChangeText={setTaskDescription}
        />

        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonText}>Add Task</Text>
        </TouchableOpacity>

        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.taskItem}>
              {item.isEditing ? (
                <>
                  <TextInput
                    style={styles.editInput}
                    value={editText}
                    onChangeText={setEditText}
                  />
                  <TextInput
                    style={styles.editInput}
                    value={editDescription}
                    onChangeText={setEditDescription}
                  />
                  <TouchableOpacity onPress={() => saveTask(item.id)}>
                    <Text style={styles.saveText}>✔ Save</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <View style={styles.taskContent}>
                    <Text style={styles.taskText}>{item.text}</Text>
                    <Text style={styles.taskDescription}>{item.description}</Text>
                  </View>
                  <View style={styles.taskActions}>
                    <TouchableOpacity onPress={() => startEditing(item)}>
                      <Text style={styles.editText}>✏ Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => deleteTask(item.id)}>
                      <Text style={styles.deleteText}>❌</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
          )}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Light overlay for readability
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  addButton: {
    backgroundColor: "#F3F1EC",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  addButtonText: {
    color: "#black",
    fontSize: 16,
    fontWeight: "bold",
  },
  taskItem: {
    backgroundColor: "#F3F1EC",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  taskContent: {
    flex: 1,
    marginBottom: 5,
  },
  taskText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  taskDescription: {
    fontSize: 14,
    color: "#666",
  },
  taskActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  editText: {
    fontSize: 16,
    color: "black",
    
  },
  deleteText: {
    fontSize: 16,
    color: "red",
  },
  saveText: {
    fontSize: 16,
    color: "green",
  },
  editInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 5,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
});

export default MyTask;
