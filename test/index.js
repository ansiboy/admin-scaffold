const { describe } = require("mocha");
const { getVirtualPaths } = require("../index");
const assert = require("assert");
const path = require("path");
const { pathConcat } = require("maishu-toolkit");
describe("test", function () {
    it("getVirtualPaths", function () {
        var r = getVirtualPaths();
        assert.ok(r != null);
        assert.ok(r["/application.tsx"] != null);
    })

    it("getVirtualPaths1", function () {
        var r = getVirtualPaths("/static");
        assert.ok(r != null);
        assert.ok(r["/static/application.tsx"] != null);
    })

    it("getVirtualPaths2", function () {
        var r = getVirtualPaths("/static", path.join(__dirname, "static"));
        assert.ok(r != null);
        assert.ok(r["/static/init.ts"] != null);
        assert.strictEqual(r["/static/init.ts"], path.join(__dirname, "static/init.ts"));
    })
})