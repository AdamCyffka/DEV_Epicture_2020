import React from 'react'
import { Text, Button, Thumbnail, Card, CardItem, Left, Body, Icon, Right } from 'native-base'
import { StyleSheet, Image, View } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import Share from 'react-native-share'
import VideoPlayer from 'react-native-video-player';

async function favImage(imageHash) {
  const token = await AsyncStorage.getItem('accessToken')
  return fetch(`https://api.imgur.com/3/image/${imageHash}/favorite`, {
    method: 'POST',
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

async function downVoteImage(imageHash) {
  const token = await AsyncStorage.getItem('accessToken')
  return fetch(`https://api.imgur.com/3/gallery/${imageHash}/vote/down`, {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
  .then((response) => {
    return response.json()
  })
  .then((result) => {
    if (result.success)
      return Promise.resolve()
    return Promise.reject(result.data)
  })
}

async function upVoteImage(imageHash) {
  const token = await AsyncStorage.getItem('accessToken')
  return fetch(`https://api.imgur.com/3/gallery/${imageHash}/vote/up`, {
    method: 'POST',
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

async function getImageInfo(imageHash) {
  const token = await AsyncStorage.getItem('accessToken')
  return fetch(`https://api.imgur.com/3/image/${imageHash}`, {
    'method': 'GET',
    'headers': {
      'Authorization': 'Bearer ' + token
    },
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

export default class CardImage extends React.Component {
  state = {
    upVoted: this.props.item.vote === 'up' ? true : false,
    downVoted: this.props.item.vote === 'down' ? true : false,
    fav: this.props.item.favorite,
    ups: this.props.item.ups ?this.props.item.ups : 0 ,
    downs: this.props.item.downs ?this.props.item.downs : 0
  }

  componentDidMount() {
    this.updateItem()
  }

  isUpVoted() {
    tmp = !this.state.upVoted
    tmp2 = this.state.ups
    tmp3 = this.state.downs

    this.setState({ upVoted: tmp })
    if (tmp) {
      upVoteImage(this.props.image.id).catch(err => err)
      this.setState({ ups: tmp2 + 1 })
      if (this.state.downVoted) {
        this.setState({ downs: tmp3 - 1, downVoted: false })
      }
    } else {
      this.setState({ ups: tmp2 - 1 })
    }
  }

  isDownVoted() {
    tmp = !this.state.downVoted
    tmp2 = this.state.downs
    tmp3 = this.state.ups

    this.setState({ downVoted: tmp })
    if (tmp) {
      downVoteImage(this.props.image.id).catch(err => err)
      this.setState({ downs: tmp2 + 1 })
      if (this.state.upVoted) {
        this.setState({ ups: tmp3 - 1, upVoted: false })
      }
    } else {
      this.setState({ downs: tmp2 - 1 })
    }
  }

  isFav() {
    favImage(this.props.image.id).then((data) => {
      if (data === 'unfavorited')
        this.setState({ fav: false })
      else
        this.setState({ fav: true })
    }).catch(e => e)
  }

  updateItem = () => {
    getImageInfo(this.props.image.id).then((data) => {
      this.setState({ fav: data.favorite })
      if (data.vote == 'up')
        this.setState({ upVoted: true })
      else if (data.vote == 'down')
        this.setState({ upVoted: false })
    }).catch((err) => err)
  }

  shareSingleImage = async () => {
    const shareOptions = {
      title: 'Share file',
      url: `https://i.imgur.com/${this.props.image.id}`,
      failOnCancel: false
    }
    await Share.open(shareOptions)
  }

  render() {
    return (
      <Card transparent>
        <CardItem style={styles.card}>
          <Left>
            <Thumbnail source={{ uri: `https://imgur.com/user/${this.props.item.account_url}/avatar?maxwidth=290` }} />
            <Body>
              <Text style={styles.title}>{this.props.item.title}</Text>
              <Text style={styles.username}>{this.props.item.account_url}</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem cardBody style={{ aspectRatio: this.props.image.width / this.props.image.height, flex: 1 }}>
          <View>
            <Image
              source={{ uri: `https://i.imgur.com/${this.props.image.id}.gif` }}
              style={{ aspectRatio: this.props.image.width / this.props.image.height, flex: 1 }}
            />
            {/* <VideoPlayer
              autoplay
              defaultMuted
              loop
              video={{ uri: 'https://i.imgur.com/MCreGys.mp4' }}
              videoWidth={this.props.image.width}
              videoHeight={this.props.image.height}
            /> */}
          </View>
        </CardItem>
        <CardItem style={styles.card}>
          <Left>
            <Button transparent>
              <Icon style={this.state.upVoted ? styles.active : styles.grey} name='arrow-up' />
              <Text style={styles.white}>{this.state.ups}</Text>
            </Button>
            <Button transparent>
              <Icon style={this.state.downVoted ? styles.active : styles.grey} name='arrow-down' />
              <Text style={styles.white}>{this.state.downs}</Text>
            </Button>
            <Button transparent onPress={() => this.isFav()}>
              <Icon style={this.state.fav ? styles.activeFav : styles.grey} name='heart' />
              <Text style={styles.white}>{this.props.item.favorite_count}</Text>
            </Button>
          </Left>
          <Right>
            <Button transparent onPress={() => this.shareSingleImage()}>
              <Icon style={styles.share} name='share-social' />
            </Button>
          </Right>
        </CardItem>
        <View
          style={{
            borderBottomColor: '#3f4e59',
            borderBottomWidth: 1
          }}
        />
      </Card>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#17202A'
  },
  grey: {
    color: '#3f4e59'
  },
  white: {
    color: '#ffffff'
  },
  share: {
    color: '#3f4e59',
    fontSize: 25
  },
  active: {
    color: '#19B76F'
  },
  activeFav: {
    color: '#dc143c'
  },
  title: {
    color: '#ffffff',
    fontSize: 18
  },
  username: {
    color: '#ffffff',
    fontSize: 14
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
})