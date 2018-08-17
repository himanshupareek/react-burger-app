import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../NewAux';

//Modal -> show, only when there is error, and this will come from WrappedComponent, that it did fell, 
//and for that we will need second argument that is - axios, so that we can set a global error handler.
//and to use that instance, convert into class based component.
const withErrorHandler = ( WrappedComponent, axios ) => {
    //its an anonymous class because we are never using this class, we are just returning it.
    //its a class factory actually, where class doesn't matter much, but render() method matters most.
    return class extends Component {

        state = {
            error : null
        }

        //in thsi function, we can set our axios listeners.
        //and can set our global interceptors.

        //ComponentDidMount will always called after the child components are mounted, so that we are never set our
        //interceptors, before all of the children are rendered.

        //But ComponentWillMount will be called before the child components are rendered, and we are not
        //causing side effects here. we are just registering the interceptors.(see the notes and diagram of lifeCycle hooks)

        //componentDidMount() {
        componentWillMount() {
            //clear the error state on the "Request".
            this.reqInterceptor =  axios.interceptors.request.use(req =>{
                this.setState({error : null});
                return req;
            })
            
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error : error});
            });
        }

        //so here, we will remove the interceptors, which are not in use anymore.
        //this will be the case, when if we are using any component, and then it will load/unload again
        //with routing, then we should remove the things which we don't want to use further, to
        //to prevent the memory leak.
        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmationHandler = ()  => {
            this.setState({error : null});
        }

        render() {
            return (
                <Aux>
                    <Modal 
                        show={this.state.error}
                        //modalClosed -> This property is using into Modal.js file for Backdrop component.
                        modalClosed={ this.errorConfirmationHandler } >
                        {this.state.error ? this.state.error.message : null}
                    </Modal>

                    {/* //make sure you are not manipulating the  */}
                    {/* {...this.props}, it means -> pass-on the props as you get them don't do anything else with them */}
                    <WrappedComponent {...this.props} />
                </Aux>
            )
        }
    }
}

export default withErrorHandler;