// import React, { useEffect, useState } from "react";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// import LoginScreen from "./LoginScreen";
// import HomeScreen from "./HomeScreen";

// const Stack = createNativeStackNavigator();

// export default function Index() {
//   const [token, setToken] = useState<string | null>(null);

//   useEffect(() => {
//     const checkToken = async () => {
//       const storedToken = await AsyncStorage.getItem("token");
//       setToken(storedToken);
//     };
//     checkToken();
//   }, []);

//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       {token ? (
//         <Stack.Screen name="Home">
//           {props => <HomeScreen {...props} checkToken={() => setToken(null)} />}
//         </Stack.Screen>
//       ) : (
//         <Stack.Screen name="Login">
//           {props => <LoginScreen {...props} checkToken={() => setToken("dummy")} />}
//         </Stack.Screen>
//       )}
//     </Stack.Navigator>
//   );
// }

import React, { useEffect, useState } from "react";  
import { Text, View } from "react-native";  
import { createDrawerNavigator } from "@react-navigation/drawer";  
import { NavigationContainer } from "@react-navigation/native";  
import AsyncStorage from "@react-native-async-storage/async-storage";  

import LoginScreen from "./LoginScreen";  
import HomeScreen from "./HomeScreen";  

const Drawer = createDrawerNavigator();  

export default function Index() {  
    const [token, setToken] = useState<string | null>(null);  

    useEffect(() => {  
        const checkToken = async () => {  
            const storedToken = await AsyncStorage.getItem("token");  
            setToken(storedToken);  
        };  
        checkToken();  
    }, []);  

    return (  
        <Drawer.Navigator>  
            {token ? (  
                <Drawer.Screen name="Home" component={HomeScreen} />  
            ) : (  
                <Drawer.Screen name="Login" component={LoginScreen} />  
            )}  
        </Drawer.Navigator>  
    );  
}  