define(['jquery', 'widget!tm/widgets/checkbox', 'widget!tm/widgets/radiobutton'], function($) {
	'use strict';

	var data = {
		legend: 'Overview',
		description: 'Styled inputs, the widgets hide actual inputs in order to show the correct look & feel. Use the <code>tmCheckbox</code> and <code>tmRadiobutton</code> widgets.',
		html:'\
			<div id="checkboxes-container">\n\
				<h5>Checkboxes</h5>\n\
				<label><input type="checkbox" id="chk1" value="1" />Option 1</label>\n\
				<label><input type="checkbox" id="chk2"value="2" />Option 2</label>\n\
				<input type="checkbox" id="chk3" value="3" /><label for="chk3" style="display: inline;">Option 3</label><br>\n\
				<input type="checkbox" id="chk4" value="4" disabled /><label for="chk4" style="display: inline;">Option 4</label>\n\
				<br>\n\
				Checkboxes values: <span id="checkboxesValues" />\n\
			</div>\n\
			<div id="radiobuttons-container">\n\
				<h5>Radio buttons</h5>\n\
				<label><input type="radio" id="rdo1" name="group" value="1" />Option 1</label>\n\
				<label><input type="radio" id="rdo2" name="group" value="2" />Option 2</label>\n\
				<input type="radio" id="rdo3" name="group" value="3" /><label for="rdo3" style="display: inline;">Option 3</label><br>\n\
				<input type="radio" id="rdo4" name="group" value="4" disabled /><label for="rdo4" style="display: inline;">Option 4</label>\n\
				<br>\n\
				Radio buttons group value: <span id="groupValue" />\n\
			</div><br>',
		js: function() {
			$("#checkboxes-container input").tmCheckbox().change(function() {
				var values = [];
				$.each($("#checkboxes-container input"), function(index, element) {
					if (element.checked) {
						values.push(element.value);
					}
				});
				$("#checkboxesValues").text(values.join(", "));
			});
			$("#radiobuttons-container input").tmRadiobutton().change(function() {
				$("#groupValue").text($(this).tmRadiobutton("getGroupSelection").val());
			});
		}
	};

	return data;
});