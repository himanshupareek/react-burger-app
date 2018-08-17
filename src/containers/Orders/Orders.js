import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner  from '../../components/UI/Spinner/Spinner';
import classes from './Orders.css';

import Button from '../../components/UI/Button/Button';

import Aux from '../../hoc/NewAux';
import Modal from '../../components/UI/Modal/Modal';

class Orders extends Component{

    state = {
        showContactInfo : false
    }

    //can use, because I only want to fetch the orders when it is loaded, there is no way to go there
    //without reMounting it, so ComponentDidUpdate is not I am looking for.
    componentDidMount(){
        this.props.onFetchOrders(this.props.token, this.props.userId);
    };

    deleteHandler = (orderId) => {
        this.props.onDeleteOrder(this.props.token, orderId);
    }

    showContactInfoHandler = (orderId) => {
        this.setState({ showContactInfo : true });
        this.props.onShowContactInfo(this.props.token, orderId);
    }

    hideContactInfoHandler = () => {
        this.setState({ showContactInfo : false });
    }

    render(){

        let orders = <Spinner />;
        let contactSummary =  null;

        if(!this.props.loading) {
            
            if(this.props.orders.length <= 0){
                orders = <p className={classes.Orders}> You don't have any order yet. </p>
            }
            else {
                //because its not wrapped any HTML element, we can omit the initial paranthisis "(" for JSX code.
                orders = this.props.orders.map(order =>(
                    <Order 
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price}
                        //passing parameter to the even handler method, 
                        //passing by this way as Arrow funciton, it won't call the function immediately, otherwise
                        //otehrwise, if we pass the parameter directly without Arrow method, this would have called method instantly.
                        onDelete={ () => { this.deleteHandler(order.id) }}
                        contactData = {order.orderData}
                        onShowContactInfo= { () => { this.showContactInfoHandler(order.id) }}
                        onHideContactInfo = {this.hideContactInfoHandler}
                        showContactModel = {this.state.showContactInfo}
                        />
                ) )
            }
            
            let contactData = null;
            
            if(this.props.orderData)
            {
                contactData = Object.keys(this.props.orderData)
                .map((contactKey) => {
                    return (
                        <li 
                            key={contactKey}>
                            <span style={{textTransform:'capitalize'}}>
                                <b>{contactKey}</b>
                            </span>
                            : {this.props.orderData[contactKey]}
                        </li>
                    )
                });
            }
                
            contactSummary = (
            <Aux>
                <h3>Contact Info for this order is as below:</h3>
                {contactData}
                <p className={classes.ContactSummary}>
                <Button btnType="Danger" clicked= {this.hideContactInfoHandler}>CLOSE</Button>
                </p>
            </Aux>
            )


        }

        return (
            <div>
                <Modal
                    show={this.state.showContactInfo}
                    modalClosed={this.hideContactInfoHandler} >
                        {contactSummary}
                </Modal>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        //order is the reducer here.
        orders : state.order.orders,
        loading : state.order.loading,
        token : state.auth.token,
        userId : state.auth.userId,
        orderData : state.order.orderData
    }
}

//here dispatch is the action(method)
const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders : (token, userId) => dispatch(actions.fetchOrders(token, userId)),
        onDeleteOrder : (token, orderId) => dispatch(actions.deleteOrder(token, orderId)),
        onShowContactInfo : (token, orderId) => dispatch(actions.showContactInfo(token, orderId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));