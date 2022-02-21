import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';

import rootReducer from './root-reducer';

const middlewares = [logger];

/* A store holds the whole state tree of your application.
The only way to change the state inside it is dispatch an action on it.
A store is  not a class. It is just an obj with few methods on it.
To create it, pass your root reducing function to createStore. 
Store methods: getState(), dispatch(action), subscribe(listener), replaceReducer(nextReducer)
getState(): The current state of your application
dispatch(action): Dispatches an action. This is the only way to trigger a state change
*/

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;

