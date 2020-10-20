import React from 'react'
import { StyleSheet, FlatList, View, RefreshControl } from 'react-native'
import LottieView from 'lottie-react-native'
import CardImage from '../components/CardImage'
import { getUserPosts } from '../api/Imgur'

export default class Posts extends React.Component {
  state = {
    isReady: false
  };
  items = null

  componentDidMount() {
    this.loadPost()
  }

  loadPost = () => {
    getUserPosts().then((data) => {
      this.items = data
      this.setState({ isReady: false })
    }).catch((err) => err)
  }

  handleRefresh = () => {
    this.setState({
      isReady: true
    }, () => {
      this.loadPost()
    })
  }

  render() {
    return (
      <View style={styles.container}>
        {this.items !== null ?
          <FlatList
            data={this.items}
            initialNumToRender={5}
            maxToRenderPerBatch={5}
            windowSize={15}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => {
              return <CardImage
                image={{ id: item.id, height: item.height, width: item.width, type: item.type, link: item.link }}
                item={item}
              />
            }}
            refreshControl={
              <RefreshControl
                tintColor='red'
                titleColor="red"
                title="Pull to refresh"
                refreshing={this.state.isReady}
                onRefresh={this.handleRefresh}
              />
            }
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
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#16202b'
  },
  lottieView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})