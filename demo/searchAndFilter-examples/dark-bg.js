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
        js: function(){
            var input = $('#search-filter-container-dark .search-query');
            input.tmSearchAndFilter();
            input.parents('form').submit(function(){
                alert('submitted \"' + input.val() + '\"');
                return false;
            });
        }
    };

    return data;
});