import React from 'react'
import { StatusBar, View, FlatList, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native'
import { SearchBar } from 'react-native-elements'
import ActionSheet from 'react-native-action-sheet'
import Icon from 'react-native-vector-icons/Ionicons'
import LottieView from 'lottie-react-native'

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

  showCategoryActionSheet = () => {
    ActionSheet.showActionSheetWithOptions({
      options: [I18n.t('home.hot'), I18n.t('home.top'), I18n.t('home.user'), I18n.t('home.return'), I18n.t('home.cancel')],
      cancelButtonIndex: 4,
      destructiveButtonIndex: 5,
    },
    (buttonIndex) => {
      if (buttonIndex === 0) {
        this.setState({ category: 'hot' })
        this.handleRefresh()
      } else if (buttonIndex === 1) {
        this.setState({ category: 'top' })
        this.handleRefresh()
      } else if (buttonIndex === 2) {
        this.setState({ category: 'user' })
        this.handleRefresh()
      } else if (buttonIndex === 3) {
        this.showFilterActionSheet()
      }
    })
  }

  showSortActionSheet = () => {
    ActionSheet.showActionSheetWithOptions({
      options: [I18n.t('home.viral'), I18n.t('home.top'), I18n.t('home.time'), I18n.t('home.rising'), I18n.t('home.return'), I18n.t('home.cancel')],
      cancelButtonIndex: 5,
      destructiveButtonIndex: 6
    },
    (buttonIndex) => {
      if (buttonIndex === 0) {
        this.setState({ category: 'user' })
        this.setState({ sort: 'viral' })
        this.handleRefresh()
      } else if (buttonIndex === 1) {
        this.setState({ category: 'user' })
        this.setState({ sort: 'top' })
        this.handleRefresh()
      } else if (buttonIndex === 2) {
        this.setState({ category: 'user' })
        this.setState({ sort: 'time' })
        this.handleRefresh()
      } else if (buttonIndex === 3) {
        this.setState({ category: 'user' })
        this.setState({ sort: 'rising' })
        this.handleRefresh()
      } else if (buttonIndex === 4) {
        this.showFilterActionSheet()
      }
    })
  }

  showFilterActionSheet = () => {
    ActionSheet.showActionSheetWithOptions({
      options: [I18n.t('home.category'), I18n.t('home.sort'), I18n.t('home.cancel')],
      cancelButtonIndex: 2,
      destructiveButtonIndex: 3,
    },
    (buttonIndex) => {
      if (buttonIndex === 0) {
        this.showCategoryActionSheet()
      } else if (buttonIndex === 1) {
        this.showSortActionSheet()
      }
    })
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle='light-content'
          backgroundColor='#000000'
        />
        <View style={styles.inputContainer}>
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
        </View>
        {this.state.items !== null ?
          <FlatList style={styles.cardContent}
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
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#16202b'
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
  cardContent: {
    marginTop: 10
  }
})