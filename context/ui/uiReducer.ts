import { UiState } from '.';

type UiActionType = 
    | { type: 'UI_TOGGLE_MENU' }

export const uiReducer = (state: UiState, action: UiActionType): UiState => {
    switch (action.type) {
        case 'UI_TOGGLE_MENU':
            return {
               ...state,
               isMenuOpen: !state.isMenuOpen
            };

        default:
            return state;
    }
};