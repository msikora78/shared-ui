define(['jquery', 'widget!tm/widgets/checkbox', 'widget!tm/widgets/radiobutton'], function($) {

	var data = {
		legend: 'Overview',
		description: 'Styled inputs, the widgets hide actual inputs in order to show the correct look & feel. Use the <code>tmCheckbox</code> and <code>tmRadiobutton</code> widgets.',
		html:'\
			<div id="checkboxes-container">\n\
				<h5>Checkboxes</h5>\n\
				<label><input type="checkbox" value="1" />Option 1</label>\n\
				<label><input type="checkbox" value="2" />Option 2</label>\n\
				<input id="chk" type="checkbox" value="3" /><label for="chk" style="display: inline;">Option 3</label>\n\
				<br>\n\
				Checkboxes values: <span id="checkboxesValues" />\n\
			</div>\n\
			<div id="radiobuttons-container">\n\
				<h5>Radio buttons</h5>\n\
				<label><input type="radio" name="group" value="1" />Option 1</label>\n\
				<label><input type="radio" name="group" value="2" />Option 2</label>\n\
				<input id="rdo" type="radio" name="group" value="3" /><label for="rdo" style="display: inline;">Option 3</label>\n\
				<br>\n\
				Radio buttons group value: <span id="groupValue" />\n\
			</div><br>',
		setupString: 'function() {\n\
			$("#checkboxes-container input").tmCheckbox().change(function() {\n\
				var values = [];\n\
				$.each($("#checkboxes-container input"), function(index, element) {\n\
					if (element.checked) {\n\
						values.push(element.value);\n\
					}\n\
				});\n\
				$("#checkboxesValues").text(values.join(", "));\n\
			});\n\
			$("#radiobuttons-container input").tmRadiobutton().change(function() {\n\
				$("#groupValue").text($(this).tmRadiobutton("getGroupSelection").val());\n\
			});\n\
		}'
	};

	data.setup = new Function('return ' + data.setupString).call(this);

	return data;
});