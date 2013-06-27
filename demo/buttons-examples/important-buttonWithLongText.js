define(['jquery'], function($) {

    var data = {
        legend: 'Important button with long text',
        html:'\
<div id="important-buttons-longtext-container">\n\
	<p>\n\
	  <button type="button" id="longtext-important-button" class="btn btn-success">Button with a very very long text</button>\n\
	</p>\n\
	<p>\n\
	  <button type="button" id="inactive-longtext-important-button" class="btn btn-success" disabled>Inactive button with a very long text</button>\n\
	</p>\n\
</div>',
		setupString: 'function() {\n\
  $("#important-buttons-longtext-container .btn").click(function() {\n\
    alert("Important button with longtext clicked");\n\
  });\n\
}'
};

    data.setup = new Function('return ' + data.setupString).call(this);

    return data;
});