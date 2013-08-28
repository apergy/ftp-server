var _ = require('underscore');

var Router = function (options) {
    if (options.incoming) this.incoming = options.incoming;
    this.initialize.apply(this, arguments);
};

_.extend(Router.prototype, {

    initialize: function () {
        this.incoming.on('data', this.route.bind(this));
    },

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
