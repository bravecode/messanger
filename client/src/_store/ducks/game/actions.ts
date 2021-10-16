import { createAction } from '@reduxjs/toolkit';
import { TypesGameScore } from '_services/types';
import { IGameScore } from './reducer';

// Action - Fetch Game Info
export const getGameInfoRequest = createAction<number>('game:getGameInfo:request');
export const getGameInfoSuccess = createAction<IGameScore>('game:getGameInfo:success');
export const getGameInfoError = createAction<string[]>('game:getGameInfo:error');

// Action - Start Game
export const startGame = createAction('game:startGame');

// Action - Update Game Score
export const updateGameScore = createAction<TypesGameScore>('game:updateGameScore');