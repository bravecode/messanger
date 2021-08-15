export {
    connect,
    disconnect
}

function connect(userID: number) {
    // Note: Move API urls to .env file to make it env specific (good practice).
    const URL = `ws://localhost:8000/ws/${userID}?v=1.0`;

    const socket = new WebSocket(URL)

    socket.onerror = function(event) {
        console.error("WebSocket error observed:", event);
    };

    return new Promise((resolve) => {
        socket.addEventListener('open', () => {
            console.log('User connected');

            resolve(socket);
        });
    });
}

function disconnect() {

}