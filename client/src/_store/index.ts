import { configureStore } from '@reduxjs/toolkit';
import rootSaga from './ducks/rootSaga';

// Reducers
import auth from './ducks/auth/reducer';
import socket from './ducks/socket/reducer';
import relationship from './ducks/relationship/reducer';
import search from './ducks/search/reducer';
import conversations from './ducks/conversations/reducer';
import messages from './ducks/messages/reducer';

// Middlewares
import sagaMiddleware from './middlewares/saga';

const store = configureStore({
    reducer: {
        auth,
        socket,
        relationship,
        search,
        conversations,
        messages
    },
    middleware: [
        sagaMiddleware
    ],
});

sagaMiddleware.run(rootSaga)

export type IStore = ReturnType<typeof store.getState>

export default store;
