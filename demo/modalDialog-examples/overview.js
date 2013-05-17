define(['jquery', 'widget!tm/widgets/modalDialog'], function($) {

    var data = {
        legend: 'Overview',
        description: 'These examples demonstrate the tmModalDialog widget fonctionalities.',
        html: '<div id="overview">\n\
                   <div class="modal-footer">\n\
                       <button type="button" onclick="overviewDialog.tmModalDialog(\'hide\')" class="btn">Text</button>\n\
                       <button type="button" onclick="overviewDialog.tmModalDialog(\'hide\')" class="btn btn-primary">Text</button>\n\
                   </div>\n\
               </div>\n\
            <p><button type="button" id="overview-button" class="btn btn-primary">Show</button></p>',
        setupString: "function() {\n \
            overviewDialog = $('#overview').tmModalDialog({ \n\
                title: 'Title Text', \n\
                content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.'\n\
            });\n \
\n \
            $('#overview-button').click(function() {\n \
                overviewDialog.tmModalDialog('show');\n \
            });\n \
        }"
    };

    data.setup = new Function('$', 'return ' + data.setupString).call(this, $);

    return data;
});