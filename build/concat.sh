mkdir out

cat ../js/tm/core.js \
    ../js/tm/cookie.js \
    ../js/tm/string.js \
    ../js/tm/date.js \
    ../js/tm/widgets/widgetFactory.js \
    ../js/tm/widgets/modalDialog.js \
    > out/tm-all.js

uglifyjs -o out/tm-all.min.js out/tm-all.js