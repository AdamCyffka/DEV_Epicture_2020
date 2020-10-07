import React from 'react';
import { Header, Body, Thumbnail } from "native-base";
import { TouchableOpacity, ImageBackground, StatusBar, Dimensions, StyleSheet, Text, Platform, SafeAreaView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TopTabs from '../navigation/TopTabs';
import AsyncStorage from '@react-native-community/async-storage';

async function getAccountInfo() {
  const token = await AsyncStorage.getItem('accessToken');
  const username = await AsyncStorage.getItem('userName');
  return fetch('https://api.imgur.com/3/account/' + username, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  })
    .then((response) => {
      return response.json();
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
      username: null
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
        })
      }).catch(err => err);
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={{ uri: this.state.background }}
          style={{
            width: width,
            height: height * 0.2,
          }}
          imageStyle={{ opacity: 0.8 }}
        >
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Settings')}
            style={{
              marginLeft: '87%',
              marginTop: '13%',
            }}
          >
            <Ionicons name="ios-settings" size={38} style={{ color: "white" }} />
          </TouchableOpacity>
          <Header transparent>
            <StatusBar
              barStyle="light-content"
              backgroundColor="#000000"
            />
            <Body style={{ justifyContent: "center", alignItems: "center", marginBottom: Platform.OS === 'ios' ? '0%' : '15%' }}>
              <Thumbnail source={{ uri: this.state.avatar }} />
              <Text style={styles.username}>
                {/* {this.state.username} */}
                AdamCyffka
              </Text>
              <Text style={styles.info}>
                {/* {this.state.userInfo.reputation_name} â€¢{" "}
                {this.state.userInfo.reputation} Points */}
                1500 points
              </Text>
            </Body>
          </Header>
        </ImageBackground>
        <TopTabs />
      </SafeAreaView >
    );
  }
}

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191970',
  },
  username: {
    color: "white",
    fontSize: 14,
    marginTop: 5,
    fontWeight: "bold",
  },
  info: {
    color: "white",
    fontSize: 14,
    marginTop: 2,
    marginBottom: 2,
  },
});