import React from 'react';

//CSS Loaders -> The styles are copied from this web-link
//https://projects.lukehaas.me/css-loaders/
import classes from './Spinner.css'

const spinner = ()  => (
    <div className={classes.Loader}>Loading...</div>
);

export default spinner;