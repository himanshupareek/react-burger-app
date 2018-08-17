import * as actionTypes from '../actions/actionTypes';

//its a named export, so we need a curly braces.
import { updateObject } from '../../shared/utility';

const initialState = {
    ingredients : null,
    totalPrice : 4,
    //set it true, while our loading of ingredients does fail to load async.
    error : false,
    building : false
}

const INGREDIENT_PRICES = {
    salad : 0.5,
    cheese : 0.4,
    meat : 1.3,
    bacon: 0.7
}

//this method uses to clean the switch cases code,=.
//having two parameters one is state and second one is action, just like reducer() method.
const addIngredient = (state, action) => {
    //using utility function, we can structure the code.

    //this must be an object, because "updateObject" of "utitliy" is expecting both parameters
    //as objects.
    const updatedIngredient = {[action.ingredientName] : state.ingredients[action.ingredientName] + 1 };
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients : updatedIngredients,
        totalPrice : state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building : true
    }
    return updateObject(state, updatedState);

    // return {


            //     //first of all copy the entire old state with spread operator, so that when we set new
            //     //ingredients, we also keep any other property around, by distributing them over the
            //     //new js object first,
            //     ...state,
            //     //ingredients also a new js object, immutability, don't use the old one.
            //     //and just distributing "state" can't do the deep clone, so to create a new copy of internal
            //     //objects too, we have to clone that as well.
            //     ingredients : {
            //          ...state.ingredients,
            //          //now override the ingredients copy which we created here.
            //          //ES6 (Destructure), to dynamically override the given property in a JS object
            //          //ingredientName -> the payload property, which we are setting while dispatching the props.
            //          [action.ingredientName] : state.ingredients[action.ingredientName] + 1
            //     },
            //     totalPrice : state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
                
            // }

};

const removeIngredient = (state, action) => {
    const updatedIng = {[action.ingredientName] : state.ingredients[action.ingredientName] - 1 };
    const updatedIngs = updateObject(state.ingredients, updatedIng);
    const updatedSt = {
        ingredients : updatedIngs,
        totalPrice : state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        building : true
    }
    return updateObject(state, updatedSt);
}

const setIngredient = (state, action) => {
    return updateObject(state, {
        //ingredients : action.ingredients, //passing throught actionCreator
        //we needed to set it manually, becuase our order of ingredients was not correct, due to 
        //its value is saved alphabatically into Firebase database.
        ingredients : {
            salad : action.ingredients.salad,
            bacon : action.ingredients.bacon,
            cheese : action.ingredients.cheese,
            meat : action.ingredients.meat
        },
        totalPrice : 4,
        //to reset the error, incase, I had error earlier, and now I don't have then set it false.
        error : false,
        //just reloaded the page, that means from starting we will add our ingredients.
        building : false
    });
}

const fetchIngredientsFailed = (state, action) => {
    return updateObject(state, {
        error: true
    })
}

//reducer takes two arguments, one is state and second is action.
const reducer = (state = initialState, action) => {
    //"type" is fixed here, we can't change with other name
    //we always have to have "type" property on our action.
    switch(action.type){
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
            //no need of break, as we are already returning, so code will not reach to this statement.
            //break;
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
        case actionTypes.SET_INGREDIENTS : return setIngredient(state, action);
        case actionTypes.FETCH_INGREDIENTS_FAILED : return fetchIngredientsFailed(state, action);
        default: return state;
    }
}

export default reducer;