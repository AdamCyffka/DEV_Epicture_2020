import React from 'react';
import { StatusBar, View, FlatList, ActivityIndicator, StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native';
import { SearchBar } from 'react-native-elements';
import ActionSheet from 'react-native-actionsheet';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CardImage from '../components/Card';
import LottieView from 'lottie-react-native';

async function getGalleryTop(page) {
  return fetch(`https://api.imgur.com/3/gallery/hot/time/day/${page}?showViral=true&mature=true&album_previews=false`, {
    "method": "GET",
    "headers": {
      "Authorization": "Client-ID 7282df4b8e311c8"
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      if (result.success)
        return Promise.resolve(result.data);
      else
        return Promise.reject(result.data);
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
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.loadPost()
  }

  _updateInput (input) {
    this.setState({ input });
  }

  handleSubmit() {
    this.props.navigation.push('Result', {search: this.state.input})
  }

  loadPost = () => {
    getGalleryTop(this.state.page).then((data) => {
      this.setState(prevState => ({
        items: this.state.page === 0 ? data : [...prevState.items, ...data],
        isRefreshing: false,
      }));
      this.setState({ isReady: true });
    }).catch(err => err);
  }

  handleRefresh = () => {
    this.setState({
      isRefreshing: true,
      page: 0,
      items: null
    }, () => {
      this.loadPost();
    });
  };

  handleLoadMore = () => {
    this.setState({
      page: this.state.page + 1
    }, () => {
      this.loadPost();
    });
  };

  showChoiceActionSheet = () => {
    
    this.ChoiceAS.show()
  }

  showCategoryActionSheet = () => {
    this.CategoryAS.show()
    console.log("bb jtm")
  }

  showSortActionSheet = () => {
    this.SortAS.show()
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#000000"
        />
        <View style={styles.inputContainer}>
          <SearchBar
            placeholder="Type here..."
            value={this.state.input}
            onChangeText={(text) => this._updateInput(text)}
            onSubmitEditing={() => this.handleSubmit()}
            containerStyle={styles.searchBarContainer}
            inputContainerStyle={styles.searchBarInputContainerStyle}
            round={true}
          />
          <TouchableOpacity onPress={this.showChoiceActionSheet}>
            <MaterialCommunityIcons name="filter-plus-outline" size={38} style={{ color: "white"}} />
          </TouchableOpacity>
          <ActionSheet
            ref={o => this.ChoiceAS = o}
            title={'Add a filter'}
            options={['Category', 'Sort', 'Cancel']}
            cancelButtonIndex={2}
            destructiveButtonIndex={2}
            onPress={(index) => {
              if (index === 0) {
                this.showCategoryActionSheet()
              } else if (index === 1) {
                this.showSortActionSheet()
              }
            }}
          />
          <ActionSheet
            ref={o => this.CategoryAS = o}
            title={'Choose a category'}
            options={['Hot',
                      'Top',
                      <MaterialIcons name="arrow-back-ios" size={24} style={{ color: "blue"}} />,
                      'Cancel']
                    }
            cancelButtonIndex={3}
            destructiveButtonIndex={3}
            onPress={(index) => {
              if (index === 0) {

              } else if (index === 1) {

              } else {
                this.showChoiceActionSheet()
              }
            }}
          />
          <ActionSheet
            ref={o => this.SortAS = o}
            title={'Sort by'}
            options={['Viral',
                      'Top',
                      'Time',
                      <MaterialIcons name="arrow-back-ios" size={24} style={{ color: "blue"}} />,
                      'Cancel']}
            cancelButtonIndex={4}
            destructiveButtonIndex={4}
            onPress={(index) => {
              if (index === 0) {
                console.log("oui")
              } else if (index === 1) {

              } else if (index === 2) {

              } else {
                this.showChoiceActionSheet()
              }
            }}
          />
        </View>
        {this.state.items !== null ?
          <FlatList style={styles.cardContent}
            data={this.state.items}
            initialNumToRender={5}
            maxToRenderPerBatch={5}
            windowSize={15}
            refreshing={this.state.isRefreshing}
            onRefresh={this.handleRefresh}
            onEndReached={this.handleLoadMore}
            onEndThreshold={0}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => {
              if (!item.images)
                return;
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
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191970',
  },
  lottieView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  searchBarContainer: {
    backgroundColor: "transparent",
    width: '90%',
  },
  searchBarInputContainerStyle: {
    backgroundColor: "white",
  },
  background: {
      flex: 1,
      backgroundColor: '#11181F',
  },
  cardContent: {
      marginTop: 10,
  },
  appLoading: {
      flex: 1,
      justifyContent: 'center'
  }
});