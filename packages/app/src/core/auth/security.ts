import AsyncStorage from '@react-native-async-storage/async-storage';

const JWT_TOKEN_KEY = '@user/TOKEN';

export const getAuthToken = () => AsyncStorage.getItem(JWT_TOKEN_KEY);

export const updateAuthToken = (token?: any) => {
  if (!token) {
    return AsyncStorage.removeItem(JWT_TOKEN_KEY);
  } else {
    return AsyncStorage.setItem(JWT_TOKEN_KEY, token);
  }
};
