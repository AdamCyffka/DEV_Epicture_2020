import React from 'react'
import {Text, Button, Thumbnail, Card, CardItem, Left, Body, Icon } from 'native-base'
import { StyleSheet, View } from 'react-native'

export default class CardComment extends React.Component {
  state = {
    upVoted: false,
    downVoted: false,
    fav: this.props.item.favorite ? true : false,
    ups: this.props.item.ups,
    downs: this.props.item.downs
  }

  render() {
    return (
      <Card transparent>
        <CardItem style={styles.card}>
          <Left>
            <Thumbnail style={styles.usernameAvatar} source={{ uri: `https://imgur.com/user/${this.props.item.author}/avatar?maxwidth=290` }} />
            <Body>
              <Text style={styles.username}>{this.props.item.author}</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem style={styles.cardItem}>
        <Text style={styles.title}>{this.props.item.comment}</Text>
        </CardItem>
        <CardItem style={styles.cardItem}>
          <Left>
            <Button transparent>
              <Icon style={this.state.upVoted ? styles.active : styles.white} name='arrow-up' />
              <Text style={styles.white}>{this.state.ups}</Text>
            </Button>
            <Button transparent>
              <Icon style={this.state.downVoted ? styles.active : styles.white} name='arrow-down' />
              <Text style={styles.white}>{this.state.downs}</Text>
            </Button>
          </Left>
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
    backgroundColor: '#16202b'
  },
  cardItem: {
    backgroundColor: '#16202b',
    paddingTop: 0,
    paddingBottom: 0
  },
  white: {
    color: '#ffffff'
  },
  title: {
    color: '#ffffff',
    fontSize: 14
  },
  username: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold'
  },
  usernameAvatar: {
    height: 25,
    width: 25
  }
})