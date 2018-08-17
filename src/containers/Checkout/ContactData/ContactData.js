import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button  from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import { updateObject, checkValidity } from '../../../shared/utility';

//we are not creating this as a container just because its loaded via routing, but also because
//it manage its own state, specially once we covered forms in React.
class ContactData extends Component {

    state = {
        orderForm: {
            name: {
                elementType : 'input',
                elementConfig : {
                    type : 'text',
                    placeholder : 'Your Name'
                },
                value : '',
                //unlike, Angular, React doesn't have auto validation rules, but we can do it on own.
                validation:{
                    required: true
                },
                valid: false,
                touched:false
            },
            street : {
                elementType : 'input',
                elementConfig : {
                    type : 'text',
                    placeholder : 'Street'
                },
                value : '',
                validation:{
                    required: true
                },
                valid: false,
                touched:false
            },
            zipCode : {
                elementType : 'input',
                elementConfig : {
                    type : 'text',
                    placeholder : 'ZIP Code'
                },
                value : '',
                validation:{
                    required: true,
                    minLength: 5,
                    maxLength: 5,
                    isNumeric: true
                },
                valid: false,
                touched:false
            },
            country : {
                elementType : 'input',
                elementConfig : {
                    type : 'text',
                    placeholder : 'Country'
                },
                value : '',
                validation:{
                    required: true
                },
                valid: false,
                touched:false
            },
            email : {
                elementType : 'input',
                elementConfig : {
                    type : 'email',
                    placeholder : 'Your Email'
                },
                value : '',
                validation:{
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched:false
            },
            deliveryMethod : {
                elementType : 'select',
                elementConfig : {
                    options : [
                        {
                            value: 'fastest', displayValue : 'Fastest'
                        },
                        {
                            value: 'cheapest', displayValue : 'Cheapest'
                        }
                    ]
                },
                value : 'fastest',
                validation: {},
                //we are not using this property though for DropDown, but to diable/enable the
                //button, we have to apply this.
                valid: true
            }
        },
        formIsValid : false
        //managing it via Redux
        //loading : false
    }

    
    //because button is inside the form and by clicking on that it reload the page, thats the default
    //behaviour of the form, and to prevent this, use event.prventDefault.
    orderHandler = (event) => {
        //prvent the request to send.
        event.preventDefault();
        
        
        //get the "value" of form.
        const formData = {};
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }

        const order = {

            //now we are using redux state object here
            ingredients : this.props.ings,
            //to get the total price, we have to pass it from BurgerBuilder along with ingredients to the checkout page

            //now we are using redux state object here
            price: this.props.price ,            
            orderData : formData,
            userId : this.props.userId
        }

        this.props.onOrderBurger(order, this.props.token);

        //.json, is just to use with firebase, and here firebase will automatically create a new 
        //table under the database name as "orders"
        // axios.post('/orders.json', order)
        //     .then(response => {
        //         //to close the modal as well, and because we are showing modal based on state "purchasing"
        //         this.setState({loading: false })

        //         //To redirect to the initial page after a successful order.
        //         //But here on this page, we won't able to get the "history" property because this component
        //         // "ContactData" is loaded with "render" method of <Route> component in the "Checkout.js"
        //         //so to get the history property in this component, we have two ways:
        //         //1, we can wrap this component "ContactData" with this "WithRouter()" helper method
        //         //2. We can pass the history and so on by passing the props inside the render() method
        //         //while loading the ContactData component inside the Checkout component.
        //         this.props.history.push('/');
        //     })
        //     .catch(error => {
        //         this.setState({loading: false })
        //     });
    }

    //to have two way binding for these input controls, we have "value" for each input control.
    //so we need to update the "value" on input changes.
    //with InputIdentifier, we can reach out to our state, get the right element/object, and its value
    //with this InputIdentifier, we can use it to update the value, the problem just is, I can't access 
    //this state "OrderForm" identifier, and update the value, this is not how we mutate the state,
    //instead we have to mutate, immutibily, and we do it with "setState"
    //and for that we will copy the "OrderForm" data.
    inputChangedHandler = (event, inputIdentifier) => {

        //clone the outer most element
        // const updatedOrderForm = {
        //     ...this.state.orderForm
        // };

        //deeply clone the object for fully immutable.
        //now I can safely change the "value" of theupdatedOrderFormElement, because its a clone.
        //in case, only if I need to change the "elementConfig", then I had to clone that as well,
        //but right now I don't need to make change into it, so keeping it as it is.
        // const updatedOrderFormElement = {
        //     ...updatedOrderForm[inputIdentifier]
        // }

            //keep in mind that both the parameters of this function are objects.
        const updatedOrderFormElement = updateObject(
                                        this.state.orderForm[inputIdentifier],
                                        {
                                            value : event.target.value,
                                            valid : checkValidity(event.target.value, this.state.orderForm[inputIdentifier].validation),
                                            touched : true
                                        }
                                    );
        
        const updatedOrderForm = updateObject(
                                    this.state.orderForm, 
                                    {
                                        [inputIdentifier] : updatedOrderFormElement
                                    });

        let formIsValid = true;

        for(inputIdentifier in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({orderForm : updatedOrderForm, formIsValid : formIsValid});
    }

    render(){
        const formElementsArray = [];
        for(let key in this.state.orderForm){
            formElementsArray.push({
                id : key,
                config : this.state.orderForm[key]
            })
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {/* map() method generates a new array basically */}
                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid} 
                        shouldValidata = {formElement.config.validation}
                        touched = {formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}

                {/* //form is having a method onSubmit(), so don't need this clicked event here.*/}
                {/* <Button btnType="Success" clicked = {this.orderHandler}>ORDER</Button> */}

                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );

        if(this.props.loading){
            form = <Spinner />;
        }
        
        return (
            <div className={classes.ContactData}>
                <h4> Enter your contact data </h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        //burgerBuilder and order are combined reducers, and set onto index.js main file of the application.
        ings : state.burgerBuilder.ingredients,
        price : state.burgerBuilder.totalPrice,
        loading : state.order.loading,
        token : state.auth.token,
        userId : state.auth.userId
    }
}


const mapDispatchToProps = dispatch => {
    return {
        //left side : anyName
        onOrderBurger : (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    }
}

//here becuase we are not setting mapDispatchToProp, so we are not passing, but in any case, if are having
//only mapDispatch and not haing mapState, then we have to pass first argument as "null" and then we
//should pass the second argument.

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));