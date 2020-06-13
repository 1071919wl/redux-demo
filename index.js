const redux = require('redux')
//in react we would use "import react from 'react'"
//but since this is vanilla .js, we use 'require'
const createStore = redux.createStore;
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;
const reduxLogger = require('redux-logger');
const logger = reduxLogger.createLogger();


const BUY_CAKE = 'BUY_CAKE';
const BUY_ICECREAM = 'BUY_ICECREAM';


function buyCake(){
  return {
    type: BUY_CAKE,
    info: 'First redux action'
  }
}

function buyIceCream(){
  return {
    type: BUY_ICECREAM,
  }
}

// (previousState, action) => newState

// const initialState= {
//   numOfCakes: 10,
//   numOfIceCreams: 20
// }

const initialCakeState = {
  numOfCakes: 10
}

const initialIceCreamState = {
  numOfIceCreams: 20
}
// ---------------------------v1---------------------------
// const reducer = (state = initialState, action) => {
//   switch(action.type){
//     case BUY_CAKE: return {
//       ...state,
//       numOfCakes: state.numOfCakes - 1
//     }
//
//     case BUY_ICECREAM: return {
//       ...state,
//       numOfIceCreams: state.numOfIceCreams - 1
//     }
//     default: return state
//   }
// }
// ---------------------------v2---------------------------
const cakeReducer = (state = initialCakeState, action) => {
  switch(action.type){
    case BUY_CAKE: return {
      ...state,
      numOfCakes: state.numOfCakes - 1
    }
    default: return state
  }
}

const iceCreamReducer = (state = initialIceCreamState, action) => {
  switch(action.type){
    case BUY_ICECREAM: return {
      ...state,
      numOfIceCreams: state.numOfIceCreams - 1
    }
    default: return state
  }
}
// ---------------------------v2---------------------------

// START REDUX COMBINE REDUCER
const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer
})
// END REDUX COMBINE REDUCER

const store = createStore(rootReducer, applyMiddleware(logger))
console.log('Initial state', store.getState())
const unsubscribe = store.subscribe(()=> console.log('Updated state', store.getState()))
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIceCream())
store.dispatch(buyIceCream())

unsubscribe()



// STEPS:
// 1. store.dispatch(buyCake()) is invoked
// 2. buyCake is invoked triggering the function
// 3. cakeReducer is then triggered due to action.type.
// 4. updating numOfCakes down by 1

