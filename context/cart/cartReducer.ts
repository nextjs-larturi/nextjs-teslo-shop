import { CartState } from '.';
import { ShippingAddress } from '../../interfaces';
import { ICartProduct } from '../../interfaces/cart';

type CartActionType = 
    | { type: 'CART_LOAD_FROM_COOKIES', payload: ICartProduct[] }
    | { type: 'CART_UPDATE_PRODUCTS', payload: ICartProduct[] }
    | { type: 'CART_CHANGE_PRODUCTS_QUANTITY', payload: ICartProduct }
    | { type: 'REMOVE_PRODUCT_IN_CART', payload: ICartProduct }
    | { type: 'CART_LOAD_ADDRESS_FROM_COOKIES', payload: ShippingAddress }
    | { type: 'UPDATE_ADDRESS', payload: ShippingAddress }
    | { 
        type: 'UPDATE_ORDER_SUMMARY', 
        payload: {
            numberOfItems: number;
            subtotal: number;
            tax: number;
            total: number;
        } 
      }
    | { type: 'CART_ORDER_COMPLETE' }

export const cartReducer = (state: CartState, action: CartActionType): CartState => {
    switch (action.type) {
        case 'CART_LOAD_FROM_COOKIES':
            return {
               ...state,
               isLoaded: true,
               cart: [ ...action.payload ],
            };

        case 'UPDATE_ADDRESS':
        case 'CART_LOAD_ADDRESS_FROM_COOKIES':
            return {
               ...state,
               shippingAddress: action.payload
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

        case 'REMOVE_PRODUCT_IN_CART':
            return {
               ...state,
               cart: state.cart.filter( product => !(product._id === action.payload._id && product.size === action.payload.size))
            };

        case 'UPDATE_ORDER_SUMMARY':
            return {
               ...state,
               ...action.payload
            };

        case 'CART_ORDER_COMPLETE':
            return {
               ...state,
               cart: [],
               numberOfItems: 0,
               subtotal: 0,
               tax: 0,
               total: 0
            };

        default:
            return state;
    }
};