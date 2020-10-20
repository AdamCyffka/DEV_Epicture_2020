# Epicture

A cross platform mobile client to browse the Imgur platform, designed to be simple as Instagram.

## Contents
- [Introduction](#introduction)
    - [Contributors](#contributors)
    - [Disclaimer](#disclaimer)
- [Features](#features)
- [Getting started](#getting-started)
    - [Local build (Android)](#local-build-android)
    - [Local build (iOS)](#local-build-ios)

## Introduction

This application is not (yet) an official Imgur client for mobile users.

It was written using react-native and expo, and runs on Android SDK 21-28 / iOS 10.0-12.1.

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

### Local build (Android)

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

### Local build (iOS)

To build a production IPA for iOS, open the Xcode workspace in the `ios/` directory (on a mac).

```bash
cd ios
pod install
open epicture.xcworkspace
```

### Run on Android

#### With on the Android emulator

open Android Studio<br/>
configure a AVD manager (top right of tools bar)<br/>
run the android device<br/>
go to our project folder root<br/>
open terminal<br/>
`npm install`
`npm react-native run-android`

#### With a mobile phone

open Android Studio<br/>
make sure that your phone is correctly selected in available devices<br/>
go to our project folder root<br/>
open terminal inside<br/>
`npm install`
`npm react-native run-android`

### Run on iOS

#### With on the iOS emulator

go to our project folder root<br/>
open terminal inside<br/>
`npm install`
`npm react-native run-ios`

#### With a Iphone

go to our project folder root<br/>
open terminal inside<br/>
`npm install`
`npm react-native run-ios`
