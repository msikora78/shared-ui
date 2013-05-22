define(['jquery', 'bootstrap', 'widget!tm/widgets/tooltip'], function($) {

    var data = {
        legend: 'Javascript',
        description: 'Non-modal dialogs built using javascript only.',
        html:'\
<div id="overview-non-modal-container" class="demo-container">\n\
    <button type="button" id="javascriptTooltipTarget" class="btn">Tooltip</button>\n\
    <button type="button" id="javascriptPopupTarget" class="btn">Pop up</button>\n\
    <button type="button" id="javascriptPopupWithArrowTarget" class="btn">Pop up with arrow</button>\n\
</div>',
        setupString: 'function() {\n\
    $("#javascriptTooltipTarget").tmTooltip({\n\
        title: "It\'s so easy to create a tooltip for my website using only javascript.",\n\
        placement: "right"\n\
    });\n\
}'
};

    data.setup = new Function('return ' + data.setupString).call(this);

    return data;
});