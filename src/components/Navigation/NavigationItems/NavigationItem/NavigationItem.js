import React from 'react';

//Using NavLink, because we want to style the active link, and want to use the default css class -> active
//this class we have in our css file too. if you want to use the different css class name, then
//you have to adjust accordingly.

import {NavLink} from 'react-router-dom';

import classes from './NavigationItem.css';

const navigationItem = (props) => (
    <li className={classes.NavigationItem}>

        
        <NavLink
            to={props.link}

            // Because all of the links start from "/", thats why all of the links are active,
            //so for that we have to put "excat" property
            exact={props.exact}
            //no need to define the class, NavLink automatically determines this.
            //and even we don't need to set it into NavigationItems component.
            // className={props.active ? classes.active : null}

            //but if we don't set the class as active, even though when we check with developer tool,
            //we find that class="active" is set to the element, but still this is not active,
            //because when webpack adjusts the classes, then it adds some hash value to the class name
            //so thats why it can't find the actual class,

            //to let it work, you can add activeClassName property.
            activeClassName={classes.active}
            > 
            {props.children}
        </NavLink>
    </li>
);

export default navigationItem;