describe('3rd Party Libs', function(){

    it("includes jQuery", function() {
        expect(jQuery).toBeDefined();
        expect($).toBe(jQuery);
        expect($("#missingElement").length).toBe(0);
    });

    it("includes _ (underscore.js)", function() {
        expect(_).toBeDefined();
        expect(_.isBoolean(true)).toBe(true);
    });

});

describe('Global objects', function(){

    it("includes JSON", function(){
        expect(JSON).toBeDefined();
        var obj = {key:"val"};
        var objStr = JSON.stringify(obj);
        expect(objStr).toBe('{"key":"val"}');
        var objPar = JSON.parse(objStr);
        expect(objPar.key).toBe("val");
    });

    it("includes console.log", function(){
        expect(console.log).toBeDefined();
    });

    it("includes tm", function(){
        expect(tm).toBeDefined();
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

    it('detects iOS device', function(){
        var isIOS = false;
        var ua = navigator.userAgent;
        if (ua.indexOf("iPhone") >= 0 || ua.indexOf("iPod") >= 0 || ua.indexOf("iPad") >= 0){
            isIOS = true;
        }
        expect(tm.iOS).toBe(isIOS);
    });

    it('detects hi resolution displays', function(){
        var isHiRes = false;
        var dpr = window.devicePixelRatio;
        if (dpr && dpr >= 2){
            isHiRes = true;
        }
        expect(tm.hiResDisplay).toBe(isHiRes);
    });

});
