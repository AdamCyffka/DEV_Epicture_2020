import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

export default class Settings extends React.Component {
  logOut = async () => {
    await AsyncStorage.removeItem('accessToken')
    await AsyncStorage.removeItem('userName')
    Alert.alert('You have been disconnected')
    this.props.navigation.navigate('Welcome')
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ width: "80%" }}>
          <TouchableOpacity style={styles.button} onPress={this.logOut}>
            <Text style={styles.buttonText}>Sign Out</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonRed}>Delete account</Text>
          </TouchableOpacity>
        </View>
			</View>
    )
  }
}

const styles = StyleSheet.create({
	container: {
    flex: 1,
    backgroundColor: '#17202A',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  button: {
    backgroundColor: "#1ea1f1",
    borderColor: "#1ea1f1",
    borderWidth: 2,
    padding: 10,
    margin: 10,
    borderRadius: 60
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: "center"
  },
  buttonRed: {
    color: "#dc143c",
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: "center"
  }
})