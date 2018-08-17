import React from 'react';

// so by importing this image, we are making aware the webpack about this image, so it will take care on bundling.

//this is the path only
import burgerLogo from '../../assets/images/burger-logo.png';

import classes from './Logo.css';

const logo = (props) => (
    <div className={classes.Logo}>
        {/* This won't work on production, because webpack will bundle everything, and that time, we might not
        be able to find out the path this way, so we have to import the path in this, and then only
        can use it. 
        so by importing this image, we are making aware the webpack about this image, so it will take care on bundling.*/}
        
        {/* <img src="../../assets/images/burger-logo.png" /> */}

        <img src={burgerLogo} alt="MyBurger" />


    </div>
);

export default logo;