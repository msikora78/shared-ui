define(['jquery', 'widget!tm/widgets/checkbox'], function($) {
    'use strict';

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
		js: function() {
            $("input[type=checkbox]").tmCheckbox().change( function() {
                var states = [$("#checkbox1").prop("checked"), $("#checkbox2").prop("checked")];
                $("#checkboxesState").text(states.join(", "));
            });

            $("#toggleCheckbox1Enable").change( function() {
                var isEnabled = $("#toggleCheckbox1Enable").prop("checked");
                $("#checkbox1").tmCheckbox("setEnabled", isEnabled);
            });

            $("#reset").click(function() {
                setTimeout(function() {
                    $("#checkbox-container input").each(function(){
                        $(this).triggerHandler && $(this).triggerHandler("change");
                    });
                }, 0);
            });
        }
    };

    return data;
});