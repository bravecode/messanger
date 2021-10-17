import { createAction } from '@reduxjs/toolkit';
import { TypesGameScore } from '_services/types';

// Action - Start Game
export const startGame = createAction('game:startGame');

// Action - Update Game Score
export const updateGameScore = createAction<TypesGameScore>('game:updateGameScore');