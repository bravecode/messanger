import { createReducer } from "@reduxjs/toolkit";
import { makeGameAction } from "./actions";

// Game State for active conversation
export interface IGameState {
    score?: IGameScore;
    currentGame?: IGameCurrentGame;
    pending: boolean;
    errors?: string[];
}

export interface IGameScore {
    yourScore: number;
    foeScore: number;
}

export interface IGameCurrentGame {
    status: TGameStatus;
    yourChoice?: string;
}

export type TGameStatus = 'none' | 'your_move' | 'foe_move' | 'done';

const defaultState: IGameState = {
    currentGame: undefined,
    score: undefined,
    pending: false,
    errors: undefined
}

export default createReducer(defaultState, (builder) => {
    builder
        .addDefaultCase(() => {})
})