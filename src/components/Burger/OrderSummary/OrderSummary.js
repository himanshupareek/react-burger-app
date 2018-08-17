import React, { Component } from 'react';
import Aux from '../../../hoc/NewAux';
import Button from '../../UI/Button/Button';


//we are converting this function component to the class component, because we need to look into the 
//lifeCycle hooks, and that can work only with Class components (stateful)
//and we are looking for the lifeCycle hooks for this component, because we know that this component is
//wrapped with Modal component (inside the BurgerBuilder component), 
//and we don't want to make change into this component, if the Modal is hidden.
//so thats why looking for the lifeCycle hooks for this component.

//this could be a functional component as well, because we are checking shouldComponentUpdate() inside the
//Modal component, but we created as a class component, because we wanted to see the console.log inside
//componentWillUpdate() lifeCycle hook.
class OrderSummary extends Component {

    //implment method to see, when does this update.
    //we are able to see on the console that, when we are clicking Less or More button, then each time this
    //component is re-rendering though we are not showing it, (because modal is not shown till the time).

    componentWillUpdate(){
    }

    render(){

        const ingredientSummary = Object.keys(this.props.ingredientSummary)
                            .map((igKey) => {
                                // style={{}} -> inner curly braces is the JS object
                                // when we are returning JSX of multiple lines, then we can wrap it with () brackets.
                                return (
                                        <li key={igKey}>
                                            <span style={{textTransform: 'capitalize'}}>
                                                {igKey}
                                            </span>
                                            : {this.props.ingredientSummary[igKey]}
                                        </li>
                                );
                            })

        return (
            <Aux>
                <h3> Your Order </h3>
                <p> A deliciour burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                {/* Make sure btnType value match with Button.css value, its case sensitive*/}
                <Button btnType="Danger" clicked={this.props.purchaseCancel}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinue}>CONTINUE</Button>
            </Aux>
        );
    }
}


export default OrderSummary;