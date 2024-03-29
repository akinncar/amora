import * as React from 'react';
import { TouchableOpacity } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { AntDesign, Feather } from '@expo/vector-icons';

import { Home } from './components/home/Home';
import { CreateStore } from './components/home/CreateStore';
import { Settings } from './components/settings/Settings';
import { SignUp } from './components/auth/SignUp';
import { SignIn } from './components/auth/SignIn';
import { StoreDetails } from './components/storeDetails/StoreDetails';
import { QrCode } from './components/qrCode/QrCode';
import { ScanQrCode } from './components/qrCode/ScanQrCode';
import { useAuth } from './core/auth/useAuth';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTab() {
  const { token, type } = useAuth();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerTitle:
            type === 'customer' ? 'Estabelecimentos' : 'Seus produtos',
          tabBarLabel: () => {
            return null;
          },
          tabBarIcon: ({ color }) => (
            <Feather name="home" color={color} size={26} />
          ),
        }}
      />
      {token && type === 'customer' && (
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
      )}
      {token && type === 'provider' && (
        <Tab.Screen
          name="MenuScanQrCode"
          component={ScanQrCode}
          options={{
            tabBarLabel: () => {
              return null;
            },
            tabBarIcon: ({ color }) => (
              <AntDesign name="scan1" color={color} size={26} />
            ),
          }}
          listeners={({ navigation }) => ({
            tabPress: e => {
              e.preventDefault();
              return navigation.navigate('ScanQrCode');
            },
          })}
        />
      )}
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
            name="SignUp"
            component={SignUp}
            options={({ navigation }) => ({
              headerTitle: 'Criar sua conta',
              // headerBackTitleVisible: false,
              headerLeft: () => null,
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={{ padding: 8, marginRight: 8 }}
                >
                  <Feather name="x" size={24} />
                </TouchableOpacity>
              ),
            })}
          />
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={({ navigation }) => ({
              headerTitle: 'Faça o login',
              // headerBackTitleVisible: false,
              headerLeft: () => null,
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={{ padding: 8, marginRight: 8 }}
                >
                  <Feather name="x" size={24} />
                </TouchableOpacity>
              ),
            })}
          />
        </Stack.Group>
        <Stack.Group screenOptions={{ presentation: 'modal' }}>
          <Stack.Screen
            name="QrCode"
            component={QrCode}
            options={({ navigation }) => ({
              headerTitle: 'Seu QRCode',
              headerLeft: () => null,
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={{ padding: 8, marginRight: 8 }}
                >
                  <Feather name="x" size={24} />
                </TouchableOpacity>
              ),
            })}
          />
          <Stack.Screen
            name="ScanQrCode"
            component={ScanQrCode}
            options={({ navigation }) => ({
              headerTitle: 'Aponte para um QRCode',
              headerLeft: () => null,
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={{ padding: 8, marginRight: 8 }}
                >
                  <Feather name="x" size={24} />
                </TouchableOpacity>
              ),
            })}
          />
        </Stack.Group>
        <Stack.Group screenOptions={{ presentation: 'modal' }}>
          <Stack.Screen
            name="CreateStore"
            component={CreateStore}
            options={() => ({
              headerTitle: 'Cadastre seu Estabelecimento',
              headerLeft: () => null,
            })}
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
