var assert = require('chai').assert,
    sinon  = require('sinon'),
    EventEmitter = require('events').EventEmitter,
    Server = require('../script/Server');

suite('Server', function () {
    setup(function () {
        sinon.spy(EventEmitter.prototype, 'on');
        this.connection = new EventEmitter;

        sinon.spy(Server.prototype, 'initialize');
        sinon.spy(Server.prototype, 'handle');
        this.server = new Server({
            incoming: this.connection
        });
    });

    teardown(function () {
        EventEmitter.prototype.on.restore();
        Server.prototype.initialize.restore();
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

        test('attempts to handle a connection', function () {
            var fakeConnection = sinon.spy();
            this.connection.emit('connection', fakeConnection);
            assert.ok(Server.prototype.handle.calledWith(fakeConnection));
        });
    });
});