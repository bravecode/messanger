import { configureStore } from '@reduxjs/toolkit';

// Reducers
import auth from './ducks/auth/reducer';
import authSaga from './ducks/auth/saga';

// Middlewares
import sagaMiddleware from './middlewares/saga';

const store = configureStore({
    reducer: {
        auth
    },
    middleware: [
        sagaMiddleware
    ],
});

sagaMiddleware.run(authSaga)

export type IStore = ReturnType<typeof store.getState>

export default store;
