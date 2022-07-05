import {createContext} from 'react';
import { ICartProduct } from '../../interfaces';

interface ContextProps {
    cart: ICartProduct[];

    // Mehtods
    addProductToCart: (product: ICartProduct) => void;
    updateCartQuantity: (product: ICartProduct) => void;
}

export const CartContext = createContext<ContextProps>({} as ContextProps);
