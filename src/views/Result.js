import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import ImageCard from '../components/ImageCard';

export default class Result extends React.Component {
  constructor(props) {
    super()
    this.state = {
      dataSource: null,
      favorites: [],
      loading: true,
    }
  }

  searchByTag = async (tag) => {
    const id = '7282df4b8e311c8'
    return fetch('https://api.imgur.com/3/gallery/t/' + tag, {
      headers: {
        'Authorization': 'Client-ID ' + id
      }
    })
    .then((response) => {
      return response.json()
    })
  };

  getUserFavorites = async () => {
    const token = await AsyncStorage.getItem('accessToken');
    const username = await AsyncStorage.getItem('userName');
    return fetch('https://api.imgur.com/3/account/' + username + '/favorites/', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
    .then((response) => {
      return response.json()
    })
  };

  componentDidMount() {
    this.getUserFavorites().then(
      (response) => {
        this.setState({ favorites: response.data })
        this.searchByTag(this.props.route.params.search).then(
          (response) => {
            this.setState({ dataSource: response.data.items, loading: false })
          },
          (error) => {
            console.log('error: ', error)
          },
        )
      },
      (error) => {
        console.log('error: ', error)
      },
    )
  }

  render() {
    let { loading, dataSource, favorites } = this.state
    let results = null

    if (loading) {
      results = (
        <View style={style.loadingContainer}>
          <Text style={style.loading}>Loading your best search</Text>
        </View>
      )
    }

    if (!loading) {
      results =
        dataSource &&
        dataSource.map((el) => (
          <ImageCard
            key={el.id}
            result={el}
            userFavorites={favorites}
          />
        ))
    }

    return (
      <View style={style.container}>
        <ScrollView style={style.mainContainer}>
          <View style={{ flex: 1 }}>{results}</View>
        </ScrollView>
      </View>
    )
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  headingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
    borderBottomWidth: 1,
    borderBottomColor: '#ededed',
  },
  heading: {
    fontSize: 20,
    marginTop: 10,
  },
  mainContainer: {
    flex: 1,
  },
  closeButton: {
    height: 20,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#e6e6e6',
    borderBottomWidth: 1,
  },
  closeButtonText: {
    fontSize: 16,
    color: '#afafaf',
    marginTop: 10,
  },
  loadingContainer: {
    alignItems: 'center',
    marginTop: 160,
  },
  loading: {
    fontSize: 22,
    color: '#7f7f7f',
  },
  results: {
    color: '#c9c9c9',
    textAlign: 'center',
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 17,
  },
  resultsContainer: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#ededed',
  },
})