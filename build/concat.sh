cat ../js/tm/core.js \
    ../js/tm/cookie.js \
    ../js/tm/string.js \
    ../js/tm/date.js \
    ../js/tm/widgets/widgetFactory.js \
    ../js/tm/widgets/modalDialog.js \
    > tm-all.js

uglifyjs -o tm-all.min.js tm-all.js