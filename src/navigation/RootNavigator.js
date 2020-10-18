import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { StackNavigator } from '../navigation/StackNavigator'
import { DrawerContent } from '../components/DrawerContent'

const Drawer = createDrawerNavigator()

export default class RootNavigator extends React.Component {
  render () {
    return (
      <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen name="Stack" component={StackNavigator} />
      </Drawer.Navigator>
    )
  }
}