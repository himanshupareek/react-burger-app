import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    //convert ingredient object into an array

    //there is a shorter way to do this, which is written in the Order.js component.
    
    //Object.keys, will give array of keys
    let transformedIngredients = Object.keys(props.ingredients)
            .map(igKey => {
                return [...Array(props.ingredients[igKey])]
                        .map((_, i) => {
                            return <BurgerIngredient key={igKey + i} type={igKey} />
                        })
                        
            })
            //as we were not able to check the length of array, even if all of the incredients were 0,
            // at that moment too the length of the array was not 0.
            //reduce function helps in that case.
            .reduce((preVal, currentVal) => {
                return preVal.concat(currentVal);
            }, []);

        
    if(transformedIngredients.length === 0){
        transformedIngredients = <p>Please include some ingredients.</p>
    }

    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    )
}

export default burger;