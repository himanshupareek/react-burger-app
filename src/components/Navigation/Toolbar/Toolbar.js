import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolBar = (props) => (

    <header className={classes.Toolbar}>
        <DrawerToggle clicked={props.drawerToggleClicked} />
        {/* To use Css class, which we override into its css file, we are wrapping the Logo component inside a div */}
        {/* Even, we could do with css inline style, as style = {{height: props.heightValue}}, but we are using the below
        approach, which is better, because we are having different different css classes, and we can do it without
        impacting the others. */}
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems isAuthenticated={props.isAuth}/>
        </nav>

    </header>
);

export default toolBar;