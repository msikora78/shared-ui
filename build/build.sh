mkdir out

cat ../js/tm/core.js \
    ../js/tm/cookie.js \
    ../js/tm/string.js \
    ../js/tm/date.js \
    ../js/tm/widgets/widgetFactory.js \
    ../js/tm/widgets/modalDialog.js \
    > out/tm-all.js

uglifyjs -o out/tm-all.min.js out/tm-all.js

#Fully qualified file names
cp ../js/tm/core.js out/tm.js
cp ../js/tm/cookie.js out/tm.cookie.js
cp ../js/tm/string.js out/tm.string.js
cp ../js/tm/date.js out/tm.date.js
