describe('namespace "tm.cookie"', function(){

    it('reads, writes, and expires cookies', function(){
        var ckName = "aCookieName";
        var ckVal1 = "abc def";
        var ckVal2 = "xyz";

        //tm.eraseCookie(ckName);

        expect(document.cookie).not.toContain(ckName);
        expect(tm.readCookie(ckName)).toBeNull();

        tm.createCookie(ckName, ckVal1);
        expect(document.cookie).toContain(ckName + "=" + encodeURIComponent(ckVal1));
        expect(tm.readCookie(ckName)).not.toBeNull();
        expect(tm.readCookie(ckName)).toBe(ckVal1);
        expect(tm.readCookie(ckName)).not.toBe(ckVal2);

        tm.createCookie(ckName, ckVal2);
        expect(document.cookie).toContain(ckName + "=" + encodeURIComponent(ckVal2));
        expect(tm.readCookie(ckName)).toBe(ckVal2);
        expect(tm.readCookie(ckName)).not.toBe(ckVal1);

        tm.eraseCookie(ckName);
        expect(document.cookie).not.toContain(ckName);
        expect(tm.readCookie(ckName)).toBeNull();
    });

});
