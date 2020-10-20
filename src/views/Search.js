import React from 'react'
import { StyleSheet, View, FlatList, TextInput, RefreshControl } from 'react-native'
import LottieView from 'lottie-react-native'
import { Header } from 'react-native-elements'
import CardImage from '../components/CardImage'
import I18n from '../i18n/locales'
import { searchImg } from '../api/Imgur'

export default class Search extends React.Component {
  constructor() {
    super()
    this.state = {
      data: null,
      query: '',
      isReady: false
    }
  }

  searchImg = () => {
    searchImg(this.state.query)
      .then(response => {
        this.setState({
          data: response.data,
          isReady: false
        })
      })
  }

  handleRefresh = () => {
    this.setState({
      isReady: true
    }, () => {
      this.searchImg()
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          leftComponent={{ icon: 'menu', color: '#fff', onPress: () => this.props.navigation.openDrawer() }}
          centerComponent={
            <View>
              <TextInput
                clearButtonMode='while-editing'
                onChangeText={(query) => this.setState({ query })}
                placeholder={I18n.t('welcome.search')}
                returnKeyType="search"
                onSubmitEditing={() => this.searchImg()}
                style={styles.textInputStyleClass}
              />
            </View>
          }
          statusBarProps={{ barStyle: 'light-content', backgroundColor: '#16202b' }}
          containerStyle={{
            backgroundColor: '#16202b',
            justifyContent: 'space-around',
          }}
        />
        {this.state.data !== null ?
          <FlatList
              data={this.state.data}
              initialNumToRender={5}
              maxToRenderPerBatch={5}
              windowSize={15}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => {
                if (!item.images)
                  return
                return <CardImage
                  image={item.images[0]}
                  item={item}
                />
              }}
              refreshControl={
                <RefreshControl
                  tintColor='red'
                  titleColor="red"
                  title="Pull to refresh"
                  refreshing={this.state.isReady}
                  onRefresh={this.handleRefresh}
                />
              }
          />
        :
          <View style={styles.lottieView}>
            <LottieView
              source={require('../assets/search.json')}
              autoPlay
              loop
              style={{
                height: 350,
              }}
            />
          </View>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#17202A'
  },
  textInputStyleClass:{
    textAlign: 'center',
    borderColor: 'transparent',
    borderRadius: 20 ,
    backgroundColor : "#FFFFFF",
    width: 250,
    paddingHorizontal: 20,
    paddingVertical: 5
  },
  lottieView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})