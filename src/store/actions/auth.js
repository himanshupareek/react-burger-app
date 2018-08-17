//setup authentication related actions.

import * as actionTypes from './actionTypes';

//here we are using default axios service, not our custom instance which we are using for burger and order.
import axios from 'axios';
//Not using the below one.
//import axios from '../../axios-orders';

//to set the loading state and potantially to show the spinner
export const authStart = () => {
    return {
        type : actionTypes.AUTH_START
    };
};

//will return some data
export const authSuccess = (token, userId) => {
    return {
        type : actionTypes.AUTH_SUCCESS,
        idToken : token,
        userId : userId
    }
}

export const authFail =(error) => {
    return {
        type : actionTypes.AUTH_FAIL,
        error : error
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type : actionTypes.AUTH_LOGOUT
    }
}

//async -> LogOut the application, after given time.
//here -> expirationTime is Amount of Seconds.
export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000); //miliseconds to seconds, because expirationTime is in seconds
    }
}

//async code doing the authentication
//will get email and password, as input data
export const auth = (email, password, isSignUp) => {
    //function which gets dispatch as an argument, thanks to redux-thunk
    return dispatch => {
        dispatch(authStart());
        //we can check the firebase api from the below url regarding SignIn/SignUp etc..
        //https://firebase.google.com/docs/reference/rest/auth/#section-create-email-password
        const authData = {
            email : email,
            password : password,
            returnSecureToken : true
        }

        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBo5FwwNbcTMSwYb-JGGLgMnIzcsF6Qf7c';
        if(!isSignUp){
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBo5FwwNbcTMSwYb-JGGLgMnIzcsF6Qf7c';
        }

        axios.post(url, authData)
                    .then(response => {
                        const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                        localStorage.setItem('token', response.data.idToken);
                        localStorage.setItem('expirationDate', expirationDate);
                        localStorage.setItem('userId', response.data.localId);
                        //response from Firebase
                        dispatch(authSuccess(response.data.idToken, response.data.localId));
                        dispatch(checkAuthTimeout(response.data.expiresIn));
                    })
                    .catch(err => {
                        //due to axios -> err.response.data.error
                        dispatch(authFail(err.response.data.error));
                    })
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type : actionTypes.SET_AUTH_REDIRECT_PATH,
        path : path
    }
}

export const authCheckState = () => {
    //Though its not accessing anything asynchronously, even than we need dispatch function, because
    //we are calling multiple actions from this action.
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token){
            dispatch(logout());
        } else {
            //getting from localStorage always returns string value, so convert it into date
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate <= new Date()){
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                //dividing by 1000, becuase in checkAuthTimeOut action, we are already multiplying.
                const exiraitonSecondsDiff = (expirationDate.getTime() - new Date().getTime()) / 1000;
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout(exiraitonSecondsDiff));
            }

        }
    }
}