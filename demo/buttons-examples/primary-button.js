define(['jquery'], function($) {

    var data = {
        legend: 'Primary button',
        description: 'A standard bootstrap button. Use <code>.btn</code> <code>.btn-primary</code> classes to get the look and feel.',
        html:'\
<div id="primary-buttons-container">\n\
  <p>\n\
    <button type="button" id="default-state-button" class="btn btn-primary">Text</button>\n\
  </p>\n\
  <p>\n\
    <button type="button" id="inactive-state-button" class="btn btn-primary" disabled>Inactive</button>\n\
  </p>\n\
</div>',
		setupString: 'function() {\n\
  $("#primary-buttons-container .btn").click(function() {\n\
    alert("Primary button clicked");\n\
  });\n\
}'
};

    data.setup = new Function('return ' + data.setupString).call(this);

    return data;
});