var expect       = require('chai').expect,
    EventEmitter = require('events').EventEmitter,
    Router       = require('../script/Router');

describe('Router', function () {
    var router = new Router({ incoming: EventEmitter });

    it('should recieve an incoming connection', function () {
        expect(router.incoming).to.equal(EventEmitter);
    });
})
