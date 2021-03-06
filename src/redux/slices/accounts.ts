import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Account, Accounts } from '../types';

const initialState: Accounts = {};

export const accountsSlice = createSlice({
    name: 'accounts',
    initialState,
    reducers: {
        addAccount: (state, action: PayloadAction<Account>) => {
            return {
                ...state,
                [action.payload.publicKey]: action.payload,
            };
        },

        deleteAccount: (state, action: PayloadAction<string>) => {
            const copyState = { ...state };
            delete copyState[action.payload as keyof Accounts];
            return copyState;
        },
    },
});

export const { addAccount, deleteAccount } = accountsSlice.actions;

export default accountsSlice.reducer;
