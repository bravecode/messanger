export {
    connect,
    disconnect
}

function connect() {
    // Note: Move API urls to .env file to make it env specific (good practice).
    const URL = 'ws://localhost:8000/ws/123?v=1.0';

    const socket = new WebSocket(URL)

    return new Promise((resolve) => {
        socket.addEventListener('open', () => {
            console.log('User connected');

            resolve('');
        });
    });
}

function disconnect() {

}