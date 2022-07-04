import { CartState } from '.';
import { ICartProduct } from '../../interfaces/cart';

type CartActionType = 
    | { type: 'CART_LOAD_FROM_COOKIES', payload: ICartProduct[] }
    | { type: 'CART_UPDATE_PRODUCTS', payload: ICartProduct[] }

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

        default:
            return state;
    }
};