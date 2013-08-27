var _ = require('underscore');

var Router = function (options) {
    if (options.incoming) this.incoming = options.incoming;
    this.incoming.on('data', this.route);
};

_.extend(Router.prototype, {
    route: function () {}
});

module.exports = Router;
