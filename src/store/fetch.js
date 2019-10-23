import { AsyncStorage } from "react-native";
import axios from 'axios'

const baseURL = 'http:/18.216.87.191:3001';

export function _fetch (path) {
  return fetch({
    method: 'GET',
    url: `${baseURL}/${path}`
  })
  .then((response) => response.json());
}
/*
export function fetchPosts (type) {
  return _fetch(`${type}`);
}
*/
export async function fetchPosts (type, commit) {
    const csrf = await AsyncStorage.getItem('jwtToken')
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrf
    axios.defaults.headers.common['Content-Type'] = 'application/json'
    console.log('fetchPosts!!!!!!!! ')
    return getTodos(commit)
}
export function getTodos (commit) {
  return new Promise(function( resolve, reject){
      axios.get(baseURL + '/todos')
        .then(res => {
            console.log(res.data)
            resolve(res.data)

        })
        .catch((err) => {
            reject(err)
         
        })
  })
}

export async function fetchListItems (id, commit) {
  const csrf = await AsyncStorage.getItem('jwtToken')
  axios.defaults.headers.common['X-CSRF-TOKEN'] = csrf
  axios.defaults.headers.common['Content-Type'] = 'application/json'
  console.log('fetchListItems!!!!!!!! ')
  return getListItems(id)
}
export function getListItems (id) {
return new Promise(function( resolve, reject){
    axios.get(baseURL + '/todos/' + id + '/list_items')
      .then(res => {
          // /console.log(res.data)
          resolve(res.data)

      })
      .catch((err) => {
          reject(err)
       
      })
})
}



/*
export const loginUser = (user) => dispatch => {
  console.log('inside LoginUser', user)
  axios.post(baseURL + '/signin', user)
          .then(res => {
              console.log('res', res.data)
              const { csrf } = res.data;
              return AsyncStorage.setItem('jwtToken', csrf)

          })
          .catch((err) => {
              console.log(err)
              console.log(err.response)
              if(err && err.response){
                  dispatch({
                      type: GET_ERRORS,
                      payload: err.response.data
                  })
              }else{
                  console.log(err)
              }
              
          });
        }
          */

  export const loginUser =  (user) => {
    return new Promise(function( resolve, reject){
        axios.post(baseURL + '/signin', user)
          .then(res => {
              console.log('res', res.data)
              const { csrf } = res.data;
              /*return */  AsyncStorage.setItem('jwtToken', csrf)

                resolve(csrf) 

          })
          .catch((err) => {
              reject(err)
              console.log(err)
              console.log(err.response)
              if(err && err.response){
                  dispatch({
                      type: GET_ERRORS,
                      payload: err.response.data
                  })
              }else{
                  console.log(err)
              }
              
          })
    })
  }
