define(['jquery', 'bootstrap'], function($) {

    var data = {
        legend: 'Overview',
        description: 'Non-modal dialogs.',
        html:'\
<div id="overview-non-modal-container" class="demo-container">\n\
    <a href="#" id="example" class="btn" rel="popover" data-trigger="hover" \n\
        data-content="It\'s so simple to create a tooltip for my website!">Hover for tooltip</a>\n\
</div>',
        setupString: 'function() {\n\
            $("#example").popover();\n\
}'
};

    data.setup = new Function('return ' + data.setupString).call(this);

    return data;
});