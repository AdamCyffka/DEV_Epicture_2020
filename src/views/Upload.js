import React from 'react';
import { SafeAreaView, Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View, Button, Image, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import LoadingView from 'react-native-loading-view';
import ActionSheet from "react-native-action-sheet";

export default class Upload extends React.Component {
    constructor() {
      super()
      this.state = {
        photo: null,
        uploadButton: true,
        selectButton: false,
        isLoading: false,
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
      const uri = 'https://api.imgur.com/3/upload'
      const response = await fetch(uri, {
        method: 'POST',
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
  
    // handleChoosePhoto = () => {
    //   const options = {
    //   };
    //   ImagePicker.showImagePicker(options, response => {
    //     if (response.uri) {
    //       this.setState({ photo: response, uploadButton: false });
    //     }
    //   });
    // };

    handleChoosePhoto = () => { 
      ImagePicker.openPicker({
        width: 960,
        height: 796,
        cropping: true
      }).then(image => {
        console.log(image);
        this.setState({ photo: image, uploadButton: false })
      });
    }

    handletakePhoto = () => {
      ImagePicker.openCamera({
        width: 960,
        height: 796,
        cropping: true,
      }).then(image => {
        console.log(image);
        this.setState({ photo: image, uploadButton: false })
      });
    }

    showActionSheet = () => {
      ActionSheet.showActionSheetWithOptions({
        options: ['Choose photo from library', 'Take photo', 'Cancel'],
        cancelButtonIndex: 2,
        destructiveButtonIndex: 3,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          this.handletakePhoto()
        } else if (buttonIndex === 1) {
          this.handleChoosePhoto()
        }
      })
    }
    
    render() {
      const { photo } = this.state
      return (
        <TouchableWithoutFeedback style={{flex: 1}} onPress={Keyboard.dismiss} accessible={false}>
          <SafeAreaView style={styles.container}>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1, marginRight: 'auto', marginTop: 'auto', paddingTop: 10, paddingLeft: 10, alignItems: 'flex-start' }}>
                  <Button
                    onPress={this.showActionSheet}
                    title="Select photo"
                    color="#841584"
                    disabled={this.state.selectButton}
                  />
                </View>
                <View style={{ flex: 1, marginLeft: 'auto', paddingTop: 10, paddingRight: 10, alignItems: 'flex-end' }}>
                  <Button
                    onPress={() => this.uploadImage()}
                    title="Upload Photo"
                    color="green"
                    disabled={this.state.uploadButton}
                  />
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
        </TouchableWithoutFeedback>
      )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191970'
  },
  textTitle: {
    color: 'grey',
    fontSize: 10,
    paddingLeft: 20,
    paddingTop: 10
  },
  textInput: {
    flex: 10,
    color: 'white',
    paddingLeft: 30,
    borderBottomColor: 'grey',
    borderBottomWidth: 0.5,
    paddingTop: 5,
    textAlign: 'left'
  }
})