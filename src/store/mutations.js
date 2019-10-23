

export function SET_POSTS (state, { posts}) {
  state.loadingPosts = false;
  state.posts = posts;
}

export function FETCHING_LISTS (state) {
  
  state.loadingPosts = true;
  console.log('mutations.js -> FETCHING_LISTS')
}
export function FETCHING_LIST_ITEMS (state) {
  
  state.loadingListItems = true;
  console.log('mutations.js -> FETCHING_LIST_ITEMS')
}
export function SET_LIST_ITEMS (state, { listItems}) {
  state.loadingListItems = false;
  state.listItems = listItems;
}

export function LOGGING_IN (state, status) {
  state.logging_in = status;
}

export function LOGIN_SUCCESFULL (state, {userObj}) {
  state.userObj = userObj;
  state.logging_in = false;
}
export function FORCING_LOGOUT (state, {}) {
  console.log('!!!!!!-----   FORCING_LOGOUT ------ ')
  state.userObj = null;
  state.logging_in = false;
}