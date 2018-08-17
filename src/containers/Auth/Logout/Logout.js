import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';

//to dispatch the "Logout" action of Redux Auth and redirect to home page after click on LogOut Link
class Logout extends Component {

    //we will just call our dispatch funciton while we enter on this component.
    componentDidMount (){
        this.props.onLogout();
        //now for redirect, we have two different ways:
        //on with be to forward the props of this component, which will be loaded via the router, with ->
        //this.props.onLogout(this.props.history);, //where on this "history" object of the router, we would 
        //have the push method.

        //other way is to redirect declaratively with "Redirect" of "react-router-dom"
        //inside render method -> <Redirect to="/" />
    }

    render () {
        return (
            //while render to this component, just redirect to other component.
            <Redirect to="/" />
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout : () => dispatch(actions.logout())
    }
};

export default connect(null, mapDispatchToProps)(Logout);