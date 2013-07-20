define(['jquery', 'widget!tm/widgets/tabbedContainer'], function($) {
    'use strict';

    var data = {
        legend: 'Overview White background vs Alternate. Simple tab from bootstrap extended to respect tm360 style.',
        description: 'Tabbed Container will always take 100% of space of where is placed.',
        html:'\
            <label>White background: </label>\n\
            <div style="padding: 20px">\n\
                <div id="tabbed-container-overview1" class="tabbed-container">\n\
                    <ul class="nav nav-pills">\n\
                        <li>\n\
                            <a href="#tab1">Tab One</a>\n\
                        </li>\n\
                        <li>\n\
                            <a href="#tab2">Tab Two</a>\n\
                        </li>\n\
                        <li>\n\
                            <a href="#tab3">Tab Three</a>\n\
                        </li>\n\
                        <li>\n\
                            <a href="#tab4">Tab Four</a>\n\
                        </li>\n\
                        <li>\n\
                            <a href="#tab5">Tab Five</a>\n\
                        </li>\n\
                    </ul>\n\
                    <div class="tab-content">\n\
                        <div id="tab1" class="tab-pane active">Container for Tab One</div>\n\
                        <div id="tab2" class="tab-pane">Container for Tab Two</div>\n\
                        <div id="tab3" class="tab-pane">Container for Tab Three</div>\n\
                        <div id="tab4" class="tab-pane">Container for Tab Four</div>\n\
                        <div id="tab5" class="tab-pane">Container for Tab Five</div>\n\
                    </div>\n\
                </div>\n\
                <label>Alternate: </label>\n\
                <div class="bg-soft-grey" style="padding: 20px">\n\
                    <div id="tabbed-container-overview2" class="tabbed-container">\n\
                        <ul class="nav nav-pills">\n\
                            <li>\n\
                                <a href="#grey-tab1">Tab One</a>\n\
                            </li>\n\
                            <li>\n\
                                <a href="#grey-tab2">Tab Two</a>\n\
                            </li>\n\
                            <li class="active">\n\
                                <a href="#grey-tab3">Tab Three</a>\n\
                            </li>\n\
                            <li>\n\
                                <a href="#grey-tab4">Tab Four</a>\n\
                            </li>\n\
                            <li>\n\
                                <a href="#grey-tab5">Tab Five</a>\n\
                            </li>\n\
                        </ul>\n\
                        <div class="tab-content">\n\
                            <div id="grey-tab1" class="tab-pane active">Container for Tab One</div>\n\
                            <div id="grey-tab2" class="tab-pane">Container for Tab Two</div>\n\
                            <div id="grey-tab3" class="tab-pane">Container for Tab Three</div>\n\
                            <div id="grey-tab4" class="tab-pane">Container for Tab Four</div>\n\
                            <div id="grey-tab5" class="tab-pane">Container for Tab Five</div>\n\
                        </div>\n\
                    </div>\n\
                </div>\n\
            </div>',
        js: function() {
            $("#tabbed-container-overview1").tmTabbedContainer();
            $("#tabbed-container-overview2").tmTabbedContainer();
        }
    };

    return data;
});