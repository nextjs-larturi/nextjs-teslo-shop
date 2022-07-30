import Cookies from 'js-cookie';
import { FC, useReducer, useEffect } from 'react';
import axios from 'axios';
import { tesloApi } from '../../api';
import { IUser, UserRegistered } from '../../interfaces';
import { AuthContext, authReducer } from './';

export interface AuthState {
    isLoggedIn: boolean;
    user?: IUser;
}

const AUTH_INITIAL_STATE: AuthState = {
    isLoggedIn: false,
    user: undefined,
}

interface Props {
    children: React.ReactNode;
}

export const AuthProvider:FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);

    useEffect(() => {
        checkToken();
    }, []);

    const checkToken = async () => {

        if(Cookies.get('token') === undefined) return;

        try {
            const { data } = await tesloApi.get('/user/validate-token');
            const { token, user } = data;
            Cookies.set('token', token);
            dispatch({ type: 'AUTH_LOGIN', payload: user });
        } catch (error) {
            Cookies.remove('token');
        }

    }
    

    const login = async (email: string, password: string): Promise<boolean> => {
        try {
            const { data } = await tesloApi.post('/user/login', { email, password });
            const { token, user } = data;
            Cookies.set('token', token);
            dispatch({ type: 'AUTH_LOGIN', payload: user });
            return true;
        } catch (error) {
            return false;
        }
    }

    const registerUser = async (name: string, email:string,  password: string): Promise<UserRegistered> => {
        try {
            const { data } = await tesloApi.post('/user/register', { name, email, password });
            const { token, user } = data;
            Cookies.set('token', token);
            dispatch({ type: 'AUTH_LOGIN', payload: user });
            return {
                hasError: false,
            }
        } catch (error) {
            if(axios.isAxiosError(error)) {
                const { message } = error.response?.data as {message : string}
                return {
                    hasError: true,
                    message
                }
            }

            return {
                hasError: true,
                message: 'No se pudo crear el usuario. Intente nuevamente.'
            }
        }
    }

    return (
        <AuthContext.Provider value={{
            ...state,

            // Methods
            login,
            registerUser,
        }}>
            { children }
        </AuthContext.Provider>
    )
};