import React from 'react'
import { Text, View, StyleSheet, ScrollView, RefreshControl } from 'react-native'
import I18n from '../i18n/locales'
import { getAccountInfo, getNbComment, getNbPic, getNbAlbums } from '../api/Imgur'

export default class informations extends React.Component {
  constructor() {
    super()
    this.state = {
      isReady: false,
      bio: null,
      reputation: null,
      reputationName: null,
      username: null,
      date: new Date(),
      nb_comment: 0,
      nb_pic: 0,
      nb_album: 0,
      loading: false
    }
  }

  componentDidMount() {
    this.loadNbComment()
    this.loadNbPic()
    this.loadNbAlbums()
    this.loadInfo()
  }

  loadInfo = () => {
    getAccountInfo()
      .then((response) => {
        const data = response.data
        this.setState({
          bio: data.bio,
          reputation: data.reputation,
          reputationName: data.reputation_name,
          username: data.url,
          date: new Date(data.created * 1000),
          isReady: false
        })
      }).catch(err => err)
  }

  loadNbComment = () => {
    getNbComment()
    .then(response => {
      this.setState({
        nb_comment: response.data,
        isReady: false
      });
    }).catch(err => err)
  }

  loadNbAlbums = () => {
    getNbAlbums()
    .then(response => {
      this.setState({
        nb_album: response.data,
        isReady: false
      });
    }).catch(err => err)
  }

  loadNbPic = () => {
    getNbPic()
    .then(response => {
      this.setState({
        nb_pic: response.data,
        isReady: false
      });
    }).catch(err => err)
  }

  handleRefresh = () => {
    this.setState({
      isReady: true
    }, () => {
      this.loadInfo()
      this.loadNbComment()
      this.loadNbPic()
      this.loadNbAlbums()
    })
  }

  render () {
    return (
      <View style={styles.container}>
        <ScrollView
          refreshControl={
            <RefreshControl
              tintColor='red'
              titleColor="red"
              title="Pull to refresh"
              refreshing={this.state.isReady}
              onRefresh={this.handleRefresh}
            />
          }
        >
          <Text style={styles.profileDescheaderData}>{I18n.t('informations.username')}</Text>
          <Text style={styles.profileData}>{this.state.username}</Text>
          <View style={styles.profileDescSeparator}>
          </View>
          <Text style={styles.profileDescheaderData}>{I18n.t('informations.images')}</Text>
          <Text style={styles.profileData}>{this.state.nb_pic}</Text>
          <View style={styles.profileDescSeparator}>
          </View>
          <Text style={styles.profileDescheaderData}>{I18n.t('informations.albums')}</Text>
          <Text style={styles.profileData}>{this.state.nb_album}</Text>
          <View style={styles.profileDescSeparator}>
          </View>
          <Text style={styles.profileDescheaderData}>{I18n.t('informations.comments')}</Text>
          <Text style={styles.profileData}>{this.state.nb_comment - 1}</Text>
          <View style={styles.profileDescSeparator}>
          </View>
          <Text style={styles.profileDescheaderData}>{I18n.t('informations.joined')}</Text>
          <Text style={styles.profileData}>{this.state.date.getMonth() + 1}/{this.state.date.getFullYear()}</Text>
          <View style={styles.profileDescSeparator}>
          </View>
          <Text style={styles.profileDescheaderData}>{I18n.t('informations.about')}</Text>
          <Text style={styles.profileData}>{this.state.bio}</Text>
          <View style={styles.profileDescSeparator}>
          </View>
          <Text style={styles.profileDescheaderData}>{I18n.t('informations.internet')}</Text>
          <Text style={styles.profileData}>{this.state.reputation}</Text>
          <View style={styles.profileDescSeparator}>
          </View>
          <Text style={styles.profileDescheaderData}>{I18n.t('informations.notoriety')}</Text>
          <Text style={styles.profileData}>{this.state.reputationName}</Text>
          <View style={styles.profileDescSeparator}>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#16202b'
  },
  profileDescheaderData: {
    color: '#336B87',
    fontSize: 18,
    marginTop: 15,
    marginLeft: 20,
  },
  profileData: {
    color: '#ffffff',
    fontSize: 19,
    marginLeft: 20
  },
  profileDescSeparator: {
    flex: 1,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    marginTop: 6,
    marginLeft: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '85%'
  }
})