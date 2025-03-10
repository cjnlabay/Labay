import React, { useState, useEffect } from "react";
import { 
  View, Text, TextInput, TouchableOpacity, Alert, 
  ActivityIndicator, StyleSheet, ImageBackground 
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import backgroundImage from "./labay.jpg"; 

const LoginScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isCheckingToken, setIsCheckingToken] = useState(true);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        navigation.replace("HomeScreen");
      }
    } catch (error) {
      console.error("Error checking token:", error);
    } finally {
      setIsCheckingToken(false);
    }
  };

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Please enter both username and password.");
      return;
    }

    setLoading(true);
    try {
      await AsyncStorage.removeItem("token");

      const response = await axios.post("https://devapi-618v.onrender.com/api/auth/login", {
        username,
        password,
      });

      if (response.data?.token) {
        await AsyncStorage.setItem("token", response.data.token);
        navigation.replace("HomeScreen");
      } else {
        Alert.alert("Login Failed", "Invalid username or password.");
      }
    } catch (error) {
      Alert.alert("Login Failed", error.response?.data?.message || "Invalid username or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background} resizeMode="cover">
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>TaskChronicle</Text>

          <Text style={styles.label}>Username:</Text>
          <TextInput 
            value={username} 
            onChangeText={setUsername} 
            style={styles.input} 
            autoCapitalize="none" 
          />

          <Text style={styles.label}>Password:</Text>
          <TextInput 
            value={password} 
            onChangeText={setPassword} 
            secureTextEntry 
            style={styles.input} 
          />

          {loading ? (
            <ActivityIndicator size="small" color="blue" />
          ) : (
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={isCheckingToken}>
              <Text style={styles.loginButtonText}>Login Now</Text>
            </TouchableOpacity>
          )}

          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("RegisterScreen")}>
              <Text style={styles.registerLink}>Signup now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    width: "100%", 
    height: "100%" 
  },
  overlay: {
    flex: 1, 
    backgroundColor: "rgba(255, 255, 255, 0.8)", 
    justifyContent: "center", 
    alignItems: "center", 
    width: "100%" 
  },
  card: { 
    backgroundColor: "#F3F1EC", 
    borderRadius: 12, 
    padding: 20, 
    width: "90%", 
    maxWidth: 400, 
    alignItems: "center", 
    elevation: 5 
  },
  title: { 
    fontSize: 22, 
    fontWeight: "bold", 
    marginBottom: 15, 
    color: "black" 
  },
  label: { 
    alignSelf: "flex-start", 
    marginBottom: 5, 
    fontSize: 16, 
    color: "black" 
  },
  input: { 
    width: "100%", 
    height: 45, 
    borderColor: "#ddd", 
    borderWidth: 1, 
    borderRadius: 8, 
    paddingLeft: 10, 
    marginBottom: 15, 
    backgroundColor: "#FAFAFA" 
  },
  loginButton: {
    backgroundColor: "#e9e6dd",
    width: "100%",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  loginButtonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  registerContainer: {
    flexDirection: "row",
    marginTop: 15,
  },
  registerText: {
    fontSize: 14,
    color: "#666",
  },
  registerLink: {
    fontSize: 14,
    color: "black",
    fontWeight: "bold",
  },
});

export default LoginScreen;
