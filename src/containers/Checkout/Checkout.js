import React, {Component} from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    //no need of state now, as we are handling this through Redux.
    // state = {
    //     ingredients :null,
    //     totalPrice : 0
    // }

    //no need to use ComponentDidUpdate or anything like that, because whenever I load this component,
    //it will mount itself, there is no way I can route to it without it being mounted again, because 
    //its not nested or anything like thagt.

    //if we will use ComponentDidMount, then we will get one error, because we have "ingredients" state 
    //as null initially, and we are setting its value inside this lifecycle hook method, and before setting
    //this, we are rendering the child components.
    //so we will use ComponentWillMount lifecycle hook.

    //componentDidMount(){
    
    //we will no longer use ComponentWillMount() function ro get the query params, but use REdux to get.

    //can set the state prior to render the children
    // componentWillMount() {
    //     //exztract query parameter
    //     //search is set as query parameter inside the BurgerBuilder.js
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredts = {};
    //     let price = 0;
    //     for(let param of query.entries()){
    //         if(param[0] === 'price'){
    //             price = param[1];
    //         }
    //         else{
    //             //handle key, value parameters
    //             ingredts[param[0]] = +param[1];
    //         }
    //     }

    //     this.setState({ingredients : ingredts, totalPrice: price});
    // }

    checkoutCancelledHandler = () => {
        //because Checkout component is loaded with Route Component, so it will aslo have route properties
        //like -> history, match etc..
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render(){

        let summary = <Redirect to="/" />
        if(this.props.ings) {

            const purchasedRedirect = this.props.purchased ? <Redirect to ="/" />  : null;

            summary = 
                (
                    <div>
                        
                        {purchasedRedirect}

                        <CheckoutSummary 
                            ingredients={this.props.ings}
                            checkoutCancelled={this.checkoutCancelledHandler}
                            checkoutContinued={this.checkoutContinuedHandler}
                        />

                    
                        <Route 
                        path={this.props.match.path + '/contact-data'} 

                        //won't load the component directly like this way component={ContactData}, because we also 
                        //need to pass the state object.

                        //so we will use this approach "render", where we can pass the props manually in JSX form

                        //also, passing props, so that we can use the history and other property inside the ContactData component
                        
                        //now we don't need to pass the state data to ContactData component in this way, because we are
                        //able to handle this with Redux, so we are commenting it out, and we are also commenting the 
                        //state.totalPrice, because we are using it only here.

                        // render={ (props) => (<ContactData 
                        //                         ingredients={this.state.ingredients} 
                        //                         price = {this.state.totalPrice} 
                        //                         {...props} />)}

                        //thanks to Redux, we can use it in the simplest form instead of in "render" form.
                        component = {ContactData}
                    />
                </div>);
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        //here we will map our "state", store in Redux Store to the "props" of this container.

        //left hand side can be any name, but here on right hand side, we have to have this name,
        //because we have set it into our reducer.js file.
        ings : state.burgerBuilder.ingredients,
        purchased : state.order.purchased
        //,price : state.burgerBuilder.totalPrice

    }
}

// now we don't need to map dispatch to prop here, because we are not actually dispatching anything into
// this container.

//here becuase we are not setting mapDispatchToProp, so we are not passing, but in any case, if are having
//only mapDispatch and not haing mapState, then we have to pass first argument as "null" and then we
//should pass the second argument.
export default connect(mapStateToProps)(Checkout);