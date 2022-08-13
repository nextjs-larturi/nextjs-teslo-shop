import { CartState } from '.';
import { ICartProduct } from '../../interfaces/cart';
import { ShippingAddress } from './CartProvider';

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

        default:
            return state;
    }
};