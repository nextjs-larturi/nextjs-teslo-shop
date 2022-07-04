import { FC, useReducer } from 'react';
import { CartContext, cartReducer } from './';
import { ICartProduct } from '../../interfaces/cart';

export interface CartState {
    cart: ICartProduct[];
}

const CART_INITIAL_STATE: CartState = {
    cart: []
}

interface Props {
    children: React.ReactNode;
}

export const CartProvider:FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

    const addProductToCart = (product: ICartProduct) => {

        // Verifico que exista un producto con el id
        const productInCart = state.cart.some(p => p._id === product._id);
        if(!productInCart) return dispatch({ 
            type: 'CART_UPDATE_PRODUCTS', 
            payload:  [...state.cart, product]
        });

        // Evaluo la talla
        const productInCartWithDifferentSize = state.cart.some(p => p._id === product._id && p.size === product.size);
        if(!productInCartWithDifferentSize) return dispatch({ 
            type: 'CART_UPDATE_PRODUCTS', 
            payload:  [...state.cart, product]
        });

        // Caso en que el producto existe con la misma talla, por lo que hay que acumularlo
        const updatedProducts = state.cart.map( p => {
            if(p._id !== product._id) return p;
            if(p.size !== product.size) return p;

            // Actualizar cantidad
            p.quantity += product.quantity;
            return p;
        });

        return dispatch({ 
            type: 'CART_UPDATE_PRODUCTS', 
            payload: updatedProducts
        });
    }

    return (
        <CartContext.Provider value={{
            ...state,

            // Methods
            addProductToCart,
        }}>
            { children }
        </CartContext.Provider>
    )
};