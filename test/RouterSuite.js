var assert = require('chai').assert,
    sinon  = require('sinon'),
    EventEmitter = require('events').EventEmitter,
    Router = require('../script/Router');

suite('Router', function () {
    setup(function () {
        sinon.spy(EventEmitter.prototype, 'on');
        this.connection = new EventEmitter;

        sinon.spy(Router.prototype, 'parse');
        sinon.spy(Router.prototype, 'route');
        this.router = new Router({ incoming: this.connection });
    });

    teardown(function () {
        EventEmitter.prototype.on.restore();
        Router.prototype.parse.restore();
        Router.prototype.route.restore();
    });

    suite('#initialize()', function () {
        test('listens on incoming connection data', function () {
            assert.ok(EventEmitter.prototype.on.calledWith('data'));
        });

        test('attempts to route any incoming data', function () {
            this.connection.emit('data', 'USER admin');
            assert.ok(Router.prototype.route.calledWith('USER admin'));
        });
    });

    suite('#parse()', function () {
        test('returns request parameters', function () {
            assert.deepEqual(this.router.parse('command data'), ['command', 'data']);
        });
    });

    suite('#route()', function () {
        test('incoming request should get parsed', function () {
            this.connection.emit('data', 'USER admin');
            assert.ok(Router.prototype.parse.calledWith('USER admin'));
        });
    });
});
