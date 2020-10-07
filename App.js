import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppContainer from './src/navigation/AppContainer';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AppContainer />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}