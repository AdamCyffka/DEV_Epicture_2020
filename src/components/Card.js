import React from 'react';
import { Text, Button, Thumbnail, Card, CardItem, Left, Body, Icon } from 'native-base';
import { StyleSheet, Image, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

async function favImage(imageHash) {
  const token = AsyncStorage.getItem('accessToken');
  return fetch(`https://api.imgur.com/3/image/${imageHash}/favorite`, {
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

export default class CardImage extends React.PureComponent {

  state = {
    result: null,
    upVoted: this.props.item.vote === "up" ? true : false,
    downVoted: this.props.item.vote === "down" ? true : false,
    fav: this.props.item.favorite,
    ups: this.props.item.ups ?this.props.item.ups : 0 ,
    downs: this.props.item.downs ?this.props.item.downs : 0,
    shouldPlay: false,
    isLooping: false,
    showIcon: true,
  };

  isFav() {
    favImage(this.props.item.id).then((data) => {
      if (data === "unfavorited")
        this.setState({ fav: false });
      else
        this.setState({ fav: true });
    }).catch(e => e);
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
            {this.props.image.type.includes('video') && <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
              <Icon style={{ fontSize: 50, color: 'white' }} name='play' />
            </View>}
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