define(['jquery', 'widget!tm/widgets/radiobutton'], function($) {

    var data = {
        legend: 'Checkbox',
        description: 'A styled radiobutton. Use the <code>.radio</code> class',
        html:'\
<div id="checkbox-container">\n\
  <p>\n\
    <input id="checkbox" class="chk">Checkbox</button>\n\
  </p>\n\
</div>',
		setupString: 'function() {\n\
  $("#important-buttons-container .chk").tmCheckbox();\n\
}'
};

    data.setup = new Function('return ' + data.setupString).call(this);

    return data;
});