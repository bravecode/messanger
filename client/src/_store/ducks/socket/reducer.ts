import { createReducer } from "@reduxjs/toolkit"
import { connectError, connectRequest, connectSuccess, disconnectRequest, disconnectSuccess } from "./actions";

export interface ISocketState {
    readonly connection?: WebSocket;
    readonly connected: boolean;
    readonly pending: boolean;
}

const defaultState: ISocketState = {
    connection: undefined,
    connected: false,
    pending: false
}

export default createReducer(defaultState, (builder) => {
    builder
        .addCase(connectRequest, (state) => {
            state.connected = false;
            state.pending = true;
        })
        .addCase(connectSuccess, (state, { payload }) => {
            state.connection = payload;
            state.connected = true;
            state.pending = false;
        })
        .addCase(connectError, (state) => {
            state.pending = false;
        })
        .addCase(disconnectRequest, (state) => {
            state.pending = true;
        })
        .addCase(disconnectSuccess, () => {
            return defaultState;
        })
        .addDefaultCase(() => {})
});