import 'react-native-gesture-handler'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { Provider as PaperProvider } from 'react-native-paper'
import RootNavigator from './src/navigation/RootNavigator'

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </PaperProvider>
  )
}