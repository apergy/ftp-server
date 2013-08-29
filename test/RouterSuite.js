var assert = require('chai').assert,
    sinon  = require('sinon'),
    EventEmitter = require('events').EventEmitter,
    Router = require('../script/Router');

suite('Router', function () {
    setup(function () {
        this.routes = {
            user: function () {}
        };

        sinon.spy(EventEmitter.prototype, 'on');
        this.connection = new EventEmitter;

        sinon.spy(Router.prototype, 'parse');
        sinon.spy(Router.prototype, 'route');
        this.router = new Router({ incoming: this.connection, routes: this.routes });
    });

    teardown(function () {
        EventEmitter.prototype.on.restore();
        Router.prototype.parse.restore();
        Router.prototype.route.restore();
    });

    test('attaches router directly to instance', function () {
        assert.equal(this.router.routes, this.routes);
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
            var expected = { command: 'user', data: 'admin' };
            assert.deepEqual(this.router.parse('USER admin'), expected);
        });
    });

    suite('#route()', function () {
        test('incoming request should get parsed', function () {
            this.connection.emit('data', 'USER admin');
            assert.ok(Router.prototype.parse.calledWith('USER admin'));
        });

        test('attempts to call the related command', function () {
            sinon.spy(this.routes, 'user');
            this.connection.emit('data', 'USER admin');
            assert.ok(this.routes.user.calledWith('admin'));
            this.routes.user.restore();
        });
    });
});
