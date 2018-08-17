import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';


const initialState = {
    orders : [],
    loading: false,
    purchased: false,
    orderData: {}
};

//this method uses to clean the switch cases code,=.
//having two parameters one is state and second one is action, just like reducer() method.
const purchaseInit = (state, action) => {
    return updateObject(state, { purchased: false });

            // return {
            //     ...state,
            //     purchased : false
            // }
}

const purchaseBurgerStart = (state, action) => {
    return updateObject(state, { loading: true });
}

const purchaseBurgerSuccess = (state, action) => {
    const newOrder = updateObject( action.orderData, { id : action.orderId });
            // const newOrder = {
            //     //getting these information from purchaseBurgerSuccess of actions/order.js file
            //     ...action.orderData, 
            //     id : action.orderId
            // }

            return updateObject(state, {
                loading: false,
                //concat returns a new array, therefore we have added this immutibly.
                //concat, the order array as well as orderId
                orders: state.orders.concat(newOrder),
                purchased: true
            })

            // return {
            //     ...state,
            //     loading: false,
            //     //concat returns a new array, therefore we have added this immutibly.
            //     //concat, the order array as well as orderId
            //     orders: state.orders.concat(newOrder),
            //     purchased: true
            // };
}

const purchaseBurgerFail = (state, action) => {
    return updateObject(state, {loading : false});
            // return {
            //     ...state,
            //     loading : false
            // };
}

const fetchOrdersStart = (state, action) => {
    return updateObject(state, {loading : true});
}

const fetchOrdersSuccess = (state, action) => {
    return updateObject(state, {
        orders : action.orders,
        loading : false
    });
}

const fetchOrdersFail = (state, action) => {
    return updateObject(state, { loading : false });
}

const deleteOrderStart = (state, action) => {
    return updateObject(state, { loading : true });
}

const deleteOrderSuccess = (state, action) => {

    const updatedOrders = state.orders.filter(a => a.id !== action.orderId)

    return updateObject(state, {
        orders : updatedOrders,
        loading : false
    });
}

const deleteOrderFail = (state, action) => {
    return updateObject(state, { loading : false });
}

const orderContactInfoStart = (state, action) => {
    return updateObject(state, { loading : true });
}

const orderContactInfoSuccess = (state, action) => {

    //const orderData = state.orders.filter(a => a.id === action.orderId).orderData;

    return updateObject(state, {
        orderData : action.orderContactData,
        loading : false
    });
}

const orderContactInfoFail = (state, action) => {
    return updateObject(state, { loading : false });
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.PURCHASE_INIT: return purchaseInit(state, action);
        case actionTypes.PURCHASE_BURGER_START : return purchaseBurgerStart(state, action);
        case actionTypes.PURCHASE_BURGER_SUCCESS : return purchaseBurgerSuccess(state, action);
        case actionTypes.PURCHASE_BURGER_FAIL : return purchaseBurgerFail(state, action);
        case actionTypes.FETCH_ORDERS_START : return fetchOrdersStart(state, action);
        case actionTypes.FETCH_ORDERS_SUCCESS : return fetchOrdersSuccess(state, action);
        case actionTypes.FETCH_ORDERS_FAIL : return fetchOrdersFail(state, action);
        case actionTypes.DELETE_ORDER_START : return deleteOrderStart(state, action);
        case actionTypes.DELETE_ORDER_SUCCESS : return deleteOrderSuccess(state, action);
        case actionTypes.DELETE_ORDER_FAIL : return deleteOrderFail(state, action);

        case actionTypes.ORDER_CONTACT_INFO_START : return orderContactInfoStart(state, action);
        case actionTypes.ORDER_CONTACT_INFO_SUCCESS : return orderContactInfoSuccess(state, action);
        case actionTypes.ORDER_CONTACT_INFO_FAIL : return orderContactInfoFail(state, action);

        //its very important to handle dafault case, since we wiil combine couple of reducers, so it should
        //definately return something, if this is having an action, which is handled in the different reducer.
        default : return state;
    }
}

export default reducer;