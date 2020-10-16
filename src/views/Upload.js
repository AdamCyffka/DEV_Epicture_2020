import React from 'react'
import { SafeAreaView, Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View, Button, Image, TextInput, Alert } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import ImagePicker from 'react-native-image-crop-picker'
import LoadingView from 'react-native-loading-view'
import ActionSheet from "react-native-action-sheet"
import { Header } from 'react-native-elements'

import I18n from '../i18n/locales'

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
        Alert.alert(I18n.t('upload.success'))
      } else {
        Alert.alert(I18n.t('upload.failure'), data.data.error)
      }
    }

    handleChoosePhoto = () => { 
      ImagePicker.openPicker({
        width: 960,
        height: 796,
        cropping: true,
        includeBase64: true,
      }).then(image => {
        this.setState({ photo: image, uploadButton: false })
      });
    }

    handleTakePhoto = () => {
      ImagePicker.openCamera({
        width: 960,
        height: 796,
        cropping: true,
        includeBase64: true,
      }).then(image => {
        this.setState({ photo: image, uploadButton: false })
      });
    }

    showActionSheet = () => {
      ActionSheet.showActionSheetWithOptions({
        options: [I18n.t('upload.choosePhoto'), I18n.t('upload.takePhoto'), I18n.t('upload.cancel')],
        cancelButtonIndex: 2,
        destructiveButtonIndex: 3,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          this.handleChoosePhoto()
        } else if (buttonIndex === 1) {
          this.handleTakePhoto()
        }
      })
    }
  
    render() {
      const { photo } = this.state
      return (
        <TouchableWithoutFeedback style={{flex: 1}} onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.container}>
            <Header
            leftComponent={{ icon: 'arrow-left', color: '#fff', onPress: () => this.props.navigation.goBack(), }}
            centerComponent={{ text: I18n.t('upload.upload'), style: { color: '#fff' } }}
            statusBarProps={{ barStyle: 'light-content', backgroundColor: '#16202b' }}
            containerStyle={{
              backgroundColor: '#16202b',
              justifyContent: 'space-around',
            }}
          />
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1, marginRight: 'auto', marginTop: 'auto', paddingTop: 10, paddingLeft: 10, alignItems: 'flex-start' }}>
                  <Button
                    onPress={this.showActionSheet}
                    title={I18n.t('upload.selectPhoto')}
                    color="#DC143C"
                    disabled={this.state.selectButton}
                  />
                </View>
                <View style={{ flex: 1, marginLeft: 'auto', paddingTop: 10, paddingRight: 10, alignItems: 'flex-end' }}>
                  <Button
                    onPress={() => this.uploadImage()}
                    title={I18n.t('upload.uploadPhoto')}
                    color="#008000"
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
                    source={{ uri: photo.path }}
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
                placeholder={I18n.t('upload.title')}
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
                placeholder={I18n.t('upload.description')}
                placeholderTextColor={'grey'}
                style={[styles.textInput]}
                onChangeText={text => this.description = text}
              >
              </TextInput>
              <View style={{ flex: 1 }}></View>
            </View>
            <View style={{ flex: 1 }}></View>
          </View>
        </TouchableWithoutFeedback>
      )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#17202A'
  },
  textTitle: {
    color: '#1ea1f1',
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