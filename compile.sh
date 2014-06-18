#!/bin/bash

clear

mkdir -p build
mkdir -p doc

echo documenting...
php -f doc.php

echo generating...
php -f manifest.php

echo developing...
rm -f build/rocket.development.js
cat build/manifest_lines | xargs cat >> build/rocket.development.js

# echo linting...
# time gjslint --strict --time --custom_jsdoc_tags=namespace,example,name,ignore,memberof,version,test -r src

#echo compiling...
# [todo:]

#echo checking...
# [todo:]

echo cleaning...
rm build/manifest*
rm build/temp*
