tm360 Shared Components
=======================

###Goals 
- provide a reusable set of components for tm360 gadgets
- promote a consistent user experience
- foster an open source community for sharing code
- speed up the development process for tm360 gadgets

###Shared Components should: 
- include Dynamic, data driven documentation -- http://usejsdoc.org
- support desktop and mobile (tablet) rendering
- include Jasmine tests for Javascript

###Existing UX Components:
- Layout management and uniform App structure -- 2-width snapping framework per https://confluence.tm.tmcs/confluence/display/UE/TM360#TM360-TM360FrameworkDesignSpecifications
- Font CSS Classes (MuseoSans, Arial)
- App Icons
- AJAX templates

###Proposed UX Components
- Event Viewport (List Pane)
- Common Components -- Universal UI per https://confluence.tm.tmcs/confluence/display/UE/Permissioning+App+Specifications#PermissioningAppSpecifications-UniversalUIElements

###Existing 3rd-party libraries
CSS
- /shared/css/lib/html5boilerplate-base.css
- /shared/css/lib/html5boilerplate-last.css
- /shared/css/lib/jquery.selectBox.css
- /shared/css/lib/jquery-ui/ui-lightness/jquery-ui-1.8.22.custom.css
- /shared/css/lib/bootstrap-2.1.0/css/bootstrap.min.css

Javascript
- /shared/js/lib/json2.js
- /shared/js/lib/jquery-1.7.2.min.js
- /shared/js/lib/jquery-ui-1.8.22.custom.min.js
- /shared/js/lib/jquery.ui.multidatespicker-1.6.1.js
- /shared/js/lib/jquery.selectBox.js
- /shared/js/lib/underscore_1.3.3.min.js
- /shared/js/lib/jquery.ba-throttle-debounce-1.1.min.js
- /shared/js/lib/bootstrap-2.1.0.min.js
- /shared/js/lib/backbone-0.9.2.min.js
- /shared/js/lib/backbone-marionette-0.9.12.min.js

How to Use
----------
All resources will be deployed to tm360 environments under the /shared folder.

```html

<link rel="stylesheet" type="text/css" href="https://localhost:8080/shared/css/lib/html5boilerplate-base.css" />
<link rel="stylesheet" type="text/css" href="https://localhost:8080/shared/css/lib/jquery-ui/ui-lightness/jquery-ui-1.8.22.custom.css" />
<link rel="stylesheet" type="text/css" href="https://localhost:8080/shared/css/lib/bootstrap-2.1.0/css/bootstrap.min.css" />
<link rel="stylesheet" type="text/css" href="https://localhost:8080/shared/css/tm360-1.0/tm360-base.css" />
<link rel="stylesheet" type="text/css" href="https://localhost:8080/shared/css/tm360-1.0/tm360-universal.css" />
<link rel="stylesheet" type="text/css" href="https://localhost:8080/shared/css/lib/html5boilerplate-last.css" />

<script src="https://localhost:8080/shared/js/lib/json2.js"></script>
<script src="https://localhost:8080/shared/js/lib/jquery-1.7.2.min.js"></script>
<script src="https://localhost:8080/shared/js/lib/jquery-ui-1.8.22.custom.min.js"></script>
<script src="https://localhost:8080/shared/js/lib/jquery.ui.multidatespicker-1.6.1.js"></script>
<script src="https://localhost:8080/shared/js/lib/jquery.selectBox.js"></script>
<script src="https://localhost:8080/shared/js/lib/underscore_1.3.3.min.js"></script>
<script src="https://localhost:8080/shared/js/lib/jquery.ba-throttle-debounce-1.1.min.js"></script>
<script src="https://localhost:8080/shared/js/lib/bootstrap-2.1.0.min.js"></script>
<script src="https://localhost:8080/shared/js/lib/backbone-0.9.2.min.js"></script>
<script src="https://localhost:8080/shared/js/lib/backbone-marionette-0.9.12.min.js"></script>

<script src="https://localhost:8080/shared/js/tm360-1.0/tm.js"></script>
<script src="https://localhost:8080/shared/js/tm360-1.0/tm.string.js"></script>
<script src="https://localhost:8080/shared/js/tm360-1.0/tm.date.js"></script>
<script src="https://localhost:8080/shared/js/tm360-1.0/tm.cookie.js"></script>

```

Note: You can use the "https://localhost:8080/" domain when running your app inside tm360 in any environment (dev, qa, prod). When running your app standalone (outside tm360), you will need to point to a specific environment instead (ex. https://portal.shared.dev2.websys.tmcs/). Using {key} placeholders with ".properties" files is recommended. 

TODO
----
- UX review process (TBD)
- update "What's New" gadget
- update (remove?) https://confluence.tm.tmcs/confluence/display/PJ31/CSS+for+new+app+development
- use Bower? Maven?
