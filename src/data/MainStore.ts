import { createStore, combineReducers } from 'redux';
import { List, Map } from 'immutable';

import { AppReducer, namespace as AppNamespace } from './AppStore';

const rootReducer = combineReducers({
  [AppNamespace]: AppReducer,
});

export const MainStore = createStore(rootReducer);