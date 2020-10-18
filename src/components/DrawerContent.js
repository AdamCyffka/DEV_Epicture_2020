import React from 'react'
import { View, StyleSheet, ScrollView, ImageBackground, Image, Alert, RefreshControl } from 'react-native'
import { Drawer, Text } from 'react-native-paper'
import { DrawerItem } from '@react-navigation/drawer'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AsyncStorage from '@react-native-community/async-storage'
import I18n from '../i18n/locales'

async function getAccountInfo() {
  const token = await AsyncStorage.getItem('accessToken')
  const username = await AsyncStorage.getItem('userName')
  return fetch('https://api.imgur.com/3/account/' + username, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  })
  .then((response) => {
    return response.json()
  })
}

export class DrawerContent extends React.Component {
  constructor() {
    super()
    this.state = {
      avatar: null,
      background: null,
      reputation: null,
      reputationName: null,
      username: null,
      isReady: false
    }
  }

  componentDidMount() {
    this.loadInfo()
  }

  loadInfo = () => {
    getAccountInfo()
      .then((response) => {
        const data = response.data
        this.setState({
          avatar: data.avatar,
          background: data.cover,
          reputation: data.reputation,
          reputationName: data.reputation_name,
          username: data.url,
          isReady: false
        })
      }).catch(err => err)
  }

  handleRefresh = () => {
    this.setState({
      isReady: true
    }, () => {
      this.loadInfo()
    })
  }

  logOut = async () => {
    await AsyncStorage.removeItem('accessToken')
    await AsyncStorage.removeItem('userName')
    Alert.alert(I18n.t('drawer.disconnect'))
    this.props.navigation.navigate('Welcome')
  }

  render() {
    return(
      <View style={styles.container}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.isReady}
              onRefresh={this.handleRefresh}
            />
          }
        >
          <ImageBackground
            source={{ uri: this.state.background }}
            style={{ width: undefined, padding: 16, paddingTop: 48 }}
            imageStyle={{ opacity: 0.8 }}
          >
            <Image source={{ uri: this.state.avatar }} style={styles.profile}/>
            <Text style={styles.name}>{this.state.username}</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.followers}>
                {this.state.reputation} PTS •{" "}
                {this.state.reputationName}
              </Text>
            </View>
          </ImageBackground>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <MaterialCommunityIcons
                  name="home"
                  color={'white'}
                  size={size}
                />
              )}
              label={I18n.t('drawer.home')}
              activeTintColor='#ffffff'
              inactiveTintColor='#ffffff'
              onPress={() => this.props.navigation.navigate('Home')}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <MaterialCommunityIcons
                  name="account"
                  color={'white'}
                  size={size}
                />
              )}
              label={I18n.t('drawer.profile')}
              activeTintColor='#ffffff'
              inactiveTintColor='#ffffff'
              onPress={() => this.props.navigation.navigate('Profile')}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <MaterialCommunityIcons
                  name="magnify"
                  color={'white'}
                  size={size} />
              )}
              label={I18n.t('drawer.search')}
              activeTintColor='#ffffff'
              inactiveTintColor='#ffffff'
              onPress={() => this.props.navigation.navigate('Search')}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <MaterialCommunityIcons
                  name="upload"
                  color={'white'}
                  size={size}
                />
              )}
              label={I18n.t('drawer.upload')}
              activeTintColor='#ffffff'
              inactiveTintColor='#ffffff'
              onPress={() => this.props.navigation.navigate('Upload')}
            />
          </Drawer.Section>
        </ScrollView>
        <Drawer.Section>
          <DrawerItem 
            icon={({color, size}) => (
              <MaterialCommunityIcons
              name="exit-to-app" 
              color={'white'}
              size={size}
              />
            )}
            label={I18n.t('drawer.signOut')}
            activeTintColor='#ffffff'
            inactiveTintColor='#ffffff'
            onPress={this.logOut}
          />
        </Drawer.Section>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#17202A',
    flex: 1
  },
  profile: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#ffffff'
  },
  name: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '800',
    marginVertical: 8
  },
  followers: {
    color: '#ffffff',
    fontSize: 13,
    marginRight: 4
  },
  drawerSection: {
    marginTop: 15,
  },
})