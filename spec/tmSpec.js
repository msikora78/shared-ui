describe('3rd Party Libs', function(){

    it("includes JSON", function(){
        expect(JSON).toBeTruthy();
        var obj = {key:"val"};
        var objStr = JSON.stringify(obj);
        expect(objStr).toBe('{"key":"val"}');
        var objPar = JSON.parse(objStr);
        expect(objPar.key).toBe("val");
    });

    it("includes jQuery", function() {
        expect(jQuery).toBeTruthy();
        expect($).toBe(jQuery);
        expect($("#missingElement").length).toBe(0);
    });

    it("includes _ (underscore.js)", function() {
        expect(_).toBeTruthy();
        expect(_.isBoolean(true)).toBe(true);
    });

});

describe('Global objects', function(){

    it('include "namespace()" method to create or ensure existence of an object heirarchy', function() {
        expect(namespace).toBeDefined();

        namespace('x.y.z');
        expect(x.y['z']).toEqual({});
    });

    it('include "resolveObject()" method that interprets namespace strings', function(){
        expect(resolveObject).toBeDefined();

        namespace('a.b.c');
        var a_b = resolveObject('a.b');
        expect(a_b['c']).toEqual({});
    });

    it('include "sys" (deprecated?)', function(){
        expect(window.sys).not.toBeUndefined();
        expect(sys).not.toBeNull();
    });

    it('include "tm"', function(){
        expect(window.tm).not.toBeUndefined();
        expect(tm).not.toBeNull();
    });

});

describe('namespace "sys"', function(){

    it('enables pseudo class inheritance', function(){
        var klass1 = function(){};
        klass1.prototype.getVal = function(){
            return "myval";
        };
        var klass2 = function(){};

        sys.inherits(klass2, klass1);

        var inst1 = new klass1();
        var inst2 = new klass2();
        expect(inst1.getVal()).toBe("myval");
        expect(inst2.getVal()).toBe("myval");
        expect(klass2.superclass).toBe(klass1.prototype);
    });

    it('extends object properties', function(){
        // alias for _.extend
        expect(sys.extend).toBe(_.extend);

        var objA = { key1: 'val1'};
        var objB = { key2: 'val2'};
        sys.extend(objA, objB);
        expect(objA.key1).toBe("val1");
        expect(objA.key2).toBe("val2");
        expect(objB.key1).toBeUndefined();
    });

});

describe('namespace "tm"', function(){

    it('combines object properties into a new object', function(){
        var objA = { key1: 'val1'};
        var objB = { key1: null, key2: 'val2'};
        var objAB = tm.combine(objA, objB);
        expect(objAB.key1).toBe("val1");
        expect(objAB.key2).toBe("val2");
        expect(objA.key2).toBeUndefined();
        expect(objB.key1).toBeNull();
    });

});
