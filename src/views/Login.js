import React from 'react';
import Api from '../config/Api';
import WebView from 'react-native-webview';
import AsyncStorage from '@react-native-community/async-storage';

export default class Login extends React.Component {
  _onNavigationStateChange = async ( webViewState ) => {
    if ( webViewState.url.startsWith( 'https://www.getpostman.com/oauth2/callback' ) ) {
      const regex = 'access_token=([^&]+)(?:&expires=(.*))?';
      let accessToken = webViewState.url.match( regex )[ 1 ];
      const regexName = 'account_username=([^&]+)(?:&account_id=(.*))?';
      let userName = webViewState.url.match( regexName )[ 1 ];
      await AsyncStorage.setItem( 'accessToken', accessToken );
      await AsyncStorage.setItem( 'userName', userName );
      this.props.navigation.navigate( 'Home' );
    }
  }

  render() {
    return (
      <WebView
        startInLoadingState={ true }
        javaScriptEnabled={ true }
        domStorageEnabled={ true }
        automaticallyAdjustContentInsets={ false }
        onNavigationStateChange={ this._onNavigationStateChange.bind( this ) }
        source={{
          uri: 'https://api.imgur.com/oauth2/authorize?client_id=' + Api.clientID + '&response_type=token',
        }}
      />
    );
  }
}