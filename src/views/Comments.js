import React from 'react'
import { StyleSheet, SafeAreaView, FlatList, View } from 'react-native'
import LottieView from 'lottie-react-native'
import AsyncStorage from '@react-native-community/async-storage'

import Comment from '../components/CardComment'

async function getUserComments() {
  const token = await AsyncStorage.getItem('accessToken')
  const username = await AsyncStorage.getItem('userName')
  return fetch(`https://api.imgur.com/3/account/${username}/comments`, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
  .then((response) => {
    return response.json()
  })
  .then((result) => {
    if (result.success)
      return Promise.resolve(result.data)
    return Promise.reject(result.data)
  })
}

export default class Comments extends React.Component {
  state = {
    isReady: false
  }
  items = null

  componentDidMount() {
    this.loadComment()
  }

  loadComment = () => {
    getUserComments().then((data) => {
      this.items = data
      this.setState({ isReady: false })
    }).catch((err) => err)
  }

  handleRefresh = () => {
    this.setState({
      isReady: true
    }, () => {
      this.loadComment()
    })
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {this.items !== null ?
          <FlatList style={styles.cardContent}
            data={this.items}
            initialNumToRender={5}
            maxToRenderPerBatch={5}
            windowSize={15}
            refreshing={this.state.isReady}
            onRefresh={this.handleRefresh}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => {
              return <Comment
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
                height: 350
              }}
            />
          </View>
        }
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191970'
  },
  lottieView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardContent: {
    marginTop: 0,
    marginHorizontal: 5
  }
})