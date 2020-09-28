import React from 'react';
import { TouchableOpacity, StatusBar, View, Text, StyleSheet, SafeAreaView } from 'react-native';

export default class Welcome extends React.Component {
  render() {
    return (
        <SafeAreaView style={styles.container}>
          <StatusBar
            barStyle="light-content"
            backgroundColor="#000000"
          />
          <View style={{alignItems: "center"}}>
            <Text style={styles.welcomeTitle}>Epicture</Text>
          </View>
          <View style={styles.buttons}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Login')}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Home')}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Continue as guest</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#191970',
  },
  welcomeTitle: {
    color: '#FFFFFF',
    fontSize: 40,
    paddingBottom: 10,
    textAlign: "center",
  },
  buttons: {
    position: "absolute",
    bottom: 50,
    width: "80%",
  },
  button: {
    backgroundColor: "#FFFFFF",
    borderColor: "#FFFFFF",
    borderWidth: 2,
    textAlign: "center",
    padding: 10,
    margin: 10,
    borderRadius: 60,
  },
  buttonText: {
    color: "#191970",
    fontSize: 20,
    textAlign: "center",
  },
});