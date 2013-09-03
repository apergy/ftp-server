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
        this.request = new EventEmitter;

        sinon.spy(Router.prototype, 'initialize');
        sinon.stub(Router.prototype, 'error');
        sinon.spy(Router.prototype, 'parse');
        sinon.spy(Router.prototype, 'route');
        this.router = new Router({ incoming: this.request, commands: this.commands });
    });

    teardown(function () {
        EventEmitter.prototype.on.restore();
        Router.prototype.initialize.restore();
        Router.prototype.error.restore();
        Router.prototype.parse.restore();
        Router.prototype.route.restore();
    });

    test('can be instantiated', function () {
        assert.isFunction(Router);
        assert.isObject(this.router);
    });

    test('attaches commands directly to instance', function () {
        assert.equal(this.router.commands, this.commands);
    });

    suite('#initialize()', function () {
        test('should be called on instantiation', function () {
            assert.ok(Router.prototype.initialize.called);
        });

        test('listens for any errors', function () {
            assert.ok(EventEmitter.prototype.on.calledWith('error'));
        });

        test('listens on incoming request', function () {
            assert.ok(EventEmitter.prototype.on.calledWith('data'));
        });

        test('attempts to route any request data', function () {
            this.request.emit('data', 'USER Joe Bloggs');
            assert.ok(Router.prototype.route.calledWith('USER Joe Bloggs'));
        });
    });

    suite('#error()', function () {
        test('recieves a connection error', function () {
            var fakeError = sinon.spy();
            this.request.emit('error', fakeError);
            assert.ok(Router.prototype.error.calledWith(fakeError));
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
            this.request.emit('data', 'USER Joe Bloggs');
            assert.ok(Router.prototype.parse.calledWith('USER Joe Bloggs'));
        });

        test('attempts to call the related command', function () {
            sinon.spy(this.commands, 'user');
            this.request.emit('data', 'USER Joe Bloggs');
            assert.ok(this.commands.user.calledWith('Joe Bloggs'));
            this.commands.user.restore();
        });
    });
});
