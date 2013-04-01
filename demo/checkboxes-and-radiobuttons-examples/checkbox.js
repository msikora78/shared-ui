define(['jquery', 'widget!tm/widgets/checkbox'], function($) {

    var data = {
        legend: 'Checkbox',
        description: 'A styled checkbox widget. Use the <code>tmCheckbox</code> widget.',
        html:'\
          <form id="checkbox-container" type="">\n\
            <p>\n\
              <label for="checkbox1" style="display: inline;">\n\
                <input type="checkbox" id="checkbox1" />Checkbox1\n\
              </label>\n\
              <label style="margin-left: 25px; display: inline;">\n\
                <input type="checkbox" id="toggleCheckbox1Enable" checked />Enabled\n\
              </label><br>\n\
            </p>\n\
            <p>\n\
              <label for="checkbox2" style="display: inline;">\n\
                <input type="checkbox" id="checkbox2" class="checkbox" checked />Checkbox2\n\
              </label>\n\
              <span style="margin-left: 25px;">\n\
                  state: <span id="checkboxesState">false, true</span>\n\
              </span>\n\
            </p>\n\
            <p>\n\
              <label for="checkbox3" style="display: inline;">\n\
                <input type="checkbox" id="checkbox3" class="checkbox" disabled />Checkbox3\n\
              </label>\n\
              <input type="reset" id="reset" class="btn btn-primary" style="display: inline; margin-left: 25px;" value="Reset form" />\n\
            </p>\n\
            <p>\n\
              <label for="checkbox4" class="inline">\n\
                <input type="checkbox" id="checkbox4" class="checkbox" checked disabled />Checkbox4\n\
              </label>\n\
            </p>\n\
          </form>',
		setupString: 'function() {\n\
    $("input[type=checkbox]").tmCheckbox().change( function() {\n\
        var states = [$("#checkbox1").prop("checked"), $("#checkbox2").prop("checked")];\n\
        $("#checkboxesState").text(states.join(", "));\n\
    });\n\
\n\
    $("#toggleCheckbox1Enable").change( function() {\n\
        var isEnabled = $("#toggleCheckbox1Enable").prop("checked");\n\
        $("#checkbox1").tmCheckbox("setEnabled", isEnabled);\n\
    });\n\
\n\
    $("#reset").click(function() {\n\
        setTimeout(function() {\n\
            $("#checkbox-container input").each(function(){\n\
                $(this).triggerHandler && $(this).triggerHandler("change");\n\
            });\n\
        }, 0);\n\
    });\n\
}'
    };

    data.setup = new Function('return ' + data.setupString).call(this);

    return data;
});