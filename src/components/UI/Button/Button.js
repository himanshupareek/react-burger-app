import React from 'react';
import classes from './Button.css';

const button = (props) => (
    <button 
        //array of classes, so joining it with join() method
        className={[classes.Button, classes[props.btnType]].join(' ')}
        onClick={props.clicked}
        disabled={props.disabled}>
        {/* props.children will be useful to show all of the contents which are created with this custom button component. */}
        {props.children}
    </button>
);

export default button;