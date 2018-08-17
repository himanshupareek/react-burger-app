import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './components/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

//for lazy loading..
const asyncCheckout = asyncComponent( () => {
  return import('./containers/Checkout/Checkout');
})

const asyncOrders = asyncComponent( () => {
  return import('./containers/Orders/Orders');
})

const asyncAuth = asyncComponent( () => {
  return import('./containers/Auth/Auth');
})

class App extends Component {

  componentDidMount(){
    this.props.onTryAutoSignUp();
  }

  render() {

    //guard the routes based on authentication.
    let routes = (
      <Switch>
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        {/* //anything unknow, go to the route page */}
        <Redirect to="/" />
      </Switch>
    );

    if(this.props.isAuthenticated){
      routes = (
        <Switch>
            <Route path="/checkout" component={asyncCheckout} />
            <Route path="/orders" component={asyncOrders} />
            <Route path="/logout" component={Logout} />
            <Route path="/auth" component={asyncAuth} />
            <Route path="/" exact component={BurgerBuilder} />
            {/* //anything unknow, go to the route page */}
            <Redirect to="/" />
        </Switch>
      )
    }

    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated : state.auth.token != null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp : () => dispatch(actions.authCheckState())
  }
}

//withRouter -> will inforce your props being passed down to your app comppnents, and now router will work fine
//
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
