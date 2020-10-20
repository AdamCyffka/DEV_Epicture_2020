import AsyncStorage from '@react-native-community/async-storage'
import Api from '../config/Api'

export async function getUserComments() {
  const token = await AsyncStorage.getItem('accessToken')
  const username = await AsyncStorage.getItem('userName')
  return fetch(`${Api.URI}/account/${username}/comments`, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
  .then((response) => {
    return response.json()
  })
  .then((result) => {
    if (result.success)
      return Promise.resolve(result.data)
    return Promise.reject(result.data)
  })
}

export async function getUserFavorites() {
  const token = await AsyncStorage.getItem('accessToken')
  const username = await AsyncStorage.getItem('userName')
  return fetch('https://api.imgur.com/3/account/' + username + '/favorites/', {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
  .then((response) => {
    return response.json()
  })
  .then((result) => {
    if (result.success)
      return Promise.resolve(result.data)
    return Promise.reject(result.data)
  })
}

export async function getGalleryTop(category, sort, page) {
  return fetch(`https://api.imgur.com/3/gallery/${category}/${(category === 'user') ? sort : 'time/day'}/${page}?showViral=true&mature=true&album_previews=false`, {
    'method': 'GET',
    'headers': {
      'Authorization': `Client-ID ${Api.clientID}`
    }
  })
  .then((response) => {
    return response.json()
  })
  .then((result) => {
    if (result.success)
      return Promise.resolve(result.data)
    return Promise.reject(result.data)
  })
}

export async function getAccountInfo() {
  const token = await AsyncStorage.getItem('accessToken')
  const username = await AsyncStorage.getItem('userName')
  return fetch('https://api.imgur.com/3/account/' + username, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  })
  .then((response) => {
    return response.json()
  })
}

export async function getNbComment() {
  const token = await AsyncStorage.getItem('accessToken')
  const username = await AsyncStorage.getItem('userName')
  return fetch('https://api.imgur.com/3/account/' + username + '/comments/count', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  })
  .then((response) => {
    return response.json()
  })
}

export async function getNbPic() {
  const token = await AsyncStorage.getItem('accessToken')
  const username = await AsyncStorage.getItem('userName')
  return fetch('https://api.imgur.com/3/account/' + username + '/images/count', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  })
  .then((response) => {
    return response.json()
  })
}

export async function getNbAlbums() {
  const token = await AsyncStorage.getItem('accessToken')
  const username = await AsyncStorage.getItem('userName')
  return fetch('https://api.imgur.com/3/account/' + username + '/albums/count', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  })
  .then((response) => {
    return response.json()
  })
}

export async function getUserPosts() {
  const token = await AsyncStorage.getItem('accessToken')
  return fetch('https://api.imgur.com/3/account/me/images', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  })
    .then((response) => {
      return response.json()
    })
    .then((result) => {
      if (result.success)
        return Promise.resolve(result.data)
      return Promise.reject(result.data)
    })
}

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

export async function favImage(imageHash) {
  const token = await AsyncStorage.getItem('accessToken')
  return fetch(`https://api.imgur.com/3/image/${imageHash}/favorite`, {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
  .then((response) => {
    return response.json()
  })
  .then((result) => {
    if (result.success)
      return Promise.resolve(result.data)
    return Promise.reject(result.data)
  })
}

export async function cleanVoteImage(imageHash) {
  const token = await AsyncStorage.getItem('accessToken')
  return fetch(`https://api.imgur.com/3/gallery/${imageHash}/vote/veto`, {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
  .then((response) => {
    return response.json()
  })
  .then((result) => {
    if (result.success)
      return Promise.resolve()
    return Promise.reject(result.data)
  })
}

export async function downVoteImage(imageHash) {
  const token = await AsyncStorage.getItem('accessToken')
  return fetch(`https://api.imgur.com/3/gallery/${imageHash}/vote/down`, {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
  .then((response) => {
    return response.json()
  })
  .then((result) => {
    if (result.success)
      return Promise.resolve()
    return Promise.reject(result.data)
  })
}

export async function upVoteImage(imageHash) {
  const token = await AsyncStorage.getItem('accessToken')
  return fetch(`https://api.imgur.com/3/gallery/${imageHash}/vote/up`, {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
  .then((response) => {
    return response.json()
  })
  .then((result) => {
    if (result.success)
      return Promise.resolve(result.data)
    return Promise.reject(result.data)
  })
}

export async function getImageInfo(imageHash) {
  const token = await AsyncStorage.getItem('accessToken')
  return fetch(`https://api.imgur.com/3/image/${imageHash}`, {
    'method': 'GET',
    'headers': {
      'Authorization': 'Bearer ' + token
    },
  })
    .then((response) => {
    return response.json()
  })
  .then((result) => {
    if (result.success)
      return Promise.resolve(result.data)
    return Promise.reject(result.data)
  })
}

export async function DeleteComment(commentId) {
  const token = await AsyncStorage.getItem('accessToken')
  return fetch('https://api.imgur.com/3/comment/' + commentId, {
    method: 'DEL',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  })
  .then((response) => {
    return response.json()
  })
}