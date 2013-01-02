describe('namespace "tm.cookie"', function(){

    it('reads, writes, and expires cookies', function(){
        var ckName = "aCookieName";
        var ckVal1 = "abc def";
        var ckVal2 = "xyz";

        //tm.cookie.erase(ckName);

        expect(document.cookie).not.toContain(ckName);
        expect(tm.cookie.read(ckName)).toBeNull();

        tm.cookie.create(ckName, ckVal1);
        expect(document.cookie).toContain(ckName + "=" + encodeURIComponent(ckVal1));
        expect(tm.cookie.read(ckName)).not.toBeNull();
        expect(tm.cookie.read(ckName)).toBe(ckVal1);
        expect(tm.cookie.read(ckName)).not.toBe(ckVal2);

        tm.cookie.create(ckName, ckVal2);
        expect(document.cookie).toContain(ckName + "=" + encodeURIComponent(ckVal2));
        expect(tm.cookie.read(ckName)).toBe(ckVal2);
        expect(tm.cookie.read(ckName)).not.toBe(ckVal1);

        tm.cookie.erase(ckName);
        expect(document.cookie).not.toContain(ckName);
        expect(tm.cookie.read(ckName)).toBeNull();
    });

});
