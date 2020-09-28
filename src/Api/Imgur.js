import React, { Component } from "react";
import AsyncStorage from '@react-native-community/async-storage';

const BASE_URL = "https://api.imgur.com";

async function generateUserRequest(method = 'GET') {
    const token = await AsyncStorage.getItem('accessToken');
    return {
        method,
        headers: {
            Authorization: `Bearer` + token
        }
    };
}

export async function getUserFavorites() {
    const user = await AsyncStorage.getItem('userName');
    return fetch(`${BASE_URL}/3/account/` + user + `/favorites`, generateUserRequest())
    .then((response) => {
        return response.json();
    })
    .then((result) => {
        if (result.success)
            return Promise.resolve(result.data);
        return Promise.reject(result.data);
    });
}