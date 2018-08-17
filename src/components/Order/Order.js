import React from 'react';
import classes from './Order.css';
import Button from '../UI/Button/Button';

import Aux from '../../hoc/NewAux';
import Modal from '../UI/Modal/Modal';
import ContactSummary from './ContactSummary/ContactSummary';

const order = (props) => {

    //because ingredients are object, and we need array to loop through each, and we can use the 
    //way which we used into Burger.js component (transformedIngredients), 

    //but we will do in some other way.
    const ingredients = [];

    for(let ingredientName in props.ingredients){
        ingredients.push({
            name : ingredientName, 
            amount : props.ingredients[ingredientName]
        });
    }

    const ingredientOutput = ingredients.map(ig => {
        return <span 
                    style={{
                        textTransform: 'capitalize',
                        display: 'inline-block',
                        margin: '0 8px',
                        border: '1px solid #ccc',
                        padding: '5px'
                    }}
                    key={ig.name}
                    > {ig.name} ({ig.amount}) </span>;
    })

    

    // const contactSummary = <ContactSummary 
    //         contactSummary = {props.contactData}
    //         closeContactSummary={props.onHideContactInfo}
    //     // ingredientSummary={this.props.ings} 
    //     // purchaseCancel={this.purchaseCancelHandler}
    //     // purchaseContinue={this.purchaseContinueHandler}
    //     // price={this.props.price}
    //     />;

    let orderSummary = null;

    orderSummary =  
                    <Aux>
                        <div className={classes.Order}>
                            <p>Ingredients : {ingredientOutput}</p>
                            {/* toFixed works only with number, and here price is string, so we can conver it with following way
                            Number.parseFloat() method ,
                            Or other way is when we are passing this from Orders component, we can pass it with converting to number with
                            a '+' sign before that */}
                            {/* <p>Price : <strong> USD {+props.price).toFixed(2)} </strong></p> */}
                            <p>Price : <strong> USD {Number.parseFloat(props.price).toFixed(2)} </strong></p>
                            <Button btnType="Danger" clicked={props.onDelete}>DELETE</Button>
                            <Button btnType="Success" clicked={props.onShowContactInfo}>CONTACT INFO</Button>
                            {/* <Button btnType="Danger" >DELETE</Button> */}
                        </div>
                    </Aux>
    
    return (

        <Aux>
            

            {orderSummary}
            
        </Aux>
    );
};

export default order;