//group the exports
//one central file, from where we can import.

//to trigger the actions from the outside.

export {
    addIngredient,
    removeIngredient,
    initIngredients   
} from './burgerBuilder';

export {
    purchaseBurger,
    purchaseInit,
    fetchOrders,
    deleteOrder,
    showContactInfo
} from './order';

//bundle all of my exports from the action folder

export {
    auth,
    logout,
    setAuthRedirectPath,
    authCheckState
} from './auth';