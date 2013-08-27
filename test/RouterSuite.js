var assert = require('chai').assert,
    sinon  = require('sinon'),
    EventEmitter = require('events').EventEmitter,
    Router = require('../script/Router');

suite('Router', function () {
    setup(function () {
        sinon.spy(EventEmitter.prototype, 'on');
        this.connection = new EventEmitter;

        sinon.spy(Router.prototype, 'route');
        this.router = new Router({ incoming: this.connection });
    });

    teardown(function () {
        this.connection.on.restore();
        Router.prototype.route.restore();
    });

    test('recieves an incoming connection', function () {
        assert.equal(this.router.incoming, this.connection);
    });

    test('listens on incoming connection data', function () {
        assert.ok(EventEmitter.prototype.on.calledWith('data'));
    });

    test('attempts to route any incoming data', function () {
        this.connection.emit('data', 'mock');
        assert.ok(Router.prototype.route.calledWith('mock'));
    });
});
