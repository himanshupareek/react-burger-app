import React, {Component} from 'react';
//receive the data from redux, and after import, wrap our export with it.
import { connect } from 'react-redux';

import Aux from '../../hoc/NewAux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
//starting with lower case, becase we are not gonna use it in the JSX code.
//because withErrorHandler doesn't qualify as a component.
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

//import * as actionTypes from '../../store/actions';

//one central file, from where we can import.
//even we can omit the index.js file here, because it will automatically pick the index file.
import * as actions from '../../store/actions/index';

//Global constants normally in Capital letters.
//moving these into Reducers
// const INGREDIENT_PRICES = {
//     salad : 0.5,
//     cheese : 0.4,
//     meat : 1.3,
//     bacon: 0.7
// }

//For the testing purpose we can put "export" class to this container.
//by adding "export" keyword to this class, we can define it as "named export"
export class BurgerBuilder extends Component
{

    // constructor(props)
    // {
    //     super(props);
    //     this.state = {...}
    // }

    //object, not an array
    state = {

        //so now, every where we used ingredients, we will use ings.
        //so we can remove the local state - ingredients.
        //ingredients : null,

        //while going for totalPrice state with Redux, we can go with these two approaches.
        // because price changes, whenever we add or remove the ingredients, we can define a new action TYpe
        //called as "updatePrice", then can bind this in Dispatch with a new property, on BurgerBuilder component
        //so with this approach, we are insure that every action is taking care of one property in the state.
        //second approach, we have got two actions, one is add and second is remove, and price can be manage
        //from both of these two actions only, so we can also update the price along with ingredients in the state.
        
        //totalPrice : 4,
        
        //below these four states, look like "Local UI state", which we may manage with Redux, but
        //we should not do with Redux, its not very cool thing to do the "Local UI states" with Redux.

        //we don't need this state as well, we can manage it by directly returning the boolean value
        //in the updatePurchaseState method, instead of updating the State.
        //purchaseable:false,
        
        purchasing : false

        // ,loading : false,
        // error : false
    }

    //getting ingredients from firebase, and this is managing now into burgerBuilder action class.
    componentDidMount () {
        // axios.get('https://react-my-burger-2ff45.firebaseio.com/ingredients.json')
        //         .then(response => {
        //             this.setState({ingredients : response.data});
        //         })
        //         .catch( error => {
        //             this.setState({error : true});
        //         })

        this.props.onInitIngredients();
    }

    //this will not work correctly with normal function syntax.
    // purchaseHandler(){
    //     this.setState({purchasing: true});
    // }

