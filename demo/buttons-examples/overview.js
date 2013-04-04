define(['jquery'], function($) {

    var data = {
        legend: 'Overview',
        description: 'Standard bootstrap buttons.',
        html:'\
<div id="overview-buttons-container" class="demo-container">\n\
    <table><tr><td>\n\
        <div class="demo-group">\n\
            <button id="overviewPrimaryButton" type="button" class="btn btn-primary">Primary</button>\n\
            <button id="overviewInactivePrimaryButton" type="button" class="btn btn-primary disabled" disabled>Disabled</button>\n\
        </div>\n\
        <div class="demo-group">\n\
            <button id="overviewSecondaryButton" type="button" class="btn">Secondary</button>\n\
            <button id="overviewInactiveSecondaryButton" type="button" class="btn disabled" disabled>Disabled</button>\n\
        </div>\n\
        <div class="demo-group">\n\
            <button id="overviewImportantButton" type="button" class="btn btn-success">Important</button>\n\
            <button id="overviewInactiveImportantButton" type="button" class="btn btn-success disabled" disabled>Disabled</button>\n\
        </div>\n\
        </td><td>\n\
            Log:<br>\n\
            <div id="overview-buttons-console" class="console" />\n\
        </td></tr>\n\
    </table>\n\
</div>',
        setupString: 'function() {\n\
  $("#overview-buttons-container .btn").click(function(e) {\n\
      $("#overview-buttons-console").html($("#overview-buttons-console").html() + $(e.target).attr("id") + " clicked.<br>");\n\
      $("#overview-buttons-console").scrollTop($("#overview-buttons-console")[0].scrollHeight);\n\
  });\n\
}'
};

    data.setup = new Function('return ' + data.setupString).call(this);

    return data;
});