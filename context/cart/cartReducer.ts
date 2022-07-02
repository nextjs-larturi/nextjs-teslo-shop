import { CartState } from '.';
import { ICartProduct } from '../../interfaces/cart';

type CartActionType = 
    | { type: 'CART_LOAD_FROM_COOKIES', payload: ICartProduct[] }
    | { type: 'CART_ADD_PRODUCT', payload: ICartProduct }

export const cartReducer = (state: CartState, action: CartActionType): CartState => {
    switch (action.type) {
        case 'CART_LOAD_FROM_COOKIES':
            return {
               ...state,
            };

        case 'CART_ADD_PRODUCT':
            return {
               ...state,
            };

        default:
            return state;
    }
};