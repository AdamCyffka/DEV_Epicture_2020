import React from 'react'
import { View, FlatList, StyleSheet, RefreshControl, Text } from 'react-native'
import LottieView from 'lottie-react-native'
import UploadButton from '../components/UploadButton'
import { Header } from 'react-native-elements'
import ActionSheet from 'react-native-action-sheet'
import CardImage from '../components/CardImage'
import I18n from '../i18n/locales'
import { getGalleryTop } from '../api/Imgur'

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
      destructiveButtonIndex: 5
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
      <View style={styles.container}>
        <Header
          leftComponent={{ icon: 'menu', color: '#fff', onPress: () => this.props.navigation.openDrawer() }}
          centerComponent={{ text: I18n.t('home.home'), style: { color: '#fff' } }}
          rightComponent={{ icon: 'filter', color: '#fff', onPress: () => this.showFilterActionSheet() }}
          statusBarProps={{ barStyle: 'light-content', backgroundColor: '#16202b' }}
          containerStyle={{
            backgroundColor: '#16202b',
            justifyContent: 'space-around'
          }}
        />
        <View style={styles.activeFilter}>
          <Text style={styles.filter}>{this.state.category}</Text>
          <Text style={styles.filter}>{this.state.sort}</Text>
        </View>
        {this.state.items !== null ?
          <FlatList
            data={this.state.items}
            initialNumToRender={1}
            maxToRenderPerBatch={1}
            windowSize={15}
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
            refreshControl={
              <RefreshControl
                tintColor='red'
                titleColor="red"
                title="Pull to refresh"
                refreshing={this.state.isRefreshing}
                onRefresh={this.handleRefresh}
              />
            }
          />
        :
          <View style={styles.lottieView}>
            <LottieView
              source={require('../assets/loading.json')}
              autoPlay
              loop
              style={{
                height: 350
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
  activeFilter: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: '2%',
    paddingBottom: '2%'
  },
  filter: {
    color: '#fff',
    borderWidth: 2,
    borderRadius: 20,
    borderColor: '#1ea1f1',
    width: '20%',
    paddingTop: '2%',
    paddingBottom: '2%',
    justifyContent: 'center',
    textAlign: 'center'
  },
  lottieView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})