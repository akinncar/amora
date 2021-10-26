import * as React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Home } from './components/Home/Home'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Settings" component={Home} />
    </Tab.Navigator>
  );
}

export function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={"Menu"}>
        <Stack.Screen
          name="Menu"
          component={BottomTab}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}