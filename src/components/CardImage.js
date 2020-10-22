import React from 'react'
import { Text, Button, Thumbnail, Card, CardItem, Left, Body, Icon, Right } from 'native-base'
import { StyleSheet, Image, View } from 'react-native'
import Share from 'react-native-share'
import VideoPlayer from 'react-native-video-player'
import { favImage, cleanVoteImage, downVoteImage, upVoteImage, getImageInfo } from '../api/Imgur'

export default class CardImage extends React.Component {
  state = {
    upVoted: this.props.item.vote === 'up' ? true : false,
    downVoted: this.props.item.vote === 'down' ? true : false,
    fav: this.props.item.favorite,
    ups: this.props.item.ups ?this.props.item.ups : 0 ,
    downs: this.props.item.downs ?this.props.item.downs : 0,
    favs: this.props.item.favorite_count
  }

  componentDidMount() {
    this.updateItem()
  }

  isUpVoted() {
    actualDowns = this.state.downs
    actualUps = this.state.ups

    if (this.state.upVoted == true) {
      this.setState({ upVoted: false, ups: actualUps - 1 })
      cleanVoteImage(this.props.image.id).catch(err => err)
    } else {
      upVoteImage(this.props.image.id).catch(err => err)
      this.setState({ upVoted: true, ups: actualUps + 1 })
      if (this.state.downVoted) {
        this.setState({ downs: actualDowns - 1, downVoted: false })
      }
    }
  }

  isDownVoted() {
    actualDowns = this.state.downs
    actualUps = this.state.ups

    if (this.state.downVoted == true) {
      this.setState({ downVoted: false, downs: actualDowns - 1 })
      cleanVoteImage(this.props.image.id).catch(err => err)
    } else {
      downVoteImage(this.props.image.id).catch(err => err)
      this.setState({ downVoted: true, downs: actualDowns + 1 })
      if (this.state.upVoted) {
        this.setState({ ups: actualUps - 1, upVoted: false })
      }
    }
  }

  isFav() {
    favImage(this.props.image.id).then((data) => {
      actualFavs = this.state.favs
      if (data === 'unfavorited') {
        this.setState({ fav: false, favs: actualFavs - 1 })
      } else {
        this.setState({ fav: true, favs: actualFavs + 1 })
      }
    }).catch(e => e)
  }

  updateItem = () => {
    getImageInfo(this.props.image.id).then((data) => {
      this.setState({ fav: data.favorite })
      if (data.vote == 'up')
        this.setState({ upVoted: true })
      else if (data.vote == 'down')
        this.setState({ upVoted: false })
      else
        console.log(data.vote)
        // à l'attention d'Ismaïl : la data vote est null alors que je fais une
        // requête pour get les infos de l'image avec mon access token
        // (contrairement à la data favorite (boolean) qui est bien remplie) 
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
          <View style={{ height: '100%', width: '100%'}}>
            {this.props.image.type.includes('video/') === false ?
              <Image
                source={{ uri: `https://i.imgur.com/${this.props.image.id}.gif` }}
                style={{ aspectRatio: this.props.image.width / this.props.image.height, flex: 1 }}
              />
            :
              <VideoPlayer
                autoplay
                defaultMuted
                loop
                video={{ uri: `https://i.imgur.com/${this.props.image.id}.mp4` }}
                style={{height: '100%'}}
              />
            }
          </View>
        </CardItem>
        <CardItem style={styles.card}>
          <Left>
            <Button transparent onPress={() => this.isUpVoted()}>
              <Icon style={this.state.upVoted ? styles.active : styles.grey} name='arrow-up' />
              <Text style={styles.white}>{this.state.ups}</Text>
            </Button>
            <Button transparent onPress={() => this.isDownVoted()}>
              <Icon style={this.state.downVoted ? styles.active : styles.grey} name='arrow-down' />
              <Text style={styles.white}>{this.state.downs}</Text>
            </Button>
            <Button transparent onPress={() => this.isFav()}>
              <Icon style={this.state.fav ? styles.activeFav : styles.grey} name='heart' />
              <Text style={styles.white}>{this.state.favs}</Text>
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