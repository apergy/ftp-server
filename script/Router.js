var _ = require('underscore');

var Router = function (options) {
    this.routes = options.routes;
    this.initialize.apply(this, arguments);
};

_.extend(Router.prototype, {
    /**
     * Attaches listener for incoming requests
     *
     * @param  {Object} options
     */
    initialize: function (options) {
        options.incoming.on('data', _.bind(this.route, this));
    },

    /**
     * Parses an incoming request into routable pieces
     *
     * @param  {String} request
     * @return {Array}
     */
    parse: function (request) {
        request = request.toString().trim();
        var index = request.indexOf(' ');

        return {
            command: request.slice(0, index).toLowerCase(),
            data: request.slice(index + 1, request.length)
        };
    },

    /**
     * Routes the incoming request to the correct route
     *
     * @param  {String} request
     */
    route: function (request) {
        request = this.parse(request);
        this.routes[request.command].call(this, request.data);
    }
});

module.exports = Router;
