import AsyncStorage from '@react-native-community/async-storage';
import { Api } from '../config/Api';

export async function isSignedIn() {
  const token = await AsyncStorage.getItem('accessToken');
  const username = await AsyncStorage.getItem('userName');
  if (token && username)
    return true;
  return false;
}