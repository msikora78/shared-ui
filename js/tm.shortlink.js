/**
 *  ShortLink component
 *  if tm.shortlinkFlashCopy is true, depends on ZeroClipboard (http://code.google.com/p/zeroclipboard)
 */
 (function($, tm){
    var bodyInitialized = false;

    if (typeof tm.shortlinkFlashCopy == 'undefined') {
        tm.shortlinkFlashCopy = false; // setting to true replaces the "Right click link to copy to clipboard." instructions with a "Copy" button
    }

    // Enable shortlink for button(s)
    tm.shortlink = function(buttonEl){
        // null, id, dom node, or jquery?
        var btnClass = "shortlink-btn";
        var customTemplate = $('<div class="shortlink-input"><label>Link: </label><input type="text" value="loading..." disabled="disabled"/></div><div class="shortlink-copy clearfix"><em>Copied to Clipboard</em><div class="shortlink-btn-container"><button class="btn btn-primary" type="button">Copy</button></div><div class="copy-instr">Right click link to copy to clipboard.</div>');
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

        var popupOpts = {
            showArrow: true,
            customTemplate: customTemplate,
            trigger: 'manual',
            height: '100px'
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

            if (tm.shortlinkFlashCopy){
                // show the button
                var btnContainer = popupOpts.customTemplate.find(".shortlink-btn-container");
                btnContainer.css("display", "block");
            }

            elem.tmPopup(popupOpts);

            elem.on("click.tmShortlink", function(event) {
                if (elem.tmPopup) {
                    if (elem.next(".popover").length > 0) {
                        elem.tmPopup('hide');
                    }
                    else {
                        elem.tmPopup('show');
                        var $popup = elem.next(".popover");
                        var $input = $popup.find("input");
                        var callback = function(val){
                            if (!val){
                                elem.tmPopup('hide');
                            }
                            $input.val(val).prop("disabled", false);
                            if (tm.shortlinkFlashCopy){
                                // enable flash copy-to-clipboard
                                var clip = new ZeroClipboard.Client();
                                clip.addEventListener('onComplete', function(){
                                    popupOpts.customTemplate.find(".shortlink-copy em").css("display", "block");
                                });
                                clip.setText(val);
                                var btn = btnContainer.find("button");
                                clip.glue(btn.get(0), btn.get(0).parentNode);
                            } else {
                                $popup.find(".copy-instr").css("display", "block");
                                $input.focus();
                                $input.select();
                            }
                        };
                        if ($popup.hasClass('in')){
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
                }
            });
            elem.on('hidden.tmShortlink', function() {
                var $popup = elem.next(".popover");
                $popup.find(".shortlink-copy em").css("display", "none");
            })
        });
    };

})(window.jQuery, tm);
