define(['jquery', 'widget!tm/widgets/tooltip'], function($) {
    'use strict';

    var data = {
        legend: 'Javascript',
        description: 'Non-modal dialogs built using javascript only.',
        html:'\
            <div id="overview-non-modal-container" class="demo-container">\n\
                <p>\n\
                    <button type="button" id="javascriptPopupTarget" class="btn">Pop up</button>\n\
                    <button type="button" id="javascriptPopupWithNoTitle" class="btn">Pop up with no title</button>\n\
                </p>\n\
            </div>',
        js: function() {
            $('#javascriptPopupTarget').tmPopup({
                title: "Popup's title",
                content: "It's so easy to create a popup for my website using only javascript.",
                width: '300px', 
                height: '230px'
            });
            $('#javascriptPopupWithNoTitle').tmPopup({
                content: "It's so easy to create a popup for my website using only javascript."
            });
        }
    };

    return data;
});