import {createContext} from 'react';
import { IUser, UserRegistered } from '../../interfaces';

interface ContextProps {
    isLoggedIn: boolean;
    user?: IUser;

    // Methods
    login: (email: string, password: string) => Promise<boolean>;
    registerUser: (name: string, email: string, password: string) => Promise<UserRegistered>


}

export const AuthContext = createContext<ContextProps>({} as ContextProps);
