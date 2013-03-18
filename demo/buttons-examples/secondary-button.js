define(['jquery'], function($) {

    var data = {
        legend: 'Secondary button',
        description: 'A standard bootstrap button. Use <code>.btn</code> class to get the look and feel.',
        html:'\
<div id="secondary-buttons-container">\n\
  <p>\n\
    <button type="button" id="default-state-button" class="btn">Text</button>\n\
  </p>\n\
  <p>\n\
    <button type="button" id="inactive-state-button" class="btn" disabled>Inactive</button>\n\
  </p>\n\
</div>',
		setupString: 'function() {\n\
  $("#secondary-buttons-container .btn").click(function() {\n\
    alert("Secondary button clicked");\n\
  });\n\
}'
};

    data.setup = new Function('return ' + data.setupString).call(this);

    return data;
});