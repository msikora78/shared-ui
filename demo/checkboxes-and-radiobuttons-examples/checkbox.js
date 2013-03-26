define(['jquery', 'widget!tm/widgets/checkbox'], function($) {

    var data = {
        legend: 'Checkbox',
        description: 'A styled checkbox widget. Use the <code>tmCheckbox</code> widget.',
        html:'\
          <form id="checkbox-container" type="">\n\
            <p>\n\
              <label for="checkbox1">\n\
                <input type="checkbox" id="checkbox1" />Checkbox1\n\
              </label>\n\
              state: <span id="checkbox1state">false</span>\n\
              <button type="button" id="toggleViaWidget" class="btn">Toggle enabled</button>\n\
            </p>\n\
            <div>\n\
              <label for="checkbox2" class="inline">\n\
                <input type="checkbox" id="checkbox2" class="checkbox" checked />Checkbox2\n\
              </label>\n\
              state: <span id="checkbox2state">true</span>\n\
            </div>\n\
            <p>\n\
              <label for="checkbox3" class="inline">\n\
                <input type="checkbox" id="checkbox3" class="checkbox" disabled />Checkbox3\n\
              </label>\n\
            </p>\n\
            <p>\n\
              <label for="checkbox4" class="inline">\n\
                <input type="checkbox" id="checkbox4" class="checkbox" checked disabled />Checkbox4\n\
              </label>\n\
            </p>\n\
            <p>\n\
              <input type="reset" id="reset" class="btn btn-primary" value="Reset form" />\n\
            </p>\n\
          </form>',
		setupString: 'function() {\n\
    $("input[type=checkbox]").tmCheckbox().change( function() {\n\
        var isChecked = $(this).attr("checked") != undefined;\n\
        $("#" + $(this).attr("id") + "state").text(isChecked); \n\
        console.log("Checked changed");\n\
    });\n\
\n\
    $("#toggleViaWidget").click( function() {\n\
        var isEnabled = $("#checkbox1").tmCheckbox("getEnabled");\n\
        $("#checkbox1").tmCheckbox("setEnabled", isEnabled);\n\
    });\n\
\n\
    $("#reset").click(function() {\n\
        setTimeout(function() {\n\
            $("input").triggerHandler("change");\n\
        }, 0);\n\
    });\n\
}'
    };

    data.setup = new Function('return ' + data.setupString).call(this);

    return data;
});