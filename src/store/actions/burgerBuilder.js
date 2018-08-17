//Here we will create our ActionCreators for building the burgers.
//Here we are only having synchronous actionCreators for adding or removing ingredients.

import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

//following naming conventions just similar to ActionTypes, but here its CamelCase pattern with first small.
export const addIngredient = (name) => {
    return {
        type : actionTypes.ADD_INGREDIENT,
        //payload property
        ingredientName : name
    }
}

export const removeIngredient = (name) => {
    return {
        type : actionTypes.REMOVE_INGREDIENT,
        //In the Container -> burgerBuilder.js -> we are receiving ingredientName
        //left hand name, can be anything, up to you
        ingredientName : name
    }
}

export const setIngredients = (ingredients) => {
    return {
        type : actionTypes.SET_INGREDIENTS,
        //left hand name, can be anything, up to you
        ingredients : ingredients
    }
};

export const fetchIngredientsFailed = () => {
    return {
        type : actionTypes.FETCH_INGREDIENTS_FAILED
        //no arguments as payload
    }
}

export const initIngredients = () => {
    //this syntax is available due to Redux-Thunk, while allows me to create my actionCreator like this.
    //we can also have a second argument here as well name as -> getState
    //which we can use to get the access of the state.
    //return (dispatch, getState) => {}
    return dispatch => {
        //now here I can execute async code, and dispatch a new action, when I am done.
        
        axios.get('https://react-my-burger-2ff45.firebaseio.com/ingredients.json')
            .then(response => {
                dispatch(setIngredients(response.data))
                //this.setState({ingredients : response.data});
            })
            .catch( error => {
                //this.setState({error : true});
                dispatch(fetchIngredientsFailed());
            })
    }
}