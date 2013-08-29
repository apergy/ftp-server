var _ = require('underscore');

var Server = function () {
    this.initialize.apply(this, arguments);
};

_.extend(Server.prototype, {
    initialize: function () {}
});

module.exports = Server;