    purchaseHandler = () => {
        if(this.props.isAuthenticated){
            this.setState({purchasing: true});
        }
        else{
            this.props.onSetAuthRedirectPath('/checkout');
            //"history" is from 'React-router' 
            this.props.history.push('/auth');
        }
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    //we will pass the ingredients through Redux, instead of Query Params.
    // purchaseContinueHandler = () => {
        
        

    //     //this.props.history.push('/checkout');

    //     const queryParams = [];

    //     for(let i in this.state.ingredients){
    //         //encodeURIComponent -> by JS -> encodes the elements in such a way, that they can be
    //         //used in the url, this is relevant for WhiteSpace and so on.
    //         queryParams.push(encodeURIComponent(i) + '=' + 
    //                         encodeURIComponent(this.state.ingredients[i]));
    //     }
    //     queryParams.push('price=' + this.props.price);
    //     const queryString = queryParams.join('&');
    //     this.props.history.push({
    //         pathname: '/checkout',
    //         search: '?' + queryString
    //     })

    // }

    purchaseContinueHandler = () => {
        this.props.onPurchaseInit();
        this.props.history.push('/checkout');
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
                    .map( (igKey) => {
                        return ingredients[igKey];
                    })
                    .reduce((sum, el) => {
                        return sum + el;
                    },0)
        
        //we are just calling this method from JSX code with () paranthisis                     
        //this.setState({purchaseable: sum > 0});

        return sum > 0;
    }

    // addIngredientHandler= (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount + 1;

    //     //create a new for the sake of immuatability
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updatedCount;

    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.props.price;
    //     const newPrice = oldPrice + priceAddition;

    //     this.setState({ totalPrice : newPrice, ingredients : updatedIngredients})
    //     this.updatePurchaseState(updatedIngredients);
    // }

    // removeIngredientHandler = (type) =>{
    //     const oldCount = this.state.ingredients[type];
        
    //     if(oldCount <= 0)
    //     {
    //         return;
    //     }

    //     const updatedCount = oldCount -1;
    //     const updatedIngredients = {...this.state.ingredients};
    //     updatedIngredients[type] = updatedCount;

    //     const priceSubtraction = INGREDIENT_PRICES[type];
    //     const oldPrice = this.props.price;
    //     const newPrice = oldPrice - priceSubtraction;

    //     this.setState({ingredients : updatedIngredients, totalPrice : newPrice});
    //     this.updatePurchaseState(updatedIngredients);
    // }

    render(){
        //to enable-disable the each LESS button
        const disabledInfo = {
            //we are removing local state of "ingredients", and will use Redux global Props
            //...this.state.ingredients
            ...this.props.ings
        }

        for(let key in disabledInfo)
        {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        //can't have same name as the variable declared above as -> OrderSummary
        //otherwise will get the error.

        let orderSummary = null;
        
        //making this change, because we are fetching the ingredients now from the web.
        //and till the time, we didn't get the data, we should show the spinner.
        let burger = this.props.error ? <p> Ingredients can't be loaded </p> : <Spinner />

        if(this.props.ings)
        {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls 
                        // ingredientAdded= {this.addIngredientHandler}
                        // ingredientRemoved= {this.removeIngredientHandler}

                        //but these functions need arguments. "ingName", 
                        //and its calling actually from BuildControl component.
                        ingredientAdded= {this.props.onIngredientAdded}
                        ingredientRemoved= {this.props.onIngredientRemoved}

                        //if we are not using this state, then we can directly call the function, and 
                        //then calling the function immediately, because this method returning value, 
                        //not updating any state
                        
                        // purchaseable={this.state.purchaseable}

                        purchaseable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                        price={this.props.price}
                        disabled = {disabledInfo}
                        isAuth = {this.props.isAuthenticated}/>
                </Aux>
            );

            orderSummary = <OrderSummary 
                            ingredientSummary={this.props.ings} 
                            purchaseCancel={this.purchaseCancelHandler}
                            purchaseContinue={this.purchaseContinueHandler}
                            price={this.props.price}
                            />;
        }

        //now required, because we are not doing anything async, while showing the model.
        
        // if(this.state.loading){
        //     orderSummary = <Spinner />
        // }
        
        return (
            <Aux>
                <Modal 
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}>

                    {orderSummary}
                    
                </Modal>
                
                {burger}
            </Aux>
        );
    }
}

//it holds a function, which receive the state automatically, and which returns the JS object, where
//we define which property defines which slice of state.

//fetch the Global states (which we defined through Reducers)
const mapStateToProps = state => {
    return {

        //so now, every where we used ingredients, we will use ings.
        //so we can remove the local state - ingredients.
        //THESE RIGHT HAND VALUES ARE GETTING THROUGH REDUCER FILES

        //here, we are having burgerBuilder, becuase now we are having combined reducers, and setting
        //is done in index.js main file
        ings : state.burgerBuilder.ingredients,
        price : state.burgerBuilder.totalPrice,
        error : state.burgerBuilder.error,
        isAuthenticated : state.auth.token != null
    }
};

//holds a function, which receives "dispatch" function as an argument, and returns object of props 
//funciton mapping in this case.
const mapDispatchToProps = dispatch  => {
    return {
        //now instead of dispatching the actions directly, do it with action creators.
        
        // onIngredientAdded : (ingName) => dispatch({ type: actionTypes.ADD_INGREDIENT , ingredientName : ingName}),
        // onIngredientRemoved : (ingName) => dispatch({ type: actionTypes.REMOVE_INGREDIENT , ingredientName : ingName})

        onIngredientAdded : (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved : (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onPurchaseInit: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath : (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

//wrapped the BurgerBuilder with custom component.
//so now we have a reusable higher order component, which we can wrap around any component which 
//uses Axios to handle the errors.

//we can wrap as many component which is already wrapped by another component. No Issue.
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));