if (typeof define === 'function' && define.amd) {

    define(['injectable!tm.cookie'], function(cookieInjectable) {

        describe('tm.cookie', function() {

            var documentMock;
            var tmCookie;

            beforeEach(function() {
                documentMock = { cookie: '' };
                tmCookie = cookieInjectable(documentMock);
            });

            it('should create cookie with default options', function() {
                tmCookie.create('test', 'abc');

                expect(documentMock.cookie).toBe('test=abc; path=/');
            });

            it('should create cookie for number of days', function() {
                var expectedDate = new Date(+new Date() + 3 * 24 * 3600 * 1000);

                tmCookie.create('test', 'abc', 3);

                var m = documentMock.cookie.match(/\b^test=abc;\sexpires=(.*?);\spath=\/$/);

                expect(m).toBeTruthy();

                var dt = new Date(Date.parse(m[1]));

                expect(dt <= expectedDate).toBe(true);
            });

            it('should get existing cookie', function() {
                documentMock.cookie = "abc=def;ghi=jkl";

                expect(tmCookie.read('abc')).toBe('def');
                expect(tmCookie.read('ghi')).toBe('jkl');
            });

            it('should return null for undefined cookie', function() {
                expect(tmCookie.read('abc')).toBe(null);
            });

            it('should erase cookie', function() {
                documentMock.cookie = 'abc=def';

                tmCookie.erase('abc');

                expect(documentMock.cookie.indexOf('abc=;')).toBe(0);
            })

        });

    });

}
else {

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

}
