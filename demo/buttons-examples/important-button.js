define(['jquery'], function($) {

    var data = {
        legend: 'Important button',
        description: 'A standard bootstrap button. Use <code>.btn</code> <code>.btn-success</code> class to get the look and feel.',
        html:'\
<div id="important-buttons-container">\n\
  <p>\n\
    <button type="button" id="default-state-button" class="btn btn-success">Text</button>\n\
  </p>\n\
  <p>\n\
    <button type="button" id="inactive-state-button" class="btn btn-success" disabled>Inactive</button>\n\
  </p>\n\
</div>',
		setupString: 'function() {\n\
  $("#important-buttons-container .btn").click(function() {\n\
    alert("Important button clicked");\n\
  });\n\
}'
};

    data.setup = new Function('return ' + data.setupString).call(this);

    return data;
});