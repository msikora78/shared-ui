define(['jquery', 'widget!tm/widgets/searchAndFilter'], function($) {

    var data = {
        legend: 'White Background',
        html:'\
<div id="search-filter-container">\n\
  <form class="form-search">\n\
    <div style="position: relative;">\n\
      <input type="text" class="input-medium search-query" placeholder="Search 1" />\n\
      <i class="search-clear-icon"></i>\n\
    </div>\n\
  </form>\n\
</div>',
        setupString: "function(){\n\
            var input = $('#search-filter-container .search-query');\n\
            input.tmSearchAndFilter();\n\
            input.parents('form').submit(function(){\n\
                alert('submitted \"' + input.val() + '\"');\n\
                return false;\n\
            });\n\
        }"
    };

    data.setup = new Function('$', 'return ' + data.setupString).call(this, $);

    return data;
});