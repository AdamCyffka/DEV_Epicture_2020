import React from 'react'
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack'
import { TouchableOpacity } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { BottomNavigator } from './BottomNavigator';
import Loading from '../views/Loading'
import Search from '../views/Search'
import Welcome from '../views/Welcome'
import Login from '../views/Login'
import Upload from '../views/Upload'
import Profile from '../views/Profile'

const Stack = createStackNavigator();

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
              fontWeight: 'bold',
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
            options={{
              title: 'Login',
              headerStyle: {
                backgroundColor: '#16202b',
              },
              headerTintColor: '#ffffff',
              }}
            component={Login}
          />
          <Stack.Screen
            name='Home'
            options={{
              headerShown: false
            }}
            component={BottomNavigator}
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
            options={{
              title: 'Search result',
              headerStyle: {
                backgroundColor: '#16202b',
              },
              headerTintColor: '#ffffff',
              }}
            component={Search}
          />
        </Stack.Navigator>
    )
  }
}