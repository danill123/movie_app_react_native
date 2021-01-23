import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from "@ui-kitten/components";
import 'react-native-gesture-handler';

// import view
import Movie from './screens/Movie';

// import redux
import { Provider } from 'react-redux';
import { FETCH_MOVIE_EXPLORE, SEARCH_MOVIE, NOT_FOUND, FETCH_ERROR } from './redux/actiontypes';
import { createStore , applyMiddleware } from 'redux';
import ThunkMiddleware from 'redux-thunk';

/**
 * Store - holds our state - THERE IS ONLY ONE STATE 
 * Action - State can be modified using actions - SIMPLE OBJECTS 
 * Dispatcher - Action needs to be sent by someone - known as dispatching an action
 * Reducer - receives the action and modifies the state to give us a new state 
 *  - pure functions 
 *  - only mandatory argument is the 'type' 
 * Subscriber - listens for state change to update the ui // was update to connect  
*/

/* redux config */ 
const initialState = {
   list : [],
   not_found : false,
   error_status : false
}

const reducer = (state=initialState, action) => {
   switch (action.type) {
      case FETCH_MOVIE_EXPLORE:
         return { ...state, list : action.list_result, not_found : false, error_status : false  }
      case SEARCH_MOVIE:
         return { ...state, list: action.list_result, not_found : false, error_status : false  }
      case NOT_FOUND:
         return { ...state, not_found : true, error_status : false }
      case FETCH_ERROR:
         return { ...state, not_found : false, error_status : true } 
      default:
         return state
   }
}

const store = createStore(reducer, applyMiddleware(ThunkMiddleware))

export default function App() {
   return(
      // Redux : Global store
      <ApplicationProvider {...eva} theme={eva.light}>
         <Provider store={store}>
            <Movie />
         </Provider>
      </ApplicationProvider>
   );
} 