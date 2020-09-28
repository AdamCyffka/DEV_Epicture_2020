import React from 'react';
import { Header, Container } from "native-base";
import { TouchableOpacity, ImageBackground, StatusBar, View, Dimensions, Text, StyleSheet, SafeAreaView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TopTabs from '../navigation/TopTabs';
import AsyncStorage from '@react-native-community/async-storage';

export default class Profile extends React.Component {

  logout = async () => {
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('userName');
    this.props.navigation.navigate('Welcome');
  };

  render() {
    return (
        <Container  style={styles.container}>
          <ImageBackground
            source={{ uri: "http://www.allwhitebackground.com/images/6/Space-Star-Background-Image.jpg" }}
            style={{
              width: width,
              height: height * 0.2,
              justifyContent: "center",
            }}
            imageStyle={{ opacity: 0.8 }}
          >
            <TouchableOpacity
              onPress={this.logout}
              style={{
                padding: 5,
                paddingTop: 30,
              }}
            >
              <Ionicons name="ios-exit" size={38} style={{ color: "white" }} />
            </TouchableOpacity>
            <Header transparent>
              <StatusBar barStyle="light-content" />
            </Header>
          </ImageBackground>
          <TopTabs />
        </Container >
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
});