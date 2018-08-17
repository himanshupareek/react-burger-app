//this file keeps the actions creator for submitting the orders.

import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

//expecting id, of the newly created order, which was created on the backend, on the db end.
//and orderData
//these params, will be passed as the payload params data

//this is a syncronous action creator.
export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type : actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId : id,
        orderData : orderData
    };
};

//this is a syncronous action creator.
export const purchaseBurgerFail = (error) => {
    return {
        type : actionTypes.PURCHASE_BURGER_FAIL,
        error : error
    };
};

//to set the loading state to "true"
export const purchaseBurgerStart = () => {
    return {
        type : actionTypes.PURCHASE_BURGER_START
    }
}

//this is an Asyncronous action creator.
export const purchaseBurger = ( orderData, token ) => {
    //using Redux-Thunk middleware
    return dispatch => {

        //wrap in the dispatch, so that the "action" returned by the "purchaseBurgerStart" is
        //dispatched to the store.
        dispatch(purchaseBurgerStart());

        //code from ContactData container.
        axios.post('/orders.json?auth=' + token, orderData)
            .then(response => {
                
                //we don't have router argument, though, we could pass router argument as well through
                //parameter, but we will handle it differently.

                //To redirect to the initial page after a successful order.
                //But here on this page, we won't able to get the "history" property because this component
                // "ContactData" is loaded with "render" method of <Route> component in the "Checkout.js"
                //so to get the history property in this component, we have two ways:
                //1, we can wrap this component "ContactData" with this "WithRouter()" helper method
                //2. We can pass the history and so on by passing the props inside the render() method
                //while loading the ContactData component inside the Checkout component.
                
                //this.props.history.push('/');
                
                dispatch(purchaseBurgerSuccess(response.data.name, orderData));
            })
            .catch(error => {
                //this.setState({loading: false })
                dispatch(purchaseBurgerFail(error));
            });
    }
}

export const purchaseInit = () => {
    return{
        type : actionTypes.PURCHASE_INIT
    }
};

export const fetchOrdersSuccess = (orders) => {
    console.log(orders);
    return {
        type : actionTypes.FETCH_ORDERS_SUCCESS,
        orders : orders
    }
}

export const fetchOrdersFail= (error) => {
    return {
        type : actionTypes.FETCH_ORDERS_FAIL,
        error : error
    }
}

export const fetchOrdersStart = () => {
    return {
        type : actionTypes.FETCH_ORDERS_START
    }
}

//async code constant for Fetch Orders.
export const fetchOrders = (token, userId) => {

    //we can also have a second argument here as well name as -> getState
    //which we can use to get the access of the state.
    //return (dispatch, getState) => {}

    return dispatch => {

        dispatch(fetchOrdersStart());

        //auth, orderBy, these are keywords, which firebase uses, so keep them as it is.
        //double quotes with this query param , text and value because its a steing value.
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';

        //get the code from Orders.js to fetch the Order data with Axios.
        axios.get('/orders.json' + queryParams)
            .then(res => {

                const fetchedOrders = [];
                console.log(res.data);
                //For Redux Transforming data -> we are doing it here, because I am transforming the data,
                //which I am getting back, I don't put this one into the reducers, because if I ever change,
                //the backend data I would have to change my reducer, but in this case I would change the 
                //action, so thats why we can put our data formation change kind of thing in our
                //action creators.

                //we are not getting array, but we are getting some objects.
                //so turn the Orders object into the array
                for(let key in res.data){
                    fetchedOrders.push({
                        ...res.data[key],
                        id : key
                    });
                }
                
                //won't set the state, instead dispatch the other action 
                //this.setState({loading : false, orders : fetchedOrders})

                dispatch(fetchOrdersSuccess(fetchedOrders));
            })
            .catch( err => {
                //this.setState({loading : false})
                dispatch(fetchOrdersFail(err));
            })
    }
}


//===Delete the Order===

export const deleteOrderStart = () => {
    return {
        type : actionTypes.DELETE_ORDER_START
    }
}

export const deleteOrderSuccess = (orderId) => {
    return {
        type : actionTypes.DELETE_ORDER_SUCCESS,
        orderId : orderId
    }
}

export const deleteOrderFail= (error) => {
    return {
        type : actionTypes.DELETE_ORDER_FAIL,
        error : error
    }
}

//async code constant for delete Order.
export const deleteOrder = (token, orderId) => {
    return dispatch => {
        dispatch(deleteOrderStart());

        const queryParams = '?auth=' + token;

        axios.delete('/orders/' + orderId + ".json" + queryParams)
            .then(res => {
                //remove the order from the
                dispatch(deleteOrderSuccess(orderId));
            })
            .catch( err => {
                //this.setState({loading : false})
                dispatch(fetchOrdersFail(err));
            })
    };
}


//===Show Contact Infor for the particular Order===

export const showContactInfoStart = () => {
    return {
        type : actionTypes.ORDER_CONTACT_INFO_START
    }
}

export const showContactInfoSuccess = (orderContactData) => {
    return {
        type : actionTypes.ORDER_CONTACT_INFO_SUCCESS,
        orderContactData : orderContactData
    }
}

export const showContactInfoFail= (error) => {
    return {
        type : actionTypes.ORDER_CONTACT_INFO_FAIL,
        error : error
    }
}

export const showContactInfo = (token, orderId) => {


    return (dispatch, getState) => {
        dispatch(showContactInfoStart());
        const orderData = getState().order.orders.find(i => i.id === orderId).orderData;
        dispatch(showContactInfoSuccess(orderData));

        // const queryParams = '?auth=' + token;

        // //get the code from Orders.js to fetch the Order data with Axios.
        // axios.get('/orders/' + orderId + ".json" + queryParams)
        //     .then(res => {
        //         dispatch(showContactInfoSuccess(res.data.orderData));
        //     })
        //     .catch( err => {
        //         //this.setState({loading : false})
        //         dispatch(showContactInfoFail(err));
        //     })
    }
}