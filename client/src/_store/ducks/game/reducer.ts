import { createReducer } from "@reduxjs/toolkit";
import { logoutSuccess } from "../auth/actions";
import { updateGameScore, getGameInfoError, getGameInfoRequest, getGameInfoSuccess, startGame } from "./actions";

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
        .addCase(getGameInfoRequest, (state) => {
            state.pending = true;
            state.errors = undefined;
            state.score = defaultScore;
        })
        .addCase(getGameInfoSuccess, (state, { payload }) => {
            state.pending = false;
            state.score = payload;
        })
        .addCase(getGameInfoError, (state, { payload }) => {
            state.pending = false;
            state.errors = payload;
        })
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