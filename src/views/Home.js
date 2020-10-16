import React from 'react'
import { StatusBar, View, FlatList, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native'
import LottieView from 'lottie-react-native'
import UploadButton from '../components/UploadButton'
import { Header } from 'react-native-elements'

import CardImage from '../components/CardImage'
import I18n from '../i18n/locales'

async function getGalleryTop(category, sort, page) {
  return fetch(`https://api.imgur.com/3/gallery/${category}/${(category === 'user') ? sort : 'time/day'}/${page}?showViral=true&mature=true&album_previews=false`, {
    'method': 'GET',
    'headers': {
      'Authorization': 'Client-ID 7282df4b8e311c8'
    }
  })
  .then((response) => {
    return response.json()
  })
  .then((result) => {
    if (result.success)
      return Promise.resolve(result.data)
    return Promise.reject(result.data)
  })
}

export default class Home extends React.Component {
  constructor () {
    super()
    this.state = {
      input: '',
      isReady: false,
      isRefreshing: false,
      items: null,
      page: 0,
      category: 'hot',
      sort: 'time/day'
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.loadPost()
  }

  updateSearch = (input) => {
    this.setState({ input })
  }

  handleSubmit() {
    this.props.navigation.push('Result', {search: this.state.input})
  }

  loadPost = () => {
    getGalleryTop(this.state.category, this.state.sort, this.state.page).then((data) => {
      this.setState(prevState => ({
        items: this.state.page === 0 ? data : [...prevState.items, ...data],
        isRefreshing: false
      }))
      this.setState({ isReady: true })
    }).catch(err => err)
  }

  handleRefresh = () => {
    this.setState({
      isRefreshing: true,
      page: 0,
      items: null
    }, () => {
      this.loadPost()
    })
  }

  handleLoadMore = () => {
    this.setState({
      page: this.state.page + 1
    }, () => {
      this.loadPost()
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          leftComponent={{ icon: 'menu', color: '#fff', onPress: () => this.props.navigation.openDrawer(), }}
          centerComponent={{ text: I18n.t('home.home'), style: { color: '#fff' } }}
          statusBarProps={{ barStyle: 'light-content', backgroundColor: '#16202b' }}
          containerStyle={{
            backgroundColor: '#16202b',
            justifyContent: 'space-around',
          }}
        />
        {/* <View style={styles.containerV}>
          <TouchableOpacity
            style={styles.touchableMask}
            onPress={() => this.props.navigation.openDrawer()}
            activeOpacity={1.5}
          />
            <Icon name='menu-outline' size={35} style={{ color: 'white' }} />
        </View> */}
        {/* <View style={styles.inputContainer}>
          <SearchBar
            placeholder={I18n.t('home.search')}
            value={this.state.input}
            searchIcon={{ size: 24 }}
            onChangeText={this.updateSearch}
            onSubmitEditing={() => this.handleSubmit()}
            containerStyle={styles.searchBarContainer}
            inputContainerStyle={styles.searchBarInputContainerStyle}
            round={true}
          />
          <TouchableOpacity onPress={this.showFilterActionSheet}>
            <Icon name='filter' size={38} style={{ color: 'white' }} />
          </TouchableOpacity>
        </View> */}
        {this.state.items !== null ?
          <FlatList
            data={this.state.items}
            initialNumToRender={1}
            maxToRenderPerBatch={1}
            windowSize={15}
            refreshing={this.state.isRefreshing}
            onRefresh={this.handleRefresh}
            onEndReached={this.handleLoadMore}
            onEndThreshold={0}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => {
              if (!item.images)
              return
              return <CardImage
                image={item.images[0]}
                item={item}
              />
            }}
          />
        :
          <View style={styles.lottieView}>
            <LottieView
              source={require('../assets/loading.json')}
              autoPlay
              loop
              style={{
                height: 350,
              }}
            />
          </View>
        }
        <UploadButton />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#16202b'
  },
  containerV: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    height: 40,
    borderBottomColor: "#ccc",
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  touchableMask: {
    position: "absolute",
    top: 5,
    left: 10,
    width: 30,
    height: 30,
    zIndex: 9,
    padding: 5
  },
  lottieView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 10
  },
  searchBarContainer: {
    backgroundColor: 'white',
    width: '85%'
  },
  searchBarInputContainerStyle: {
    backgroundColor: 'white'
  },
})