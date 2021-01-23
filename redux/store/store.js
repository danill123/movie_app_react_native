import { create } from 'react-test-renderer';
import { createStore } from 'redux';
import rootReducer from '../reducers/index';

export default createStore(rootReducer);