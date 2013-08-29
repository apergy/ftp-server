var assert = require('chai').assert,
    sinon  = require('sinon'),
    Server = require('../script/Server');

suite('Server', function () {
    setup(function () {
        sinon.spy(Server.prototype, 'initialize');
        this.server = new Server();
    });

    teardown(function () {
        Server.prototype.initialize.restore();
    });

    test('can be instantiated', function () {
        assert.isFunction(Server);
        assert.isObject(this.server);
    });

    suite('#initialize()', function () {
        test('should be called on instantiation', function () {
            assert.ok(Server.prototype.initialize.called);
        });
    });
});