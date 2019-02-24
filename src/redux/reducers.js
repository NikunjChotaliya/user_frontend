import {
    combineReducers
  } from 'redux';
  
  import { reducer as reduxFormReducer } from 'redux-form';
  
  import {
    UserListReducer
  } from '../Components/';
    
  export default combineReducers({
    UserListReducer,
    form: reduxFormReducer,
  });
  