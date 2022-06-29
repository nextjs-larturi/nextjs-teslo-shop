import {createContext} from 'react';

interface ContextProps {
    isMenuOpen: boolean;

    // Methods
    toggleSideMenu: () => void;
}

export const UiContext = createContext<ContextProps>({} as ContextProps);
