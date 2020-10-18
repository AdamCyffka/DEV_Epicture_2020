import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Loading from '../views/Loading'
import Search from '../views/Search'
import Welcome from '../views/Welcome'
import Login from '../views/Login'
import Upload from '../views/Upload'
import Profile from '../views/Profile'
import Home from '../views/Home'

const Stack = createStackNavigator()

export class StackNavigator extends React.Component {
  render() {
    return (
        <Stack.Navigator
          initialRouteName='Loading'
          headerMode="screen"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#1e3f83',
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
              fontWeight: 'bold'
            },
            headerTitleAlign: 'center'
          }}
        >
          <Stack.Screen
            name='Loading'
            options={{headerShown: false}}
            component={Loading}
          />
          <Stack.Screen
            name='Welcome'
            options={{headerShown: false}}
            component={Welcome}
          />
          <Stack.Screen
            name='Login'
            options={{headerShown: false}}
            component={Login}
          />
          <Stack.Screen
            name='Home'
            options={{headerShown: false}}
            component={Home}
          />
          <Stack.Screen
            name='Profile'
            options={{headerShown: false}}
            component={Profile}
          />
          <Stack.Screen
            name='Upload'
            options={{headerShown: false}}
            component={Upload}
          />
          <Stack.Screen
            name='Search'
            options={{headerShown: false}}
            component={Search}
          />
        </Stack.Navigator>
    )
  }
}