import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, Touchable, View, Button, Image, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import ImagePicker from 'react-native-image-picker';
import LoadingView from 'react-native-loading-view';
import AwesomeButton from "react-native-really-awesome-button";

export default class Upload extends React.Component {

    constructor(props) {
      super()
      this.state = {
        photo: null,
        uploadButton: true,
        selectButton: false,
        isLoading: false,
        album: false,
        public: false,
      };
      this.title = ''
      this.description = ''
    }

    async uploadImage() {
      const token = AsyncStorage.getItem('accessToken')
      this.setState({ isLoading: true, uploadButton: true, selectButton: true })
      const json_data = {
        image: this.state.photo.data,
        type: 'base64',
        title: this.title,
        description: this.description,
      }
      const uri = 'https://api.imgur.com/3/upload/'
      const response = await fetch(uri, {
        method: 'post',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(json_data)
      })
      const data = await response.json()
      this.setState({ isLoading: false, photo: null, selectButton: false })
      if (data.success) {
        Alert.alert('Image successfuly uploaded')
      } else {
        Alert.alert('An error occured', data.data.error)
      }
    }

    handleChoosePhoto = () => {
      const options = {
        noData: false,
      };
      ImagePicker.showImagePicker(options, response => {
        if (response.uri) {
          this.setState({ photo: response, uploadButton: false });
        }
      });
    };

    render() {
      const { photo } = this.state;
      return (
        <SafeAreaView style={styles.container}>
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1, marginRight: 'auto', paddingTop: 10, paddingLeft: 10, alignItems: 'flex-start' }}>
                <AwesomeButton
                  disabled={this.state.selectButton}
                  backgroundColor={ '#33AFFF' }
                  backgroundDarker={ 'white' }
                  onPress={this.handleChoosePhoto}
                >
                  Select Photo
                </AwesomeButton>
 		  				</View>
              <View style={{ flex: 1, marginLeft: 'auto', paddingTop: 10, paddingRight: 10, alignItems: 'flex-end' }}>
                <AwesomeButton
                  disabled={this.state.uploadButton}
                  backgroundColor={ '#016FB6' }
                  backgroundDarker={ 'white' }
                  onPress={() => this.uploadImage()}
                >
                  Upload Photo
                </AwesomeButton>
   						</View>
            </View>
          </View>
          <View style={{ flex: 1 }}></View>
          <View style={{ flex: 10, alignItems: 'center', justifyContent: 'center', paddingBottom: 10 }}>
            <LoadingView loading={this.state.isLoading}>
              {photo ? (
                <Image
                  source={{ uri: photo.uri }}
                  style={{ flex: 1, aspectRatio: 1, resizeMode: 'contain', borderRadius: 10 }}
                />
              ) : (
                <Image
                  source={require('../assets/noImage.png')}
                  style={{ flex: 1, aspectRatio: 0.8, resizeMode: 'contain', borderRadius: 10 }}
                />
              )}
            </LoadingView>
 				  </View>
 				  <View style={{ flex: 1 }}></View>
          <Text style={[styles.textTitle]}>Title</Text>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1 }}></View>
            <TextInput
              placeholder={'Title'}
              placeholderTextColor={'grey'}
              style={[styles.textInput]}
              onChangeText={text => this.title = text}
            >
            </TextInput>
            <View style={{ flex: 1 }}></View>
          </View>
          <Text style={[styles.textTitle]}>Description</Text>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1 }}></View>
            <TextInput
              placeholder={'Description'}
              placeholderTextColor={'grey'}
              style={[styles.textInput]}
              onChangeText={text => this.description = text}
            >
            </TextInput>
            <View style={{ flex: 1 }}></View>
          </View>
          <View style={{ flex: 1 }}></View>
        </SafeAreaView>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191970',
  },
  textTitle: {
    color: 'grey',
    fontSize: 10,
    paddingLeft: 20,
    paddingTop: 10,
  },
  textInput: {
    flex: 10,
    color: 'white',
    paddingLeft: 30,
    borderBottomColor: 'grey',
    borderBottomWidth: 0.5,
    paddingTop: 5,
    textAlign: 'left',
  },
});