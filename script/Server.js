var _ = require('underscore');

var Server = function (options) {
    this.initialize.apply(this, arguments);
};

_.extend(Server.prototype, {
    /**
     * Attaches listener for incoming connections
     *
     * @param  {Object} options
     */
    initialize: function (options) {
        options.incoming.on('error', this.error);
        options.incoming.on('connection', this.handle);
    },

    /**
     * Logs the error to the console
     *
     * @param  {Error} error
     */
    error: function (error) {
        console.log('Server Error:', error);
    },

    /**
     * Handles the incoming connection
     *
     * @param  {Socket} socket
     */
    handle: function (socket) {}
});

module.exports = Server;
