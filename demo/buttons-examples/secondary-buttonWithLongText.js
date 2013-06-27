define(['jquery'], function($) {

    var data = {
        legend: 'Secondary button with long text',
        html:'\
<div id="secondary-buttons-longtext-container">\n\
  <p>\n\
    <button type="button" id="longtext-secondary-button" class="btn">Button with a very very long text</button>\n\
  </p>\n\
  <p>\n\
    <button type="button" id="inactive-longtext-secondary-button" class="btn" disabled>Inactive button with a very long text</button>\n\
  </p>\n\
</div>',
		setupString: 'function() {\n\
  $("#secondary-buttons-longtext-container .btn").click(function() {\n\
    alert("Secondary button with long text clicked");\n\
  });\n\
}'
};

    data.setup = new Function('return ' + data.setupString).call(this);

    return data;
});