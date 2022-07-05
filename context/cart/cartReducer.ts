import { CartState } from '.';
import { ICartProduct } from '../../interfaces/cart';

type CartActionType = 
    | { type: 'CART_LOAD_FROM_COOKIES', payload: ICartProduct[] }
    | { type: 'CART_UPDATE_PRODUCTS', payload: ICartProduct[] }
    | { type: 'CART_CHANGE_PRODUCTS_QUANTITY', payload: ICartProduct }

export const cartReducer = (state: CartState, action: CartActionType): CartState => {
    switch (action.type) {
        case 'CART_LOAD_FROM_COOKIES':
            return {
               ...state,
               cart: [ ...action.payload ],
            };

        case 'CART_UPDATE_PRODUCTS':
            return {
               ...state,
               cart: [ ...action.payload ],
            };

        case 'CART_CHANGE_PRODUCTS_QUANTITY':
            return {
               ...state,
               cart: state.cart.map(product => {
                if(product._id !== action.payload._id) return product;
                if(product.size !== action.payload.size) return product;
                return action.payload;
               })
            };

        default:
            return state;
    }
};