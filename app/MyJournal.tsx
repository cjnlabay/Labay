import React, { useState, useEffect } from "react";
import {  View,  Text,  TextInput,  TouchableOpacity,  FlatList,  StyleSheet,  ImageBackground,} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface JournalEntry {
  id: string;
  title: string;
  text: string;
  date: string;
}

const MyJournal = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [title, setTitle] = useState("");
  const [journalText, setJournalText] = useState("");

  useEffect(() => {
    loadEntries();
  }, []);

  useEffect(() => {
    saveEntries();
  }, [entries]);

  const loadEntries = async () => {
    try {
      const storedEntries = await AsyncStorage.getItem("journalEntries");
      if (storedEntries) {
        setEntries(JSON.parse(storedEntries));
      }
    } catch (error) {
      console.error("Failed to load journal entries:", error);
    }
  };

  const saveEntries = async () => {
    try {
      await AsyncStorage.setItem("journalEntries", JSON.stringify(entries));
    } catch (error) {
      console.error("Failed to save journal entries:", error);
    }
  };

  const addEntry = () => {
    if (title.trim() !== "" && journalText.trim() !== "") {
      const newEntry: JournalEntry = {
        id: Date.now().toString(),
        title,
        text: journalText,
        date: new Date().toLocaleDateString(),
      };
      setEntries([newEntry, ...entries]);
      setTitle("");
      setJournalText("");
    }
  };

  const deleteEntry = (id: string) => {
    setEntries(entries.filter((entry) => entry.id !== id));
  };

  return (
    <ImageBackground
      source={require("./labay.jpg")} 
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.header}>My Journal</Text>

        <TextInput
          style={styles.input}
          placeholder="Title..."
          value={title}
          onChangeText={setTitle}
        />

        <TextInput
          style={[styles.input, styles.multilineInput]}
          placeholder="Write your journal entry here..."
          value={journalText}
          onChangeText={setJournalText}
          multiline
        />

        <TouchableOpacity style={styles.addButton} onPress={addEntry}>
          <Text style={styles.addButtonText}>Add Entry</Text>
        </TouchableOpacity>

        <FlatList
          data={entries}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.entryItem}>
              <View style={styles.entryHeader}>
                <Text style={styles.entryTitle}>{item.title}</Text>
                <Text style={styles.entryDate}>{item.date}</Text>
              </View>
              <Text style={styles.entryText}>{item.text}</Text>
              <TouchableOpacity onPress={() => deleteEntry(item.id)}>
                <Text style={styles.deleteText}>❌</Text>
              </TouchableOpacity>
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
    justifyContent: "center",
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Light overlay for readability
    borderRadius: 10,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: "rgba(255, 255, 255, 0.9)", // Semi-transparent background
  },
  multilineInput: {
    minHeight: 80,
  },
  addButton: {
    backgroundColor: "#F3F1EC",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  addButtonText: {
    color: "#black",
    fontSize: 16,
    fontWeight: "bold",
  },
  entryItem: {
    backgroundColor: "#F3F1EC",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  entryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  entryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
  },
  entryDate: {
    fontSize: 14,
    color: "#666",
  },
  entryText: {
    fontSize: 16,
    color: "#333",
  },
  deleteText: {
    fontSize: 18,
    color: "red",
    textAlign: "right",
    marginTop: 5,
  },
});

export default MyJournal;
