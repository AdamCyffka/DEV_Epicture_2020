import React from 'react'
import { StyleSheet, View, ActivityIndicator, FlatList, TextInput } from 'react-native'
import LottieView from 'lottie-react-native'
import { Header } from 'react-native-elements'
import CardImage from '../components/CardImage'
import I18n from '../i18n/locales'
import Api from '../config/Api'

export async function searchImg(query, sort, window) {
	var rplc = query.replace(' ', '+')
	var url = "https://api.imgur.com/3/gallery/search/" + sort + "/" + window + "/1?q=" + rplc
	return fetch(url, {
		headers: {
			'Authorization': `Client-ID ${Api.clientID}`
		}
	})
	.then((response) => response.json())
	.catch((err) => console.error(err))
}

export default class Search extends React.Component {
  constructor() {
    super()
    this.state = {
      data: null,
      query: ''
    }
  }

  searchImg() {
    searchImg(this.state.query)
      .then(response => {
        this.setState({
          data: response.data
        })
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