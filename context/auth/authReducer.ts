import { AuthState } from '.';
import { IUser } from '../../interfaces';

type AuthActionType = 
    | { type: 'AUTH_LOGIN', payload: IUser }
    | { type: 'AUTH_LOGOUT' }

export const authReducer = (state: AuthState, action: AuthActionType): AuthState => {
    switch (action.type) {
        case 'AUTH_LOGIN':
            return {
               ...state,
               isLoggedIn: true,
               user: action.payload
            };

        case 'AUTH_LOGOUT':
            return {
               ...state,
               isLoggedIn: false,
               user: undefined
            };

        default:
            return state;
    }
};