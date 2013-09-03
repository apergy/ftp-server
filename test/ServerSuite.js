var assert = require('chai').assert,
    sinon  = require('sinon'),
    EventEmitter = require('events').EventEmitter,
    Server = require('../script/Server');

suite('Server', function () {
    setup(function () {
        sinon.spy(EventEmitter.prototype, 'on');
        this.connection = new EventEmitter;

        sinon.spy(Server.prototype, 'initialize');
        sinon.stub(Server.prototype, 'error');
        sinon.spy(Server.prototype, 'handle');
        this.server = new Server({
            incoming: this.connection
        });
    });

    teardown(function () {
        EventEmitter.prototype.on.restore();
        Server.prototype.initialize.restore();
        Server.prototype.error.restore();
        Server.prototype.handle.restore();
    });

    test('can be instantiated', function () {
        assert.isFunction(Server);
        assert.isObject(this.server);
    });

    suite('#initialize()', function () {
        test('should be called on instantiation', function () {
            assert.ok(Server.prototype.initialize.called);
        });

        test('listens on incoming connection', function () {
            assert.ok(EventEmitter.prototype.on.calledWith('connection'));
        });

        test('listens for any errors', function () {
            assert.ok(EventEmitter.prototype.on.calledWith('error'));
        });
    });

    suite('#error()', function () {
        test('recieves a connection error', function () {
            var fakeError = sinon.spy();
            this.connection.emit('error', fakeError);
            assert.ok(Server.prototype.error.calledWith(fakeError));
        });
    });

    suite('#handle()', function () {
        test('recieves an incoming connection', function () {
            var fakeConnection = sinon.spy();
            this.connection.emit('connection', fakeConnection);
            assert.ok(Server.prototype.handle.calledWith(fakeConnection));
        });
    });
});
