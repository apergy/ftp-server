var assert       = require('assert'),
    EventEmitter = require('events').EventEmitter,
    Router       = require('../script/Router');

describe('Router', function () {
    var router = new Router({ incoming: EventEmitter });

    it('should recieve a connection', function () {
        assert.equal(router.incoming, EventEmitter);
    })
})