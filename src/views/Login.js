import React from 'react'
import WebView from 'react-native-webview'
import { View, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { Header } from 'react-native-elements'
import Api from '../config/Api'
import I18n from '../i18n/locales'

export default class Login extends React.Component {
  _onNavigationStateChange = async (webViewState) => {
    if (webViewState.url.startsWith('https://www.getpostman.com/oauth2/callback')) {
      const regex = 'access_token=([^&]+)(?:&expires=(.*))?'
      let accessToken = webViewState.url.match(regex)[1]
      const regexName = 'account_username=([^&]+)(?:&account_id=(.*))?'
      let userName = webViewState.url.match(regexName)[1]
      await AsyncStorage.setItem('accessToken', accessToken)
      await AsyncStorage.setItem('userName', userName)
      this.props.navigation.navigate('Home')
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          leftComponent={{ icon: 'arrow-left', color: '#fff', onPress: () => this.props.navigation.goBack() }}
          centerComponent={{ text: I18n.t('welcome.loginn'), style: { color: '#fff' } }}
          statusBarProps={{ barStyle: 'light-content', backgroundColor: '#16202b' }}
          containerStyle={{
            backgroundColor: '#16202b',
            justifyContent: 'space-around'
          }}
        />
        <WebView
          incognito={true}
          startInLoadingState={true}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          automaticallyAdjustContentInsets={false}
          onNavigationStateChange={this._onNavigationStateChange.bind(this)}
          source={{
            uri: `https://api.imgur.com/oauth2/authorize?client_id=${Api.clientID}&response_type=token`,
          }}
        />
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