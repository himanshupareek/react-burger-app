import React, { Component } from 'react';
import classes from './Modal.css';
import Aux from '../../../hoc/NewAux';
import Backdrop from '../Backdrop/Backdrop';

//make sure that Modal is not updated most of the time.
//we will see, that if we can control the update of orderSummary, which is wrap by the modal,
//by changing the way the modal itself update.
class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState){
        //make sure that this only update if prop "show" changes

        //here we are also checking that whether children (OrderSummary's spinner or other case) are also changed 
        return nextProps.show !== this.props.show 
                || nextProps.children !== this.props.children; 

    }

    componentWillUpdate(){
    }

    render(){
        return (
            <Aux>
                <Backdrop show={this.props.show}  clicked={this.props.modalClosed}/>
                <div 
                    className={classes.Modal}
                    style={{
                        //show-hide the modal, based on the show property.
                        //vh -viewportHeight
                        transform : this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity : this.props.show ? '1' : '0'
                    }}
                >
                    {this.props.children}
                </div>
            </Aux>
        );
    }
}

export default Modal;