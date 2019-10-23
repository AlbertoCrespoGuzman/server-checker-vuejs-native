import { fetchPosts, fetchListItems,  loginUser } from './fetch';

import { AsyncStorage } from 'react-native';
import axios from 'axios'

// ensure data for rendering given list type
export function FETCH_LIST_DATA ({ commit, dispatch }, { type }) {
  console.log('actions.js -> FETCH_LIST_DATA')
  commit('FETCHING_LISTS');
  return fetchPosts(type, dispatch)
    .then(posts => {
      console.log('actions.js -> posts', posts)
      return commit('SET_POSTS', { posts })
    })
    .catch(err => {
      console.log('FORCING_LOGOUT en ACTIONS')
      return commit('FORCING_LOGOUT')
    });
}
export function FETCH_LIST_ITEMS ({ commit, dispatch }, { id }) {
  console.log('actions.js -> FETCH_LIST_ITEMS')
  commit('FETCHING_LIST_ITEMS');
  return fetchListItems(id, dispatch)
    .then(listItems => {
      console.log('actions.js -> listItems', listItems)
      return commit('SET_LIST_ITEMS', { listItems })
    })
    .catch(err => {
      console.log('FORCING_LOGOUT en ACTIONS')
      return commit('FORCING_LOGOUT')
    });
}
export function LOGIN ({ commit, state}, {userObj, navigate}) {
  commit('LOGGING_IN', true)
  return loginUser(userObj).then(res => {
    commit('LOGIN_SUCCESFULL', {userObj})
    axios.defaults.headers.common['X-CSRF-TOKEN'] = res;
    axios.defaults.headers.common['Content-Type'] = 'application/json'
    AsyncStorage.setItem('email', userObj.email)
    navigate("Home")
  })
     
}

export function SET_USER({commit, state}, {userObj}) {
  return commit('LOGIN_SUCCESFULL', {userObj})
}

export function LOGOUT ({ commit, state}, callback) {
  return new Promise((resolve, reject) => {
      AsyncStorage.removeItem('email').then(() => {
        AsyncStorage.removeItem('jwtToken').then(() => {
                AsyncStorage.removeItem('fcmToken').then(() => {
                  delete axios.defaults.headers.common['X-CSRF-TOKEN'];
                callback();
                resolve();
          })
        })
      })
  })
}