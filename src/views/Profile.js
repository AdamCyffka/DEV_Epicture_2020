import React from 'react';
import { Header, Body, Thumbnail, Container, Icon, Button, View } from "native-base";
import { TouchableOpacity, ImageBackground, StatusBar, Dimensions, StyleSheet, Text, Platform, SafeAreaView } from 'react-native';
import TopTabs from '../navigation/TopTabs';
import AsyncStorage from '@react-native-community/async-storage';
import { isSignedIn } from "../api/Imgur";

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
      isSignIn: false,
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
    if (isSignedIn()) this.setState({ isSignIn: true });
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
    if (!this.state.isSignIn) {
      return (
        <Container style={styles.centerContainer}>
          <Button
            style={styles.loginButton}
            onPress={() => this.props.navigation.navigate("Welcome")}
          >
            <Text style={styles.loginButtonText}>LOGIN</Text>
          </Button>
        </Container>
      );
    }
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
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Settings')}
            style={{
              position: "absolute",
              right: 10,
              top: Platform.OS === "ios" ? 34 : 10,
            }}
          >
            <Icon name="settings" style={{ color: "white" }} />
          </TouchableOpacity>
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
  date: {
    color: 'white',
    fontSize: 12,
  },
});