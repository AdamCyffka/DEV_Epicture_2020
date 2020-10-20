import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Header } from 'react-native-elements'
import I18n from '../i18n/locales'
import TopTabs from '../navigation/TopTabs'

export default class Profile extends React.Component {
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