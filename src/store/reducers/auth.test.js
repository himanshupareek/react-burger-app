//here we don't need to import from 'REact"
//becuase we are not testing any funcitonality from React, but we are just testing our JS methods.

import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer',  () => {
    
    it('should return the initial state', () => {
        //becuase its a normal JS function, so instead of instantially with wrapper, we are just running it.
        //undefined -> state is just getting setup, in the beginning of the app.
        expect(reducer(undefined, {})).toEqual({
            token : null,
            userId : null,
            error : null,
            loading : false,
            authRedirectPath : '/'
        })
    });

    //passing payload values too.
    it('should store the token upon login', () => {
        expect(reducer({
            token : null,
            userId : null,
            error : null,
            loading : false,
            authRedirectPath : '/'
        }, {
            type : actionTypes.AUTH_SUCCESS,
            idToken : 'some-token',
            userId : 'some-user-id'
        })).toEqual({
            token : 'some-token',
            userId : 'some-user-id',
            error : null,
            loading : false,
            authRedirectPath : '/'
        })
    })
})