/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useReducer, useRef } from 'react';
import Cookie from 'js-cookie';
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

    // Si el carrito esta en cookies, actualizo el state
    useEffect(() => {
        try {
            const cookieCart = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!) : [];
            dispatch({ type: 'CART_LOAD_FROM_COOKIES', payload: cookieCart });
        } catch (error) {
            dispatch({ type: 'CART_LOAD_FROM_COOKIES', payload: [] });
        }
    }, [])

    // Graba en cookies el carrito
    const isCartReloading = useRef(true);
    useEffect(() => {
        if (isCartReloading.current) {
            isCartReloading.current = false;
        } else {
            Cookie.set('cart', JSON.stringify(state.cart));
        }
    }, [state.cart])

    useEffect(() => {
        const numberOfItems = state.cart.reduce((prev, current) => current.quantity + prev, 0);
        const subtotal = state.cart.reduce((prev, current) => (current.price * current.quantity) + prev, 0);
        const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);

        const orderSummary = {
            numberOfItems,
            subtotal,
            tax: subtotal * taxRate,
            total: subtotal * (taxRate + 1),
        }
        console.log(orderSummary);
    }, [state.cart])

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

    const updateCartQuantity = (product : ICartProduct) => {
        dispatch({ type: 'CART_CHANGE_PRODUCTS_QUANTITY', payload: product })
    }

    const removeCartProduct = (product : ICartProduct) => {
        dispatch({ type: 'REMOVE_PRODUCT_IN_CART', payload: product })
    }

    return (
        <CartContext.Provider value={{
            ...state,

            // Methods
            addProductToCart,
            updateCartQuantity,
            removeCartProduct,
        }}>
            { children }
        </CartContext.Provider>
    )
};