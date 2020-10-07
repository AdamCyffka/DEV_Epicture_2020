import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppContainer from './src/navigation/AppContainer';

export default function App() {
  return (
    <NavigationContainer>
      <AppContainer />
    </NavigationContainer>
  );
}