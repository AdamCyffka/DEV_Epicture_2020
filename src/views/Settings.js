import React from 'react';
import { StatusBar, View, Text, StyleSheet, SafeAreaView } from 'react-native';

export default class Settings extends React.Component {
  render() {
    return (
        <SafeAreaView style={styles.container}>
          <StatusBar
            barStyle="light-content"
            backgroundColor="#000000"
          />
        </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#191970',
  },
});