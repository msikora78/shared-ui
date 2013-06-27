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

    it('truncates strings', function(){
        expect(tm.string.truncate("", 4)).toBe("");
        expect(tm.string.truncate("Foo bar baz", 4)).toBe("F...");
        expect(tm.string.truncate("Foo bar baz", 10)).toBe("Foo bar...");
        expect(tm.string.truncate("Foo bar baz", 11)).toBe("Foo bar baz");
        expect(tm.string.truncate("Foo bar baz", 100)).toBe("Foo bar baz");
    });

    it('validates email strings', function(){
        expect(tm.string.validateEmail("foo@bar.com")).toBe(true);
        expect(tm.string.validateEmail("foo@bar.baz.com")).toBe(true);
        expect(tm.string.validateEmail("foo@bar")).toBe(false);
        expect(tm.string.validateEmail("foo.bar")).toBe(false);
        expect(tm.string.validateEmail("")).toBe(false);
        expect(tm.string.validateEmail("foo@bar@com")).toBe(false);
        expect(tm.string.validateEmail("1@2.3")).toBe(false);
        expect(tm.string.validateEmail("foo@.com")).toBe(false);
        expect(tm.string.validateEmail("foo@bar@.com")).toBe(false);
    });

});
