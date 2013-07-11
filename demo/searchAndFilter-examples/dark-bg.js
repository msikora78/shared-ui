define(['jquery', 'widget!tm/widgets/searchAndFilter'], function($) {

    var data = {
        legend: 'Darker Background',
        html:'\
<div id="search-filter-container-dark" class="search-filter-bg">\n\
  <form class="form-search darker">\n\
    <div style="position: relative;">\n\
      <input type="text" class="input-medium search-query" placeholder="Search 2" />\n\
      <i class="search-clear-icon"></i>\n\
    </div>\n\
  </form>\n\
</div>',
        setupString: "function(){\n\
            var input = $('#search-filter-container-dark .search-query');\n\
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