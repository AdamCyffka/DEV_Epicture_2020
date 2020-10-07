import React from 'react';
import { View, FlatList, Text, StyleSheet, SafeAreaView } from 'react-native';
import CardImage from '../components/Card';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-community/async-storage';

function getUserSearch(tag) {
  const id = '7282df4b8e311c8';
  return fetch('https://api.imgur.com/3/gallery/search?q=' + tag, {
    method: 'GET',
    headers: {
      'Authorization': 'Client-ID ' + id
    }
  })
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      if (result.success)
        return Promise.resolve(result.data);
      return Promise.reject(result.data);
  })
}

export default class Result extends React.Component {

  constructor() {
    super()
    this.state = {
      loading: true,
      items: null,
    }
  }

  componentDidMount() {
    this.loadSearch()
  }

  loadSearch = () => {
    getUserSearch(this.props.route.params.search).then((data) => {
      this.state.items = data;
      this.setState({ loading: false });
    }).catch((err) => err)
  }

  handleRefresh = () => {
    this.setState({
      loading: true
    }, () => {
      this.loadSearch();
    });
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {this.state.items !== null ?
          <FlatList
            data={this.state.items}
            initialNumToRender={5}
            maxToRenderPerBatch={5}
            windowSize={15}
            refreshing={this.state.loading}
            onRefresh={this.handleRefresh}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => {
              return <CardImage
                image={item.images[0]}
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
})