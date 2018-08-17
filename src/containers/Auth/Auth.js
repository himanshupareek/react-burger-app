import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import { updateObject, checkValidity } from '../../shared/utility';

class Auth extends Component {
    
    //just the local react state, not using Redux state, because we will use userName and password only
    //on this container.
    state = {
        controls : {
            email: {
                elementType : 'input',
                elementConfig : {
                    type : 'email',
                    placeholder : 'Mail Address'
                },
                value : '',
                //unlike, Angular, React doesn't have auto validation rules, but we can do it on own.
                validation:{
                    required: true,
                    isEmail : true,

                },
                valid: false,
                touched:false
            },
            password: {
                elementType : 'input',
                elementConfig : {
                    type : 'password',
                    placeholder : 'Password'
                },
                value : '',
                //unlike, Angular, React doesn't have auto validation rules, but we can do it on own.
                validation:{
                    required: true,
                    minLength : 6
                },
                valid: false,
                touched:false
            }
        },
        isSignup : true
    }
    
    componentDidMount() {
        //that means we are trying to redirect to the 'checkout' page, even if we are not building burger.
        if(!this.props.buildingBurger && this.props.authRedirectPath !== '/'){
            this.props.onSetAuthRedirectPath();
        }
    }

    inputChangedHandler =(event, controlName) => {
        // const updatedControls = {
        //     //copy all of the controls first, then change into the control for whcih we are handling 
        //     //input change event
        //     ...this.state.controls,
        //     [controlName] : {
        //         ...this.state.controls[controlName],
        //         value: event.target.value,
        //         valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
        //         touched: true
        //     }
        // };

        //here we could use the nestedUpateObject too..
        const updatedControlName = updateObject(this.state.controls[controlName],
                                        {
                                            value: event.target.value,
                                            valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                                            touched: true
                                        });

        const updatedControls = updateObject(this.state.controls, 
                                    {
                                        [controlName] : updatedControlName
                                    })

        this.setState({
            controls : updatedControls
        })
    }

    submitHandler = (event) => {
        //prevent the page to reload.
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    }

    switchAuthModeHandler = () => {
        this.setState( (prevState) => {
            return { isSignup : !prevState.isSignup};
        })
    }

    render() {

        //convert object into Array.
        const formElementsArray = [];
        for(let key in this.state.controls){
            formElementsArray.push({
                id : key,
                config : this.state.controls[key]
            })
        }

        let form = formElementsArray.map(formElement => (
            //we now have dynamically generated set of inputs
            <Input 
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid} 
                shouldValidata = {formElement.config.validation}
                touched = {formElement.config.touched}
                changed={(event) => this.inputChangedHandler(event, formElement.id)} 
                />

        ));

        if(this.props.loading) {
            form = <Spinner />
        }

        let errorMessage = null;
        if(this.props.error){
            errorMessage = (
                //"message" is the property of "error" object from FireBase.
                <p style={{color : 'red'}}>{this.props.error.message}</p>
            )
        }

        let authRedirect = null;
        //if Authenticated, then redirect to home page.
        if(this.props.isAuthenticated){
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }

        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                {this.state.isSignup ? 'SignUp Page' : 'SignIn Page'}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button 
                    btnType="Danger"
                    clicked={this.switchAuthModeHandler}
                    >SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}</Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        //auth -> because of combinedReducers in the index.js main file.
        loading : state.auth.loading,
        error : state.auth.error,
        isAuthenticated : state.auth.token != null,
        buildingBurger : state.burgerBuilder.building,
        authRedirectPath : state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        //call this property from this container, when we submit the form.
        //as my auth() function needs email and password, so pass these two as parameters.
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        //as if we will call this action from this page, then we will always want to redirect it to the Home page.
        onSetAuthRedirectPath : () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);