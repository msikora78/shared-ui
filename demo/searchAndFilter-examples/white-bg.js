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
        js: function(){
            var input = $('#search-filter-container .search-query');
            input.tmSearchAndFilter();
            input.parents('form').submit(function(){
                alert('submitted \"' + input.val() + '\"');
                return false;
            });
        }
    };

    return data;
});