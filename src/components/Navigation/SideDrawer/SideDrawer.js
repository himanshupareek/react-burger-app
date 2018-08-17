import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import BackDrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/NewAux';

const sideDrawer = (props) => {

    //we are writing some logic to hide or show the SidwDrawer based on some conditions, so thats why
    //we have {} syntax instead of () in our component, because we are writing some logic before returning
    //the jsx (with the help of return() statement)

    let attachedClasses = [classes.SideDrawer, classes.Close];
    if(props.open){
        //because we are reassigning some values, thats why we didn't use const above, because const
        //can't be changed once its value is assigned. so we used let keyword here.
        attachedClasses = [classes.SideDrawer, classes.Open];
    }

    //Because, we need to handle, sideDrawer OnClick function, which do show/hide the backdrop, and
    //for that, we could change this component into stateful container (into class), but
    // But, we will also trigger the sideDrawer from the ToolBar at the end, because there we have the menu
    // button, so at the end, we will need to have a connection between the toolbar to sidedrawer, and we have
    //that connection already, that is in the Layout.js, where we are having both -> Toolbar and SideDrawer.
    //so, it is better to convert the Layout comonent into the class component,
    //so that we can listen to both the sideDrawer from closing itself by clicking on the BackDrop
    //as well as the ToolBar opening the SideDrawer by clicking on the Toggle button.
    
    return(

        <Aux>
            {/* show : Its a boolean value, so no need to assign the value */}
            <BackDrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')} onClick={props.closed}>
                {/* To use Css class, which we override into its css file, we are wrapping 
                the Logo component inside a div */}

                {/* Even, we could do with css inline style, as style = {{height: props.heightValue}}, 
                but we are using the below approach, which is better, because we are having different 
                different css classes, and we can do it without impacting the others. */}

                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuthenticated={props.isAuth}/>
                </nav>
            </div>
        </Aux>
    );
}

export default sideDrawer;