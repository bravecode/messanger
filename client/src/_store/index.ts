import { configureStore } from '@reduxjs/toolkit';
import rootSaga from './ducks/rootSaga';

// Reducers
import auth from './ducks/auth/reducer';
import socket from './ducks/socket/reducer';
import relationship from './ducks/relationship/reducer';

// Middlewares
import sagaMiddleware from './middlewares/saga';

const store = configureStore({
    reducer: {
        auth,
        socket,
        relationship,
    },
    middleware: [
        sagaMiddleware
    ],
});

sagaMiddleware.run(rootSaga)

export type IStore = ReturnType<typeof store.getState>

export default store;
