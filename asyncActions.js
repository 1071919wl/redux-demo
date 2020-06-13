const redux = require('redux');
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const thunkMiddleware = require('redux-thunk').default;
const axios = require('axios')


const initialState = {
  loading: false,
  users: [],
  error: ""
}

const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST'
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE'

const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUEST
  }
}

const fetchUsersSuccess = users => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users
  }
}

const fetchUsersFalure = error => {
  return {
    type: FETCH_USERS_FAILURE,
    payload: error
  }
}


// START REDUCER FUNCTIONS
const reducer = (state=initialState, action) => {
  switch(action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true
      }

    case FETCH_USERS_SUCCESS:
      return {
        loading: false,
        users: action.payload,
        error: ''
      }

    case FETCH_USERS_FAILURE:
      return {
        loading: false,
        users: [],
        error: action.payload
      }
  }
}
// END REDUCER FUNCTIONS

const fetchUsers = () => {
  return function(dispatch) {
    dispatch(fetchUsersRequest())
    axios.get('https://jsonplaceholder.typicode.com/users')
    .then(response => {
      //response.data is the array of users
      const users = response.data.map(user => user.id)
      dispatch(fetchUsersSuccess(users))
    })
    .catch(error =>{
      //error.message is the error description
      dispatch(FETCH_USERS_FAILURE(error.message))
    })
  }
}

const store = createStore(reducer, applyMiddleware(thunkMiddleware))
store.subscribe(() => { console.log(store.getState())})
store.dispatch(fetchUsers())


// STEPS:
// 1. fetchUsers is invoked
// 2. fetchUsersRequest is then invoked triggering API
// 3. then returns user.id from API
// 4. which takes that response, put it in "users" variable
// 5. and returns it to dispatch(fetchUsersSuccess(users)
// 6. fetchUsersSuccess function is triggered
// 7. "users" sees there change from step 4
// 8. triggering action.type in reducer.
// 9. goes to correct case
// 10. and updates actions.payload
