import React from 'react';
import { View, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import CardImage from '../components/Card';
import LottieView from 'lottie-react-native';

function searchPost(query) {
  return fetch('https://api.imgur.com/3/gallery/search?q=' + query, {
    headers: {
      'Authorization': 'Client-ID 7282df4b8e311c8'
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
      items: null,
      isFetching: false,
    }
  }

  componentDidMount() {
    this.handleSearch(this.props.route.params.search);
  }

  handleSearch = () => {
    this.setState({ isFetching: true })
    searchPost(this.props.route.params.search).then((data) => {
      this.setState({ items: data })
      this.setState({ isFetching: false })
    }).catch((err) => err)
  }

  handleRefresh = () => {
    this.setState({
      isRefreshing: true,
      items: null
    }, () => {
      this.handleSearch(this.props.route.params.search);
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
            refreshing={this.state.isFetching}
            onRefresh={this.handleRefresh}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => {
              if (!item.images)
                return;
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