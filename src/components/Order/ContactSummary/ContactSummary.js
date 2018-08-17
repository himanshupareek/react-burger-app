// import React from 'react';
// import Aux from '../../../hoc/NewAux';
// import Button from '../../UI/Button/Button';
// import classes from './ContactSummary.css';

// const contactSummary = (props) => {
    
//     const test = null;

//     const contactData = Object.keys(props.contactSummary)
//                             .map((contactKey) => {
//                                 return (
//                                     <li 
//                                         key={contactKey}>
//                                         <span style={{textTransform:'capitalize'}}>
//                                             <b>{contactKey}</b>
//                                         </span>
//                                         : {props.contactSummary[contactKey]}
//                                     </li>
//                                 )
//                             });

//     return (
//         <Aux>
//             {'ff' + props.contactSummary.name}

//             <h3>Contact Info for this order is as below:</h3>
//             {contactData}
//             <p className={classes.ContactSummary}>
//                 <Button btnType="Danger" clicked= {props.closeContactSummary}>CLOSE</Button>
//             </p>
//         </Aux>
//     );
    
// }

// export default contactSummary;