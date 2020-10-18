import React from 'react'
import { View, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { Header } from 'react-native-elements'
import I18n from '../i18n/locales'
import TopTabs from '../navigation/TopTabs'

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

export default class Profile extends React.Component {
  constructor() {
    super()
    this.state = {
      date: new Date()
    }
  }

  componentDidMount() {
    getAccountInfo()
      .then((response) => {
        const data = response.data
        this.setState({
          date: new Date(data.created * 1000)
        })
      }).catch(err => err)
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          leftComponent={{ icon: 'menu', color: '#fff', onPress: () => this.props.navigation.openDrawer() }}
          centerComponent={{ text: I18n.t('profile.profile'), style: { color: '#fff' } }}
          statusBarProps={{ barStyle: 'light-content', backgroundColor: '#16202b' }}
          containerStyle={{
            backgroundColor: '#16202b',
            justifyContent: 'space-around'
          }}
        />
        <TopTabs />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#16202b'
  }
})