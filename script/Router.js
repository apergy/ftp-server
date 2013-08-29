var _ = require('underscore');

var Router = function () {
    this.initialize.apply(this, arguments);
};

_.extend(Router.prototype, {
    /**
     * Attaches listener for incoming requests
     *
     * @param  {Object} options
     */
    initialize: function (options) {
        options.incoming.on('data', this.route.bind(this));
    },

    /**
     * Parses an incoming request into logical pieces
     *
     * @param  {String} request
     * @return {Array}
     */
    parse: function (request) {
        return request.split(' ');
    },

    /**
     * Routes the incoming request
     *
     * @param  {String} request
     */
    route: function (request) {
        request = this.parse(request);
    }
});

module.exports = Router;
