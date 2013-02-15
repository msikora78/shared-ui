describe('namespace "tm.date"', function(){

    // month is 0-indexed!
    var d1 = new Date(2013, 0, 1);
    var d2 = new Date(1999, 11, 31, 1, 1, 1, 1);
    var d3 = new Date(2025, 9, 20);

    it('formats date to YMD', function(){
        expect(tm.date.formatYMD(d1)).toBe("2013-01-01");
        expect(tm.date.formatYMD(d2)).toBe("1999-12-31");
        expect(tm.date.formatYMD(d3)).toBe("2025-10-20");
    });

    it('formats date to MDY, aka prettyPrint', function(){
        expect(tm.date.formatMDY(d1)).toBe("1/1/2013");
        expect(tm.date.formatMDY(d2)).toBe("12/31/1999");
        expect(tm.date.formatMDY(d3)).toBe("10/20/2025");

        expect(tm.date.formatMDY(d1)).toBe(tm.date.prettyPrint(d1));
    });

    it('offsets Dates by specified days', function(){
        var dOff1 = tm.date.offsetDays(d1, -1);
        expect(tm.date.formatYMD(dOff1)).toBe("2012-12-31");
        var dOff1a = tm.date.offsetDays(dOff1, 1);
        expect(tm.date.formatYMD(dOff1a)).toEqual("2013-01-01");
        var dOff2 = tm.date.offsetDays(d2, 31);
        expect(tm.date.formatYMD(dOff2)).toEqual("2000-01-31");
    });

    it('formats mm:ss, aka prettyPrintMS', function(){
        var t1 = 20*60*1000;
        expect(tm.date.prettyPrintMS(t1)).toEqual("20:00");
        var t2 = (60*60*1000) - 1;
        expect(tm.date.prettyPrintMS(t2)).toEqual("59:59");
        var t3 = (100*60*1000) - 1;
        expect(tm.date.prettyPrintMS(t3)).toEqual("99:59");

        expect(tm.date.prettyPrintMS(0)).toEqual("0:00");
        expect(tm.date.prettyPrintMS(1)).toEqual("0:00");
    });

});
