// import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import Index from "./index";

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Index />
//     </NavigationContainer>
//   );
// }
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


