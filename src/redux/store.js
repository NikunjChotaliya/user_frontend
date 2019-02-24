import { createStore, applyMiddleware, compose } from 'redux'; 
import thunk from 'redux-thunk';

import reducers from './reducers';

const middleware = [
  thunk
];

const composedEnhancers = compose(
  applyMiddleware(...middleware)
)

export default createStore(
  reducers,
  composedEnhancers
);


