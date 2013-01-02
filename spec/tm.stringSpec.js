describe('namespace "sys"', function(){

    it('capitalizes strings', function(){
        expect(sys.capitalize("fooBar")).toBe("FooBar");
        expect(sys.capitalize("FOOBAR")).toBe("FOOBAR");
        expect(sys.capitalize("foobar")).toBe("Foobar");
    });

    it('uncapitalizes strings', function(){
        expect(sys.uncapitalize("Ed McMahon")).toBe("ed McMahon");
    });

    it('camelizes strings', function(){
        expect(sys.camelize("foo_bar_baz")).toBe("FooBarBaz");
        expect(sys.camelize("foo-bar-baz")).toBe("FooBarBaz");
        expect(sys.camelize("FooBar-baz")).toBe("FooBarBaz");
        expect(sys.camelize("Foo-BAR-Baz")).toBe("FooBARBaz");
    });

    it('lowerCamelizes strings', function(){
        expect(sys.lowerCamelize("foo_bar_baz")).toBe("fooBarBaz");
        expect(sys.lowerCamelize("foo-bar-baz")).toBe("fooBarBaz");
        expect(sys.lowerCamelize("FooBar-baz")).toBe("fooBarBaz");
        expect(sys.lowerCamelize("Foo-BAR-Baz")).toBe("fooBARBaz");
    });

    it('formats mm:ss', function(){
        var t1 = 20*60*1000;
        expect(sys.formatMinSec(t1)).toEqual("20:00");
        var t2 = (60*60*1000) - 1;
        expect(sys.formatMinSec(t2)).toEqual("59:59");
        var t3 = (100*60*1000) - 1;
        expect(sys.formatMinSec(t3)).toEqual("99:59");

        expect(sys.formatMinSec(0)).toEqual("0:00");
        expect(sys.formatMinSec(1)).toEqual("0:00");
    });

});
