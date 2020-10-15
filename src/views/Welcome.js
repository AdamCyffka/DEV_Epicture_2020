import React from 'react'
import { TouchableOpacity, StatusBar, View, Text, StyleSheet, SafeAreaView } from 'react-native'
import LottieView from 'lottie-react-native'

import I18n from '../i18n/locales'

export default class Welcome extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#000000"
        />
        <View style={styles.lottieView}>
          <LottieView
            source={require('../assets/image.json')}
            autoPlay
            loop
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%'
            }}
          />
          <Text style={styles.welcomeTitle}>Epimgur</Text>
        </View>
        <View style={styles.buttonsView}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Login')}
            style={styles.button}
          >
            <Text style={styles.buttonText}>{I18n.t('welcome.login')}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#17202A'
  },
  lottieView: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: '70%',
    width: '80%'
  },
  welcomeTitle: {
    color: '#ffffff',
    width: '100%',
    fontSize: 40,
    textAlign: "center"
  },
  buttonsView: {
    width: "80%"
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
    textAlign: "center",
    fontWeight: 'bold'
  }
})