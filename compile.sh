#!/bin/bash

clear

mkdir -p build
mkdir -p doc

echo documenting...
if hash php5.5 2>/dev/null; then
  php5.5 -f doc.php
else
  php -f doc.php
fi

echo generating...
if hash php5.5 2>/dev/null; then
  php5.5 -f manifest.php
else
  php -f manifest.php
fi

echo developing...
rm -f build/rocket.development.js
cat build/manifest_lines | xargs cat >> build/rocket.development.js

if hash gjslint; then
	echo linting...
	time gjslint --strict --time --custom_jsdoc_tags=namespace,example,name,ignore,memberof,version,test -r src
fi

#echo compiling...
# [todo:]

#echo checking...
# [todo:]

echo cleaning...
rm -f build/manifest*
rm -f build/temp*
