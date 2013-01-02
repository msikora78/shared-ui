describe('namespace "tm.string"', function(){

    it('capitalizes strings', function(){
        expect(tm.string.capitalize("fooBar")).toBe("FooBar");
        expect(tm.string.capitalize("FOOBAR")).toBe("FOOBAR");
        expect(tm.string.capitalize("foobar")).toBe("Foobar");
    });

    it('uncapitalizes strings', function(){
        expect(tm.string.uncapitalize("Ed McMahon")).toBe("ed McMahon");
    });

    it('camelizes strings', function(){
        expect(tm.string.camelize("foo_bar_baz")).toBe("FooBarBaz");
        expect(tm.string.camelize("foo-bar-baz")).toBe("FooBarBaz");
        expect(tm.string.camelize("FooBar-baz")).toBe("FooBarBaz");
        expect(tm.string.camelize("Foo-BAR-Baz")).toBe("FooBARBaz");
    });

    it('lowerCamelizes strings', function(){
        expect(tm.string.lowerCamelize("foo_bar_baz")).toBe("fooBarBaz");
        expect(tm.string.lowerCamelize("foo-bar-baz")).toBe("fooBarBaz");
        expect(tm.string.lowerCamelize("FooBar-baz")).toBe("fooBarBaz");
        expect(tm.string.lowerCamelize("Foo-BAR-Baz")).toBe("fooBARBaz");
    });

});
