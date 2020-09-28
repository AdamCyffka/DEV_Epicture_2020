import React from 'react';
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { Card } from "react-native-elements";
import AsyncStorage from '@react-native-community/async-storage';

export default class Favorites extends React.Component {

  extentions = [
    'png',
    'jpg',
    'jpeg',
    'bmp',
    'gif',
    'webp'
  ];

  constructor(props) {
    super(props);
    this.state = {
      user: null,
      data: null,
    };
    this._bootstrapAsync();
  }

  // info user
  _bootstrapAsync = async () => {
    const user = await AsyncStorage.getItem('userName');

    await this.setState(prevState => {
      this._getPhotosFormImgur(user);
      return prevState;
    });
  };

  _getPhotosFormImgur = async (user) => {
    const token = await AsyncStorage.getItem('accessToken');
    const name = await AsyncStorage.getItem('userName');
    return fetch('https://api.imgur.com/3/account/' + name + '/favorites/', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then(res => res.json())
      .then(resJson => {
        this.setState(prevState => {
          prevState.data = resJson.data;
          return prevState;
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  _getPhotoFromData(row) {
    let extention = row.link.split('.')[row.link.split('.').length - 1];
    let res = this.extentions.find(elem => elem === extention);

    if (res == null) {
      return 'https://banner2.kisspng.com/20180530/rsz/kisspng-istock-royalty-free-fail-stamp-5b0e3cc6d5b971.1366345315276597188754.jpg'
    } else {
      return row.link
    }
  }

  render() {
    return (
        <View style={{ flex: 1, backgroundColor: 'grey' }}>
            <ScrollView >
                {this.state.data !== null ? this.state.data.map((row, i) => {
                    return (
                        // <Text key={i} >hello {row.id}</Text>
                        <Card
                            title={`${row.title != null ? row.title : 'No title'}`}
                            image={{ uri: this._getPhotoFromData(row) }}
                            imageStyle={{ width: 370, height: 410, marginLeft: 'auto', marginRight: 'auto' }}
                            imageProps={{ resizeMode: 'contain' }}
                            key={i}
                        >
                            <Text style={{ marginBottom: 10 }}>
                                {row.description ? row.description : 'No desc'}
                            </Text>
                        </Card>
                    );
                }) : null}
            </ScrollView>
        </View>
    );
}

}