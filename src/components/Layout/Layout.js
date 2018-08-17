import React, {Component} from 'react';
//we are implementing redux in this component, because we want to change the button and funcitonality
//of Authenticate/LogOut in the Navigation component, based on the "token" state, but we can't use redux
//there, because that is a function component, but that component is loading through this class based component
//so we are doing it here.
import {connect} from 'react-redux';

import Aux from '../../hoc/NewAux';
import styles from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

// props can't be access directly inside the stateful component (class component), and for that, we
// can access it with -> this.props
class Layout extends Component {

    state ={
        showSideDrawer : false
    }

    SideDrawerCloseHandler = () => {
        this.setState({showSideDrawer: false})
    }

    sideDrawerToggleHandler = () => {

        //this approach is an issue though, if we are planning to use "state" in "setState", shouldn't do it like this,
        //because asyncronous nature of the "setState", this may show an unexpected output.
        //instead use the funciton form.

        //this.setState({showSideDrawer: !this.state.showSideDrawer})

        //this is the clean way of setting the state, when it depends on the old state.
        this.setState((prevState) => {
            return {showSideDrawer : !prevState.showSideDrawer}
        })
    }

    render(){
        return(
            <Aux>
                <Toolbar 
                    isAuth = { this.props.isAuthenticated }
                    drawerToggleClicked={this.sideDrawerToggleHandler}/>
                <SideDrawer 
                    isAuth = { this.props.isAuthenticated }
                    closed={this.SideDrawerCloseHandler} 
                    open={this.state.showSideDrawer}
                />
                <div className={styles.Content}>
                    {this.props.children}
                </div>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated : state.auth.token !== null
    };
};

export default connect(mapStateToProps)(Layout);