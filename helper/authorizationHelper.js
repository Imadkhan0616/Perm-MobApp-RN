import AsyncStorage from "@react-native-async-storage/async-storage";

export const isAuthenticated = async () => {
  const token = await AsyncStorage.getItem('token');
  return token !== null && token !== undefined;
};
