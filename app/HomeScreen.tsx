import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyTask from "./MyTask";
import MyJournal from "./MyJournal";

const Drawer = createDrawerNavigator();

const LogoutScreen = ({ navigation }) => {
    useEffect(() => {
        const logout = async () => {
            await AsyncStorage.removeItem("token");
            navigation.replace("LoginScreen");
        };
        logout();
    }, [navigation]);

    return null;
};


const HomeScreen = () => {
    return (
        <Drawer.Navigator
            
            screenOptions={{
                drawerStyle: { backgroundColor: "white", width: 250,  marginTop: 65, },
                drawerLabelStyle: styles.drawerLabel,
                headerStyle: { backgroundColor: "#F3F1EC" },
                headerTintColor: "#black",
                headerTitle: "Task Chronicle",
                drawerItemStyle: { marginVertical: 5 }, // Adjusted spacing
            }}
        >
            <Drawer.Screen name="My Task" component={MyTask} />
            <Drawer.Screen name="My Journal" component={MyJournal} />
            <Drawer.Screen name="Logout" component={LogoutScreen} />
        </Drawer.Navigator>
    );
};

const styles = StyleSheet.create({
    // drawerHeader: {
    //     height: 50, 
    //     backgroundColor: "#007BFF",
    //     justifyContent: "center",
    //     alignItems: "center",
    //     borderBottomLeftRadius: 30, 
    //     borderBottomRightRadius: 30, 
    //     borderTopLeftRadius: 30,
    //     borderTopRightRadius: 30,
    //     marginBottom: 10, 
    // },
    drawerTitle: {
        fontSize: 18, 
        fontFamily: "Arial", 
        color: "white",
        letterSpacing: 1, 
    },
    drawerLabel: {
        fontSize: 18, 
        fontWeight: "200", 
        color: "black", 
        fontFamily: "Arial", 
    },
    drawerContainer: {
        paddingTop: 0, 
    },
});

export default HomeScreen;

