import React from 'react';
import { Thumbnail, Icon, View } from "native-base";
import { TouchableOpacity, ImageBackground, StatusBar, Dimensions, StyleSheet, Text, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import TopTabs from '../navigation/TopTabs'

async function getAccountInfo() {
  const token = await AsyncStorage.getItem('accessToken')
  const username = await AsyncStorage.getItem('userName')
  return fetch('https://api.imgur.com/3/account/' + username, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  })
  .then((response) => {
    return response.json()
  })
}

export default class Profile extends React.Component {
  constructor() {
    super()
    this.state = {
      loading: true,
      avatar : null,
      background: null,
      reputation: null,
      reputationName: null,
      username: null,
      date: new Date(),
    }
  }

  componentDidMount() {
    getAccountInfo()
      .then((response) => {
        const data = response.data
        this.setState({
          loading: false,
          avatar: data.avatar,
          background: data.cover,
          reputation: data.reputation,
          reputationName: data.reputation_name,
          username: data.url,
          date: new Date(data.created * 1000)
        })
      }).catch(err => err);
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#000000"
        />
        <ImageBackground
          source={{ uri: this.state.background }}
          style={{
            width: width,
            height: height * 0.2,
            justifyContent: "center",
          }}
          imageStyle={{ opacity: 0.8 }}
        >
          <View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Thumbnail source={{ uri: this.state.avatar }} />
              <Text style={styles.username}>
                {this.state.username}
              </Text>
              <Text style={styles.info}>
                {this.state.reputation} PTS •{" "}
                {this.state.reputationName}
              </Text>
              <Text style={styles.date}>
                Created on {this.state.date.getMonth() + 1}/{this.state.date.getFullYear()}
              </Text>
            </View>
          </View>
        </ImageBackground>
        <TopTabs />
      </SafeAreaView>
    )
  }
}

const width = Dimensions.get("window").width
const height = Dimensions.get("window").height
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#16202b'
  },
  username: {
    color: '#ffffff',
    fontSize: 14,
    marginTop: 5,
    fontWeight: 'bold'
  },
  info: {
    color: '#ffffff',
    fontSize: 14,
    marginTop: 2,
    marginBottom: 2
  },
  date: {
    color: '#ffffff',
    fontSize: 12
  }
})