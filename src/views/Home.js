import React from 'react';
import { StatusBar, View, FlatList, ActivityIndicator, StyleSheet, SafeAreaView } from 'react-native';
import { SearchBar } from 'react-native-elements';
import CardImage from '../components/Card';

async function getGalleryTop(page) {
  return fetch(`https://api.imgur.com/3/gallery/top/${page}`, {
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

  componentDidMount() {
    this.loadPost()
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
            round={true}
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
          <ActivityIndicator style={styles.appLoading} size="small" color="#FFF" />
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
  inputContainer: {
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingTop: 10,
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