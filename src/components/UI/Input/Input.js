import React from 'react';

import classes from './Input.css';

const input = (props) => {

    let inputElement = null;
    const inputClasses= [classes.InputElement];

    //because our drop-down doesn't have any validation rule yet, so to satisfy that conditions as well,
    //we can check with one more property -> shouldValidate.
    //set the "invalid" class only if the user-input is touched.
    if(props.invalid && props.shouldValidata && props.touched){
        inputClasses.push(classes.Invalid);
    }

    //React 16 -> React does not recognize the `inputType` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `inputtype` instead.
    // switch  (props.inputtype) {
    switch  (props.elementType) {
        case ('input') :
            inputElement = <input 
                                className={inputClasses.join(' ')} 
                                {...props.elementConfig} 
                                value = {props.value} 
                                onChange={props.changed}/>;
            break;
        case ('textarea') :
            // asa a side note, textarea is a self closing input element in the React
            inputElement = <textarea 
                                className={inputClasses} 
                                {...props.elementConfig} 
                                value={props.value} 
                                onChange={props.changed}/>;
            break;
        case ('select') :
            // we need to create our option in between the select tags
            //and for that, we will wrap this with normal paranthisis, so that we can write multiline
            //jsx code 

            //however, I checked that even if we don't wrap it with parantisis, it works well.
            inputElement = (<select 
                                className={inputClasses} 
                                {...props.elementConfig} 
                                value={props.value} 
                                onChange={props.changed}>
                                {props.elementConfig.options.map(option => (
                                    <option 
                                        value= {option.value}
                                        key={option.value} 
                                    >
                                        {option.displayValue}
                                    </option>

                                ))}
            </select>);
            break;
        default :
            inputElement = <input 
                                className={inputClasses} 
                                {...props.elementConfig} 
                                value={props.value} 
                                onChange={props.changed}/>;
            break;
    }
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
}

export default input;