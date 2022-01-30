import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { AntDesign, Feather } from '@expo/vector-icons';

import { Home } from './components/home/Home';
import { Settings } from './components/settings/Settings';
import { StoreDetails } from './components/storeDetails/StoreDetails';
import { QrCode } from './components/qrCode/QrCode';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerTitle: 'Estabelecimentos',
          tabBarLabel: () => {
            return null;
          },
          tabBarIcon: ({ color }) => (
            <Feather name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="MenuQrCode"
        component={QrCode}
        options={{
          tabBarLabel: () => {
            return null;
          },
          tabBarIcon: ({ color }) => (
            <AntDesign name="qrcode" color={color} size={26} />
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: e => {
            e.preventDefault();
            return navigation.navigate('QrCode');
          },
        })}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          headerTitle: 'Configurações',
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
      <Stack.Navigator initialRouteName={'Menu'}>
        <Stack.Screen
          name="Menu"
          component={BottomTab}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Group screenOptions={{ presentation: 'modal' }}>
          <Stack.Screen
            name="QrCode"
            component={QrCode}
            options={{
              headerTitle: 'Seu QRCode',
              headerBackTitleVisible: false,
            }}
          />
        </Stack.Group>
        <Stack.Screen
          name="StoreDetails"
          component={StoreDetails}
          options={({ route }) => ({
            title: route.params.title,
            headerBackTitleVisible: false,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
