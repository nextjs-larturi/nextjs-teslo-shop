import {createContext} from 'react';
import { ICartProduct } from '../../interfaces';

interface ContextProps {
    isLoaded: boolean;
    cart: ICartProduct[];
    numberOfItems: number;
    subtotal: number;
    tax: number;
    total: number;

    // Mehtods
    addProductToCart: (product: ICartProduct) => void;
    updateCartQuantity: (product: ICartProduct) => void;
    removeCartProduct: (product: ICartProduct) => void;
}

export const CartContext = createContext<ContextProps>({} as ContextProps);
