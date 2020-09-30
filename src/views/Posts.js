import React from 'react';
import { SafeAreaView, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import CardImage from './Card';

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
    isRefreshing: false,
  };
  items = null;

  componentDidMount() {
    this.loadPost()
  }

  loadPost = () => {
    getUserPosts().then((data) => {
      this.items = data;
      this.setState({ isReady: true });
    }).catch((err) => err)
  }

  handleRefresh = () => {
    this.setState({isRefreshing: true,}, () => {this.loadPost();});
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
            refreshing={this.state.isRefreshing}
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
          <ActivityIndicator style={styles.appLoading} size="small" color="#FFF" />
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
  appLoading: {
    flex: 1,
    justifyContent: 'center',
  }
});