import React from 'react';
import { StatusBar, StyleSheet, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import LottieView from 'lottie-react-native';

export default class Loading extends React.Component {
  componentDidMount() {
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('accessToken');
    this.props.navigation.navigate(userToken ? 'Home' : 'Welcome');
  };

  render() {
    return (
        <SafeAreaView style={styles.container}>
          <StatusBar
            barStyle="light-content"
            backgroundColor="#000000"
          />
          <LottieView
              source={require('../assets/loading.json')}
              autoPlay
              loop
              style={{
                height: 350,
              }}
            />
        </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#191970',
  },
});