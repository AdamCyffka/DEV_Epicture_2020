import React from 'react';
import { SafeAreaView, StyleSheet, FlatList, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import CardImage from '../components/Card';
import LottieView from 'lottie-react-native';

async function getUserPosts() {
  const token = await AsyncStorage.getItem('accessToken');
  return fetch('https://api.imgur.com/3/account/me/images', {
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
    .then((result) => {
      if (result.success)
        return Promise.resolve(result.data);
      return Promise.reject(result.data);
    });
}

export default class Posts extends React.Component {

  state = {
    isReady: false,
  };
  items = null;

  componentDidMount() {
    this.loadPost()
  }

  loadPost = () => {
    getUserPosts().then((data) => {
      this.items = data;
      this.setState({ isReady: false });
    }).catch((err) => err)
  }

  handleRefresh = () => {
    this.setState({
      isReady: true
    }, () => {
      this.loadPost();
    });
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {this.items !== null ?
          <FlatList
            data={this.items}
            initialNumToRender={5}
            maxToRenderPerBatch={10}
            windowSize={10}
            refreshing={this.state.isReady}
            onRefresh={this.handleRefresh}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => {
              return <CardImage
                image={{ id: item.id, height: item.height, width: item.width, type: item.type }}
                item={item}
              />
            }}
          />
        :
          <View style={styles.lottieView}>
            <LottieView
              source={require('../assets/loading.json')}
              autoPlay
              loop
              style={{
                height: 350,
              }}
            />
          </View>
        }
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191970',
  },
  lottieView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});