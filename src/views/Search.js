import React from 'react'
import { View, StyleSheet, SafeAreaView, FlatList, StatusBar, TouchableOpacity } from 'react-native'
import LottieView from 'lottie-react-native'
import { SearchBar } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons'
import ActionSheet from 'react-native-action-sheet'

import CardImage from '../components/CardImage'
import I18n from '../i18n/locales'

async function searchPost(query) {
  return fetch('https://api.imgur.com/3/gallery/search?q=' + query, {
    headers: {
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

export default class Search extends React.Component {
  constructor() {
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

  updateSearch = (input) => {
    this.setState({ input })
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

  componentDidMount() {
    this.handleSearch(this.props.route.params.search)
  }

  handleSearch = () => {
    this.setState({ isFetching: true })
    searchPost(this.props.route.params.search).then((data) => {
      this.setState({ items: data })
      this.setState({ isFetching: false })
    }).catch((err) => err)
  }

  handleRefresh = () => {
    this.setState({
      isRefreshing: true,
      items: null
    }, () => {
      this.handleSearch(this.props.route.params.search)
    })
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle='light-content'
          backgroundColor='#16202b'
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
          <FlatList
            data={this.state.items}
            initialNumToRender={5}
            maxToRenderPerBatch={5}
            windowSize={15}
            refreshing={this.state.isFetching}
            onRefresh={this.handleRefresh}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => {
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
    backgroundColor: '#17202A',
  },
  lottieView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 10
  },
  searchBarContainer: {
    backgroundColor: 'transparent',
    width: '85%'
  },
  searchBarInputContainerStyle: {
    backgroundColor: 'white'
  },
})