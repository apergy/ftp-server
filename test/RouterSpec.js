var assert       = require('chai').assert,
    EventEmitter = require('events').EventEmitter,
    Router       = require('../script/Router');

suite('Router', function () {
    setup(function () {
        this.router = new Router({ incoming: EventEmitter });
    });

    test('should recieve an incoming connection', function () {
        assert.equal(this.router.incoming, EventEmitter);
    });
});
