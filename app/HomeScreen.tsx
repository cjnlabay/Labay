// import React, { useState } from "react";
// import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import MyTask from "./MyTask";
// import MyJournal from "./MyJournal";
// import { useNavigation } from "@react-navigation/native";

// const HomeScreen = ({ checkToken }) => {
//   const navigation = useNavigation();
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [view, setView] = useState("tasks");

//   const handleLogout = async () => {
//     try {
//       await AsyncStorage.removeItem("token");
//       checkToken();
//       navigation.replace("Login");
//     } catch (error) {
//       console.error("Error during logout: ", error);
//     }
//   };

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <View style={styles.container}>
//       {/* Navbar */}
//       <View style={styles.navbar}>
//         <TouchableOpacity onPress={toggleSidebar} style={styles.menuButton}>
//           <Text style={styles.menuIcon}>☰</Text>
//         </TouchableOpacity>
//         <Text style={styles.navTitle}>Home</Text>
//       </View>

//       {/* Sidebar */}
//       {isSidebarOpen && (
//         <View style={styles.sidebar}>
//           <TouchableOpacity onPress={() => { setView("tasks"); setIsSidebarOpen(false); }}>
//             <Text style={styles.navItem}>My Task</Text>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => { setView("journal"); setIsSidebarOpen(false); }}>
//             <Text style={styles.navItem}>My Journal</Text>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={handleLogout}>
//             <Text style={[styles.navItem, styles.logoutButton]}>Logout</Text>
//           </TouchableOpacity>
//         </View>
//       )}
      
//       <View style={styles.content}>
//         {view === "tasks" ? <MyTask /> : <MyJournal />}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 50,
//   },
//   navbar: {
//     position: "absolute",
//     top: 0,
//     width: "100%",
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 10,
//     backgroundColor: "#007BFF",
//     borderBottomWidth: 1,
//     borderBottomColor: "#ccc",
//     zIndex: 1,
//   },
//   menuButton: {
//     padding: 5,
//   },
//   menuIcon: {
//     fontSize: 24,
//     color: "#fff",
//   },
//   navTitle: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginLeft: 10,
//     color: "#fff",
//   },
//   sidebar: {
//     width: 200,
//     backgroundColor: "#222",
//     padding: 20,
//     position: "absolute",
//     left: 0,
//     top: 61,
//     bottom: 0,
//     zIndex: 2,
//   },
//   navItem: {
//     color: "#fff",
//     fontSize: 18,
//     marginBottom: 30,
//   },
//   logoutButton: {
//     color: "red",
//   },
//   content: {
//     padding: 20,
//     marginTop: 60,
//   },
// });

// export default HomeScreen; 



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

