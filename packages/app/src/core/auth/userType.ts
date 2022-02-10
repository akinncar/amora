import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_TYPE_KEY = '@user/TYPE';

export const getUserType = () => AsyncStorage.getItem(USER_TYPE_KEY);

export const updateUserType = (userType?: 'customer' | 'provider') => {
  if (!userType) {
    return AsyncStorage.removeItem(USER_TYPE_KEY);
  } else {
    return AsyncStorage.setItem(USER_TYPE_KEY, userType);
  }
};
