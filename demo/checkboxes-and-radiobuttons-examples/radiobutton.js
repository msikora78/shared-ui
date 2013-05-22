define(['jquery', 'widget!tm/widgets/radiobutton'], function($) {
    'use strict';

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
                    <label for="radio2" style="display: inline;">\n\
                        <input type="radio" id="radio2" name="activeGroup" value="2" checked />Radiobutton2\n\
                    </label>\n\
                    <span style="margin-left: 25px; display: inline;">\n\
                        Selected value: <span id="activeGroupState">2</span>\n\
                    </span>\n\
                </p>\n\
                <p>\n\
                    <label for="radio3" style="display: inline;">\n\
                        <input type="radio" id="radio3" name="inactiveGroup" disabled />Radiobutton3\n\
                    </label>\n\
                    <input type="reset" id="resetRadioButtons" class="btn btn-primary" style="display: inline; margin-left: 25px;" value="Reset form" />\n\
                </p>\n\
                <p>\n\
                    <label for="radio4" class="inline">\n\
                        <input type="radio" id="radio4" name="inactiveGroup" checked disabled />Radiobutton4\n\
                    </label>\n\
                </p>\n\
                <p>\n\
                </p>\n\
            </form>',
        js: function() {
            $("input[type=radio]").tmRadiobutton().change( function() {
                $("#activeGroupState").text($("#radio1").tmRadiobutton("getGroupSelection").val()); 
            });

            $("#toggleRadio1Enable").tmCheckbox().change(function() {
                var isEnabled = $(this).prop("checked");
                $("#radio1").tmRadiobutton("setEnabled", isEnabled);
            });

            $("#resetRadioButtons").click(function() {
                setTimeout(function() {
                    $("#radiobutton-container input").each(function(){
                        $(this).triggerHandler && $(this).triggerHandler("change");
                    });
                }, 0);
            });
        }
    };

    data.setup = new Function('return ' + data.setupString).call(this);

    return data;
});