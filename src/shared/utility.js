//here we are doing this to make our switch cases of Reducres more linear and compact.

//its a named export, so we need a curly braces, where ever we will import it.
export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

//if we are exporting like this, then we can import this class in following way (without curly braces):

//export default updateObject;

//import updateObject  from '../utility';


//using same logic in both Auth and ContactData container.
export const checkValidity = (value, rules) => {
    let isValid = true;

    //we put isValid, with each condition, so that all rules should be satisfied otherwise it will be invalid.
    if(rules.required){
        isValid = value.trim() !== '' && isValid;
    }

    if(rules.minLength){
        isValid = value.length >= rules.minLength && isValid;
    }

    if(rules.maxLength){
        isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid
    }

    if (rules.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid
    }

    return isValid;
}