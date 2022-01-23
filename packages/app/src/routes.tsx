import * as React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Feather } from "@expo/vector-icons";

import { Home } from "./components/home/Home";
import { Settings } from "./components/settings/Settings";
import { StoreDetails } from "./components/storeDetails/StoreDetails";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Estabelecimentos"
        component={Home}
        options={{
          tabBarLabel: () => {
            return null;
          },
          tabBarIcon: ({ color }) => (
            <Feather name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Configurações"
        component={Settings}
        options={{
          tabBarLabel: () => {
            return null;
          },
          tabBarIcon: ({ color }) => (
            <Feather name="settings" color={color} size={26} />
          ),
        }}
      />
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
        <Stack.Screen name="StoreDetails" component={StoreDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
