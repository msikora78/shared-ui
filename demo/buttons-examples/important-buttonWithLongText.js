define(['jquery'], function($) {

    var data = {
        legend: 'Important button with long text',
        html:'\
<p>\n\
  <button type="button" id="default-state-button-long-text" class="btn btn-success">Button with a very very long text</button>\n\
</p>\n'+
'<p>\n\
  <button type="button" id="inactive-state-button-long-text" class="btn btn-success disabled">Inactive button with a very long text</button>\n\
</p>'
};

    data.setup = new Function('return ' + data.setupString).call(this);

    return data;
});