import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    token : null,
    userId : null,
    error : null,
    loading : false,
    //if the user is unauthenticated initially, and he is on BurgerBuilder page, and if he has added the
    //ingredients or not, based on that, after login, he will be redirect to the particular page, so that his ingredient
    //states not lost.
    authRedirectPath : '/'
};

const authStart = (state, action) => {
    //passing both of the parameters as Object.
    return updateObject(state, { error : null, loading : true });
}

const authSuccess = (state = initialState, action) => {
    return updateObject(state, { 
        token : action.idToken,
        userId : action.userId,
        error : null,
        loading : false
    });
};

const authFail = (state, action) => {
    return updateObject(state, {
        error : action.error,
        loading : false
    });
};

const authLogout = (state, action) => {
    return updateObject(state, {
        token : null,
        userId : null,
        loading : false
    })
}

const setAuthRedirectPath = (state, action) => {
    return updateObject(state, {
        authRedirectPath : action.path
    })
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        //make sure you are putting "return" keyword.
        case actionTypes.AUTH_START                 : return authStart(state, action);
        case actionTypes.AUTH_SUCCESS               : return authSuccess(state, action);
        case actionTypes.AUTH_FAIL                  : return authFail(state, action);
        case actionTypes.AUTH_LOGOUT                : return authLogout(state, action);
        case actionTypes.SET_AUTH_REDIRECT_PATH     : return setAuthRedirectPath(state, action);
        default :
            return state;
    }
}

export default reducer;