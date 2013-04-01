define(['jquery', 'widget!tm/widgets/radiobutton'], function($) {

    var data = {
        legend: 'Radiobutton',
        description: 'A styled radiobutton widget. Use the <code>tmRadiobutton</code> widget.',
        html:'\
          <form id="radiobutton-container" type="">\n\
            <p>\n\
              <label for="radio1" style="display: inline;">\n\
                <input type="radio" id="radio1" name="activeGroup" value="1" />Radiobutton1\n\
              </label>\n\
              <label style="margin-left: 25px; display: inline;">\n\
                <input type="checkbox" id="toggleRadio1Enable" checked />Enabled\n\
              </label>\n\
            </p>\n\
            <p>\n\
              <label for="radio2" class="inline">\n\
                <input type="radio" id="radio2" name="activeGroup" value="2" checked />Radiobutton2\n\
              </label>\n\
              Selected value: <span id="activeGroupState">2</span>\n\
            </p>\n\
            <p>\n\
              <label for="radio3" class="inline">\n\
                <input type="radio" id="radio3" name="inactiveGroup" disabled />Radiobutton3\n\
              </label>\n\
            </p>\n\
            <p>\n\
              <label for="radio4" class="inline">\n\
                <input type="radio" id="radio4" name="inactiveGroup" checked disabled />Radiobutton4\n\
              </label>\n\
            </p>\n\
            <p>\n\
              <input type="reset" id="reset" class="btn btn-primary" value="Reset form" />\n\
            </p>\n\
          </form>',
    setupString: 'function() {\n\
    $("input[type=radio]").tmRadiobutton().change( function() {\n\
        $("#activeGroupState").text($("#radio1").tmRadiobutton("getGroupSelection").val()); \n\
    });\n\
\n\
    $("#toggleRadio1Enable").tmCheckbox().change(function() {\n\
        var isEnabled = $(this).prop("checked");\n\
        $("#radio1").tmRadiobutton("setEnabled", isEnabled);\n\
    });\n\
\n\
    $("#reset").click(function() {\n\
        setTimeout(function() {\n\
            $("#radiobutton-container input").each(function(i, input){\n\
                input.triggerHandler("change");\n\
            });\n\
        }, 0);\n\
    });\n\
}'
    };

    data.setup = new Function('return ' + data.setupString).call(this);

    return data;
});