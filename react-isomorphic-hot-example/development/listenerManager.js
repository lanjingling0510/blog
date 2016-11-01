class ListenerManager {
    constructor(listener, name) {
        this.name = name || 'listener';
        this.lastConnectionKey = 0;
        this.connectionMap = {};
        this.listener = listener;
        // Track all connections to our server so that we can close them when needed.
        this.listener.on('connection', (connection) => {
            console.log('app connections.');
            // Generate a new key to represent the connection
            const connectionKey = this.lastConnectionKey + 1;
            // Add the connection to our map.
            this.connectionMap[connectionKey] = connection;
            // Remove the connection from our map when it closes.
            connection.on('close', () => {
                delete this.connectionMap[connectionKey];
            });
        });
    }

    killAllConnections() {
        Object.keys(this.connectionMap).forEach((connectionKey) => {
            this.connectionMap[connectionKey].destroy();
        });
    }

    dispose() {
        return new Promise((resolve) => {
            if (this.listener) {
                this.killAllConnections();

                console.log('💔  Destroyed all existing connections.');

                this.listener.close(() => {
                    this.killAllConnections();

                    console.log('💔  Closed server.');
                    resolve();
                });

            } else {
                resolve();
            }
        });
    }
}

module.exports = ListenerManager;
