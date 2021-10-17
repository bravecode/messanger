import { createReducer } from "@reduxjs/toolkit";
import { logoutSuccess } from "../auth/actions";
import { updateGameScore, startGame } from "./actions";

export interface IGameState {
    score: IGameScore;
    newGame?: boolean;
    pending?: boolean;
    errors?: string[];
}

export interface IGameScore {
    you: number;
    enemy: number;
}

const defaultScore: IGameScore = {
    you: 0,
    enemy: 0
}

const defaultState: IGameState = {
    score: defaultScore,
    newGame: undefined,
    pending: false,
    errors: undefined
}

export default createReducer(defaultState, (builder) => {
    builder
        .addCase(startGame, (state) => {
            state.newGame = true;
        })
        .addCase(updateGameScore, (state, { payload }) => {
            state.newGame = false;
            state.score.you = payload.you;
            state.score.enemy = payload.foe;
        })
        .addCase(logoutSuccess, () => {
            return defaultState;
        })
        .addDefaultCase(() => {})
});