import React from 'react'
import { SafeAreaView, StyleSheet, FlatList, View } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import LottieView from 'lottie-react-native'

export default class Comments extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191970'
  },
  lottieView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})