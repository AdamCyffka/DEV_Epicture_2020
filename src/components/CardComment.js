import React from 'react'
import {Text, Button, Thumbnail, Card, CardItem, Left, Body, Icon } from 'native-base'
import { StyleSheet, View, Animated, TouchableOpacity } from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import AlertPro from 'react-native-alert-pro'
import { DeleteComment } from '../api/Imgur'

export default class CardComment extends React.Component {
  state = {
    upVoted: false,
    downVoted: false,
    fav: this.props.item.favorite ? true : false,
    ups: this.props.item.ups,
    downs: this.props.item.downs,
    comment_id: null,
    isReady: false
  }

  async removeComment() {
    await DeleteComment(this.props.item.id).then((data) => {
      this.items = data
      this.setState({ isReady: false })
      this.AlertPro.close()
    }).catch((err) => err)
    this.props.reload()
  }

  render() {
    const RightActions = (progress, dragX, onPress) => {
      scale = dragX.interpolate({
        inputRange: [-100, 0],
        outputRange: [1, 0],
        extrapolate: 'clamp'
      })
    
      return (
        <View style={styles.rightActions}>
          <TouchableOpacity onPress={() => this.AlertPro.open()}>
            <Animated.Text style={[styles.actionText, { transform: [{ scale }]}]}>Delete</Animated.Text>
          </TouchableOpacity>
          <AlertPro
          ref={ref => {
            this.AlertPro = ref
          }}
          onConfirm={() => this.removeComment()}
          onCancel={() => this.AlertPro.close()}
          title="Delete confirmation"
          message="Are you sure to delete this comment?"
          textCancel="Cancel"
          textConfirm="Delete"
          customStyles={{
            mask: {
              backgroundColor: "transparent"
            },
            container: {
              borderWidth: 1,
              borderColor: "#9900cc",
              shadowColor: "#000000",
              shadowOpacity: 0.1,
              shadowRadius: 10
            },
            buttonCancel: {
              backgroundColor: "#4da6ff"
            },
            buttonConfirm: {
              backgroundColor: "#dd2c00"
            }
          }}
        />
        </View>
      )
    }
  
    return (
      <Swipeable renderRightActions={RightActions}>
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
      </Swipeable>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#16202b'
  },
  rightActions: {
    backgroundColor: '#dd2c00',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginTop: 5,
    marginBottom: 5
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
  },
  actionText: {
    color: '#ffffff',
    fontWeight: '600',
    padding: 20
  }
})