# To generate final shared lib, run 'sh build.sh' from this file's folder.
echo
read -p "Please enter a version number:"
VERSION=${REPLY:-0.1}

OUTDIR=out
OUTDIR_JS=$OUTDIR/js/tm360-$VERSION
OUTDIR_CSS=$OUTDIR/css/tm360-$VERSION

echo "Creating directories \"$OUTDIR_JS\" and \"$OUTDIR_CSS\""
mkdir -p $OUTDIR_JS
mkdir -p $OUTDIR_CSS


### JAVASCRIPT ###

echo "Copying Javascript source"
# use fully qualified file names
cp ../js/tm/core.js $OUTDIR_JS/tm.js
cp ../js/tm/cookie.js $OUTDIR_JS/tm.cookie.js
cp ../js/tm/string.js $OUTDIR_JS/tm.string.js
cp ../js/tm/date.js $OUTDIR_JS/tm.date.js
cp ../js/tm/shortlink.js $OUTDIR_JS/tm.shortlink.js
cp ../js/tm/widgets/widgetFactory.js $OUTDIR_JS/tm.widgets.widgetFactory.js
cp ../js/tm/widgets/modalDialog.js $OUTDIR_JS/tm.widgets.modalDialog.js

echo "Concatenating Javascript (tm-all.js)"
cat $OUTDIR_JS/tm.js \
    $OUTDIR_JS/tm.cookie.js \
    $OUTDIR_JS/tm.string.js \
    $OUTDIR_JS/tm.date.js \
    $OUTDIR_JS/tm.shortlink.js \
    $OUTDIR_JS/tm.widgets.widgetFactory.js \
    $OUTDIR_JS/tm.widgets.modalDialog.js \
    > $OUTDIR_JS/tm-all.js

echo "Uglifying Javascript (tm-all.min.js)"
cat $OUTDIR_JS/tm-all.js | uglifyjs -nc -o $OUTDIR_JS/tm-all.min.js


### CSS ###

echo "Copying CSS, images, and MuseoSans font"
cp -R ../css/ $OUTDIR_CSS

#echo "compile LESS to CSS"
#lessc ../less/tm360-sample.less > $OUTDIR_CSS/tm360-sample.css

echo "Concatenating CSS (tm360-all.css)"
cat $OUTDIR_CSS/tm360-base.css \
    $OUTDIR_CSS/tm360-universal.css \
    $OUTDIR_CSS/tm360-shortlink.css \
    > $OUTDIR_CSS/tm360-all.css

echo "Minifying CSS (tm360-all.min.css)"
lessc -x $OUTDIR_CSS/tm360-all.css > $OUTDIR_CSS/tm360-all.min.css

echo "shared-ui tm360-$VERSION build DONE!"
echo