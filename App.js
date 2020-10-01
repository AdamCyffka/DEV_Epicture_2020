import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import AppContainer from './src/navigation/AppContainer';

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <AppContainer />
      </NavigationContainer>
    </PaperProvider>
  );
}