import { FC, useReducer, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession, signOut } from 'next-auth/react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { tesloApi } from '../../axiosApi';
import { IUser, UserRegistered } from '../../interfaces';
import { AuthContext, authReducer } from './';

export interface AuthState {
   isLoggedIn: boolean;
   user?: IUser;
}

const AUTH_INITIAL_STATE: AuthState = {
   isLoggedIn: false,
   user: undefined,
};

interface Props {
   children: React.ReactNode;
}

export const AuthProvider: FC<Props> = ({ children }) => {
   const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);
   const router = useRouter();

   const { data, status } = useSession();

   useEffect(() => {
      if (status === 'authenticated') {
         // console.log(data?.user);
         dispatch({
            type: 'AUTH_LOGIN',
            payload: data?.user as IUser,
         });
      }
   }, [status, data]);

   const checkToken = async () => {
      if (Cookies.get('token') === undefined) return;

      try {
         const { data } = await tesloApi.get('/user/validate-token');
         const { token, user } = data;
         Cookies.set('token', token);
         dispatch({ type: 'AUTH_LOGIN', payload: user });
      } catch (error) {
         Cookies.remove('token');
      }
   };

   const login = async (email: string, password: string): Promise<boolean> => {
      try {
         const { data } = await tesloApi.post('/user/login', {
            email,
            password,
         });
         const { token, user } = data;
         Cookies.set('token', token);
         dispatch({ type: 'AUTH_LOGIN', payload: user });
         return true;
      } catch (error) {
         return false;
      }
   };

   const registerUser = async (
      name: string,
      email: string,
      password: string
   ): Promise<UserRegistered> => {
      try {
         const { data } = await tesloApi.post('/user/register', {
            name,
            email,
            password,
         });
         const { token, user } = data;
         Cookies.set('token', token);
         dispatch({ type: 'AUTH_LOGIN', payload: user });
         return {
            hasError: false,
         };
      } catch (error) {
         if (axios.isAxiosError(error)) {
            const { message } = error.response?.data as { message: string };
            return {
               hasError: true,
               message,
            };
         }

         return {
            hasError: true,
            message: 'No se pudo crear el usuario. Intente nuevamente.',
         };
      }
   };

   const logout = () => {
      Cookies.remove('cart');
      Cookies.remove('fistName');
      Cookies.remove('lastName');
      Cookies.remove('address');
      Cookies.remove('zip');
      Cookies.remove('city');
      Cookies.remove('country');
      Cookies.remove('phone');

      signOut();
   };

   return (
      <AuthContext.Provider
         value={{
            ...state,

            // Methods
            login,
            logout,
            registerUser,
         }}
      >
         {children}
      </AuthContext.Provider>
   );
};
