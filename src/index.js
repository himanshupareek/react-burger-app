import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';

//Creates a store enhancer that applies middleware to the dispatch method of the Redux store. 
//This is handy for a variety of tasks, such as expressing asynchronous actions in a concise manner, 
//or logging every action payload.
//See redux-thunk package as an example of the Redux middleware.

//compose -> for devTool (redux-devtool-entensions)
//compose allows us to compose our own setup enhancers, and middleware is a just one kind of enhancer, devtool
//would be another example.
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';

//Redux should only work for development enviornment not in production.

//here "process" is a global variable and even we don't need to import this.
//we can see the env.js file in our config folder.. "config/env.js"
const composeEnhancers = process.env.NODE_ENV ==='development' 
                                        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ 
                                        : null 
                                        || compose; //if first part is null then use the default compose function.

const rootReducer = combineReducers({
    burgerBuilder : burgerBuilderReducer,
    order : orderReducer,
    auth : authReducer
});


//https://github.com/zalmoxisus/redux-devtools-extension

//create a redux store, that holds the state tree.
// The only way to change the data in the store to call the dispatch() on it.
const store = createStore(rootReducer, 
    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    composeEnhancers(
        //middleware which we want to apply -> thunk

        //now we can write async code in our ActionCreators.
        applyMiddleware(thunk)
    ));

//wrap the full app with BrowserRouter
const app = (
    //so now we have connected our Store, which were created by Redux with our React application.
    <Provider store={store}>
        {/* though, basename is not needed here */}
        <BrowserRouter basename="/">
            <App />
        </BrowserRouter>
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
