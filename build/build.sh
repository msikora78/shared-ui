# To generate final shared lib, run 'sh build.sh' from this file's folder.
echo
echo
OUTDIR=out

echo "Creating \"$OUTDIR\" directory tree"
mkdir $OUTDIR
mkdir $OUTDIR/js
mkdir $OUTDIR/css


### JAVASCRIPT ###

echo "Copying Javascript source"
# use fully qualified file names
cp ../js/tm/core.js $OUTDIR/js/tm.js
cp ../js/tm/cookie.js $OUTDIR/js/tm.cookie.js
cp ../js/tm/string.js $OUTDIR/js/tm.string.js
cp ../js/tm/date.js $OUTDIR/js/tm.date.js
cp ../js/tm/shortlink.js $OUTDIR/js/tm.shortlink.js
cp ../js/tm/widgets/widgetFactory.js $OUTDIR/js/tm.widgets.widgetFactory.js
cp ../js/tm/widgets/modalDialog.js $OUTDIR/js/tm.widgets.modalDialog.js

echo "Concatenating Javascript (tm-all.js)"
cat $OUTDIR/js/tm.js \
    $OUTDIR/js/tm.cookie.js \
    $OUTDIR/js/tm.string.js \
    $OUTDIR/js/tm.date.js \
    $OUTDIR/js/tm.shortlink.js \
    $OUTDIR/js/tm.widgets.widgetFactory.js \
    $OUTDIR/js/tm.widgets.modalDialog.js \
    > $OUTDIR/js/tm-all.js

# uglify
echo "Uglifying Javascript (tm-all.min.js)"
cat $OUTDIR/js/tm-all.js | uglifyjs -nc -o $OUTDIR/js/tm-all.min.js


### CSS ###

echo "Copying CSS source"
cp ../css/tm360-base.css $OUTDIR/css/tm360-base.css
cp ../css/tm360-universal.css $OUTDIR/css/tm360-universal.css
cp ../css/tm360-shortlink.css $OUTDIR/css/tm360-shortlink.css

#echo "compile LESS to CSS"
#lessc ../less/tm360-sample.less > $OUTDIR/css/tm360-sample.css

echo "Concatenating CSS (tm360-all.css)"
cat $OUTDIR/css/tm360-base.css \
    $OUTDIR/css/tm360-universal.css \
    $OUTDIR/css/tm360-shortlink.css \
    > $OUTDIR/css/tm360-all.css

echo "Minifying CSS (tm360-all.min.css)"
lessc -x $OUTDIR/css/tm360-all.css > $OUTDIR/css/tm360-all.min.css

echo "shared-ui build DONE!"
echo