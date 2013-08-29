var assert = require('chai').assert,
    sinon  = require('sinon'),
    EventEmitter = require('events').EventEmitter,
    Router = require('../script/Router');

suite('Router', function () {
    setup(function () {
        this.commands = {
            user: function () {}
        };

        sinon.spy(EventEmitter.prototype, 'on');
        this.connection = new EventEmitter;

        sinon.spy(Router.prototype, 'initialize');
        sinon.spy(Router.prototype, 'parse');
        sinon.spy(Router.prototype, 'route');
        this.router = new Router({ incoming: this.connection, commands: this.commands });
    });

    teardown(function () {
        EventEmitter.prototype.on.restore();
        Router.prototype.initialize.restore();
        Router.prototype.parse.restore();
        Router.prototype.route.restore();
    });

    test('can be instantiated', function () {
        assert.isFunction(Router);
        assert.isObject(this.router);
    });

    test('attaches router directly to instance', function () {
        assert.equal(this.router.commands, this.commands);
    });

    suite('#initialize()', function () {
        test('should be called on instantiation', function () {
            assert.ok(Router.prototype.initialize.called);
        });

        test('listens on incoming connection data', function () {
            assert.ok(EventEmitter.prototype.on.calledWith('data'));
        });

        test('attempts to route any incoming data', function () {
            this.connection.emit('data', 'USER Joe Bloggs');
            assert.ok(Router.prototype.route.calledWith('USER Joe Bloggs'));
        });
    });

    suite('#parse()', function () {
        test('returns request parameters', function () {
            var expected = { command: 'user', data: 'Joe Bloggs' };
            assert.deepEqual(this.router.parse('USER Joe Bloggs'), expected);
        });
    });

    suite('#route()', function () {
        test('incoming request should get parsed', function () {
            this.connection.emit('data', 'USER Joe Bloggs');
            assert.ok(Router.prototype.parse.calledWith('USER Joe Bloggs'));
        });

        test('attempts to call the related command', function () {
            sinon.spy(this.commands, 'user');
            this.connection.emit('data', 'USER Joe Bloggs');
            assert.ok(this.commands.user.calledWith('Joe Bloggs'));
            this.commands.user.restore();
        });
    });
});
