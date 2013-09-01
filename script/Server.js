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
        options.incoming.on('connection', this.handle);
    },

    /**
     * Handles the incoming connection
     *
     * @param  {String} request
     */
    handle: function () {}
});

module.exports = Server;