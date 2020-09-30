import React from 'react';
import { SafeAreaView, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import CardImage from './Card';

async function getUserFavorites() {
  const token = await AsyncStorage.getItem('accessToken');
  const username = await AsyncStorage.getItem('userName');
  return fetch('https://api.imgur.com/3/account/' + username + '/favorites/', {
    method: 'GET',
    headers: {
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

export default class Favorites extends React.Component {

  state = {
    items: null,
    isReady: false,
    isFetching: false,
  };
  items = null;

  componentDidMount() {
    getUserFavorites().then((data) => {
      this.items = data;
      this.setState({ isReady: true });
    }).catch((err) => err)
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {this.items !== null ?
          <FlatList
            data={this.items}
            initialNumToRender={5}
            maxToRenderPerBatch={10}
            windowSize={10}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => {
              return <CardImage
                image={{ id: item.cover, height: item.height, width: item.width, type: item.type }}
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