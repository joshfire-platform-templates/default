cd app/ && node ../../joshfire-framework/build/optimizer/concat.js build/build.js
rm export-optimized/*.optimized.js
for JS in `ls export-optimized/*.js`
do
  echo "found $JS"
  sh -c "uglifyjs $JS > $JS.optimized.js"
  #sh -c "cp $JS $JS.optimized.js"
  sh -c "rm $JS"
done