import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
const isClient = typeof window !== 'undefined' && window.document;

function rootReducer(state = {}, action) {
    switch (action.type) {
        default:
            return state;
    }
}

let store = null;
if (isClient) {
    const defaultStore = window.context && window.context.INITIAL_STATE;
    store = createStore(
        rootReducer,
        defaultStore,
        compose(
            applyMiddleware(thunk),
            window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
        )
    );
} else {
    store = createStore(
        rootReducer,
        compose(
            applyMiddleware(thunk)
        )
    );
}

export default store;
