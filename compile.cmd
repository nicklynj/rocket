echo off
cls

if not exist build mkdir build
if not exist doc mkdir doc

echo documenting...
php -f doc.php

echo generating...
php -f manifest.php

echo developing...

if exist build\rocket.development.js del build\rocket.development.js
for /F "tokens=*" %%A in (build\manifest_lines) do type %%A >> build\rocket.development.js

echo linting...
gjslint.exe --strict --time --custom_jsdoc_tags=namespace,example,name,ignore,version,memberof,test -r src

echo compiling...
echo|set /p=java -jar C:\git\closure-compiler\target\closure-compiler-1.0-SNAPSHOT.jar --compilation_level SIMPLE_OPTIMIZATIONS --use_types_for_optimization --externs src\externs.js --js_output_file build\rocket.js > build\temp.bat
type build\manifest_spaces >> build\temp.bat

call build\temp.bat

echo checking...
echo|set /p=java -jar C:\git\closure-compiler\target\closure-compiler-1.0-SNAPSHOT.jar --warning_level VERBOSE --compilation_level ADVANCED_OPTIMIZATIONS --externs src\externs.js --summary_detail_level 3 --formatting PRETTY_PRINT --extra_annotation_name test --jscomp_warning=* --jscomp_off=missingRequire --jscomp_off=missingProvide > build\temp.bat
type build\manifest_spaces >> build\temp.bat

call build\temp.bat

echo cleaning...
del build\manifest*
del build\temp*
