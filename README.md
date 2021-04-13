[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/AdamCyffka/DEV_Epicture_2020/main/LICENSE)
[![Made with](https://img.shields.io/badge/made%20with-React%20Native-orange)](https://reactnative.dev/)

# Epicture

A cross platform mobile client to browse the Imgur platform.

## Introduction

This application is not (yet) an official Imgur client for mobile users.

It was written using react-native, and runs on Android SDK 28 / iOS 10.0-14.0.

### Contributors

* [Adam Cyffka](https://github.com/AdamCyffka)
* [Valentin Masson](https://github.com/Valipss)

### Disclaimer

We do not endorse any responsablities regarding what could happen to your Imgur account..

## Features

* Display the user's personalized timeline
* Explore photos with various sorting possibilities
* Upload pictures (publicly or not)
* View other user's profile
* View and manage your profile
* View and manage your favorites
* Search for pictures

## Getting started

### Prerequisites

* NodeJS
* Npm
* Java SE Development Kit (JDK)
* Android SDK Platform 28

### Run on Android

#### With a virtual device

Download and install Android Studio<br/>
Open it<br/>
Configure a AVD manager (top right of tools bar)<br/>
Run the Android device<br/>
Define the ANDROID_SDK_ROOT environment variable with the "Android/sdk" location<br/>
Go to our project folder root<br/>
Open terminal inside and run `npm install`<br/>
Then run `npx react-native start`<br/>
Open a new terminal inside the project folder root and run the following: `npx react-native run-android`<br/>

#### With a physical device

Download and install Android Studio<br/>
Open it<br/>
Make sure that your phone is correctly selected in available devices (top bar)<br/>
Define the ANDROID_SDK_ROOT environment variable with the "Android/sdk" location<br/>
Go to our project folder root<br/>
Open terminal inside and run `npm install`<br/>
Then run `npx react-native start`<br/>
Open a new terminal inside the project folder root and run the following: `npx react-native run-android`<br/>

### Run on iOS (Mac only)

#### With a virtual device

Download and install Xcode
Go to our project folder root<br/>
Open terminal inside and run `npm install`<br/>
Then run `npx react-native start`<br/>
Open a new terminal inside the project folder root and run the following: `npx react-native run-ios`<br/>

#### With a physical device

Download and install Xcode
Make sure that your phone is correctly plug in<br/>
Go to our project folder root<br/>
Open terminal inside and run `npm install`<br/>
Then run `npx react-native start`<br/>
Open a new terminal inside the project folder root and run the following: `npx react-native run-ios`<br/>

### APK build (Android)

To build the project for Android, use the Graddle Wrapper tool in the `android/` directory.

```bash
cd android
```
Then, define Android Home environment variable (replace ~/Library/Android by your Android folder location)
```bash
export ANDROID_HOME=~/Library/Android
./gradlew build
```

To generate a production APK, run use:

```bash
./gradlew assembleRelease
```

## Preview

![image](https://i.imgur.com/IErbMYM.png)
![image](https://i.imgur.com/nEFeDNi.png)
![image](https://i.imgur.com/Dovx9FA.png)
