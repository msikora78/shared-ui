/**
 *  ShortLink component
 *  if tm.shortlinkFlashCopy is true, depends on ZeroClipboard (http://code.google.com/p/zeroclipboard)
 */
 (function($, tm){
    var bodyInitialized = false;

    tm.shortlinkFlashCopy = false; // setting to true replaces the "Right click link to copy to clipboard." instructions with a "Copy" button

    // Enable shortlink for button(s)
    tm.shortlink = function(buttonEl){
        // null, id, dom node, or jquery?
        var btnClass = "shortlink-btn";
        var nodes;
        if (!buttonEl){
            // undefined, use classname
            nodes = $("." + btnClass);
        } else if(typeof buttonEl === "string"){
            // id
            nodes = $("#" + buttonEl);
        } else if (buttonEl.nodeType){
            // DOM object
            nodes = $(buttonEl);
        } else if (buttonEl.selector){
            // jquery object
            nodes = buttonEl;
        }

        var popoverOpts = {
            content: '<div class="shortlink-input"><label>Link:</label><input type="text" value="loading..." disabled="disabled"/></div><div class="shortlink-copy clearfix"><em>Copied to Clipboard</em><div class="shortlink-btn-container"><button class="btn btn-primary" type="button">Copy</button></div><div class="copy-instr">Right click link to copy to clipboard.</div></div>',
            // remove title h3 from bootstrap implementation
            template: '<div class="popover"><div class="arrow"></div><div class="popover-inner"><div class="popover-content"><p></p></div></div></div>'
        };
        nodes.each(function(){
            var elem = $(this);
            var elData = elem.data();
            if (elData.shortlink){
                // already created
                return;
            }
            elData.shortlink = true;
            if (!elem.hasClass(btnClass)){
                elem.addClass(btnClass);
            }
            if (!elData.placement){
                elData.placement = "bottom";
            }
            elem.popover(popoverOpts);
            elem.on("click", function(event){
                var data = $(this).data();
                if (data && data.popover){
                    var tip = data.popover.$tip;
                    var inp = tip.find("input");
                    var callback = function(val){
                        if (!val){
                            data.popover.hide();
                        }
                        inp.val(val).prop("disabled", false);
                        if (tm.shortlinkFlashCopy){
                            // show the button
                            var btnContainer = tip.find(".shortlink-btn-container");
                            btnContainer.css("display", "block");
                            // enable flash copy-to-clipboard
                            var clip = new ZeroClipboard.Client();
                            clip.addEventListener('onComplete', function(){
                                tip.find(".shortlink-copy em").css("display", "block");
                            });
                            clip.setText(val);
                            var btn = btnContainer.find("button");
                            clip.glue(btn.get(0), btn.get(0).parentNode);
                        } else {
                            tip.find(".copy-instr").css("display", "block");
                            inp.focus();
                            inp.select();
                        }
                    };
                    if (tip.hasClass('in')){
                        if (tm.resolveObject("window.parent.tm.helper.generateShortLink")) {
                            // request shortlink
                            var longurl = data.longurl || window.top.location.href;
                            window.parent.tm.helper.generateShortLink(longurl, callback);
                        } else {
                            // no parent, assume standalone demo.html
                            callback("http://tm360.com/abcdef1");
                        }
                    }
                }
            });
        });

        // close popover when clicking outside it
        if (!bodyInitialized){
            $("body")
                .on("click", "." + btnClass + ", .popover", false)
                .on("click", function(event){
                    $("." + btnClass).each(function(){
                        var data = $(this).data();
                        if (data && data.popover && data.popover.$tip && data.popover.$tip.hasClass("in")){
                            data.popover.hide();
                        }
                    });
                });
            bodyInitialized = true;
        }

    };

})(window.jQuery, tm);
