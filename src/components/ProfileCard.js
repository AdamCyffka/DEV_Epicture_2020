import React from 'react';
import { Text, Button, Thumbnail, Card, CardItem, Left, Body, Icon, Right } from 'native-base';
import { StyleSheet, Image, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import ActionSheet from "react-native-action-sheet";

async function favImage(imageHash) {
  const token = AsyncStorage.getItem('accessToken');
  return fetch('https://api.imgur.com/3/image/' + imageHash + '/favorite', {
    method: 'POST',
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

async function downVoteImage(imageHash) {
  const token = AsyncStorage.getItem('accessToken');
  return fetch('https://api.imgur.com/3/gallery/' + imageHash + '/vote/down', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      if (result.success)
        return Promise.resolve();
      return Promise.reject(result.data);
    });
}

async function upVoteImage(imageHash) {
  const token = AsyncStorage.getItem('accessToken');
  return fetch('https://api.imgur.com/3/gallery/' + imageHash + '/vote/up', {
    method: 'POST',
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

async function deleteImage(imageHash) {
  const token = AsyncStorage.getItem('accessToken');
  return fetch('https://api.imgur.com/3/image/' + imageHash, {
    method: 'DELETE',
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

export default class ProfileCardImage extends React.PureComponent {

  state = {
    upVoted: this.props.item.vote === "up" ? true : false,
    downVoted: this.props.item.vote === "down" ? true : false,
    fav: this.props.item.favorite,
    ups: this.props.item.ups ?this.props.item.ups : 0 ,
    downs: this.props.item.downs ?this.props.item.downs : 0,
    loading: false,
  };

  isUpVoted() {
    tmp = !this.state.upVoted
    tmp2 = this.state.ups
    tmp3 = this.state.downs

    this.setState({ upVoted: tmp })
    if (tmp) {
      upVoteImage(this.props.item.id).catch(err => err)
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
      downVoteImage(this.props.item.id).catch(err => err)
      this.setState({ downs: tmp2 + 1 })
      if (this.state.upVoted) {
        this.setState({ ups: tmp3 - 1, upVoted: false });
      }
    } else {
      this.setState({ downs: tmp2 - 1 })
    }
  }

  isFav() {
    favImage(this.props.item.id).then((data) => {
      if (data === "unfavorited")
        this.setState({ fav: false })
      else
        this.setState({ fav: true })
    }).catch(e => e)
  }

  deleteImage() {
    this.setState({ loading: true })
    deleteImage(this.props.item.id).then((response) => response.json())
    .then((responseJson) => {
      console.log('SUCCESS => ', responseJson)
      this.showOwnImages()
    })
    .catch((error) => {
      console.error(error);
      this.setState({ loading: false })
    })
  }

  showActionSheet = () => {
    ActionSheet.showActionSheetWithOptions({
      options: ['Delete post', 'Cancel'],
      cancelButtonIndex: 1,
      destructiveButtonIndex: 2,
    },
    (buttonIndex) => {
      if (buttonIndex === 0) {
        this.handletakePhoto()
      } else if (buttonIndex === 1) {
        this.handleChoosePhoto()
      }
    })
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
          <Right>
          <Button transparent onPress={() => this.showActionSheet()}>
              <MaterialIcons style={styles.share} name="more-vert" />
            </Button>
          </Right>
        </CardItem>
        <CardItem cardBody style={{ aspectRatio: this.props.image.width / this.props.image.height, flex: 1 }}>
          <View>
            <Image
              source={{ uri: `https://i.imgur.com/${this.props.image.id}.gif` }}
              style={{ aspectRatio: this.props.image.width / this.props.image.height, flex: 1 }}
            />
          </View>
        </CardItem>
        <CardItem style={styles.card}>
          <Left>
            <Button transparent>
              <Icon style={this.state.upVoted ? styles.active : styles.white} name="arrow-up" />
              <Text style={styles.white}>{this.state.ups}</Text>
            </Button>
            <Button transparent>
              <Icon style={this.state.downVoted ? styles.active : styles.white} name="arrow-down" />
              <Text style={styles.white}>{this.state.downs}</Text>
            </Button>
            <Button transparent onPress={() => this.isFav()}>
              <Icon style={this.state.fav ? styles.activeFav : styles.white} name="heart" />
              <Text style={styles.white}>{this.props.item.favorite_count}</Text>
            </Button>
          </Left>
          <Right>
            <Button transparent onPress={() => {}}>
              <Icon style={styles.share} name="share-social" />
            </Button>
          </Right>
        </CardItem>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#17202A',
  },
  white: {
    color: 'white',
  },
  share: {
    color: 'white',
    fontSize: 25,
  },
  active: {
    color: '#19B76F',
  },
  activeFav: {
    color: 'red',
  },
  title: {
    color: 'white',
    fontSize: 18
  },
  username: {
    color: 'white',
    fontSize: 14
  },
  playView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playIcon: {
    color: 'white',
    fontSize: 50
  },
});