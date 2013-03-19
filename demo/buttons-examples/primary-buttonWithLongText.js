define(['jquery'], function($) {

    var data = {
        legend: 'Primary button with long text',
        html:'\
<div id="primary-buttons-longtext-container">\n\
  <p>\n\
    <button type="button" id="longtext-primary-button" class="btn btn-primary">Button with a very very long text</button>\n\
  </p>\n\
  <p>\n\
    <button type="button" id="inactive-longtext-primary-button" class="btn btn-primary" disabled>Inactive button with a very long text</button>\n\
  </p>\n\
</div>',
		setupString: 'function() {\n\
  $("#primary-buttons-longtext-container .btn").click(function() {\n\
    alert("Primary button with long text clicked");\n\
  });\n\
}'
};

    data.setup = new Function('return ' + data.setupString).call(this);

    return data;
});