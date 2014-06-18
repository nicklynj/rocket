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
c:\python\scripts\gjslint.exe --strict --time --custom_jsdoc_tags=namespace,example,name,ignore,version,memberof,test -r src

echo compiling...
echo|set /p=java -jar C:\git\closure-compiler\build\compiler.jar --compilation_level SIMPLE_OPTIMIZATIONS --use_types_for_optimization --externs src\externs.js --js_output_file build\rocket.js > build\temp.bat
type build\manifest_spaces >> build\temp.bat

call build\temp.bat

echo checking...
echo|set /p=java -jar C:\git\closure-compiler\build\compiler.jar --warning_level VERBOSE --compilation_level ADVANCED_OPTIMIZATIONS --externs src\externs.js --summary_detail_level 3 --formatting PRETTY_PRINT --manage_closure_dependencies --jscomp_warning accessControls --jscomp_warning ambiguousFunctionDecl --jscomp_warning checkEventfulObjectDisposal --jscomp_warning checkRegExp --jscomp_warning checkStructDictInheritance --jscomp_warning checkTypes --jscomp_warning checkVars --jscomp_warning const --jscomp_warning constantProperty --jscomp_warning deprecated --jscomp_warning duplicateMessage --jscomp_warning es3 --jscomp_warning es5Strict --jscomp_warning externsValidation --jscomp_warning fileoverviewTags --jscomp_warning globalThis --jscomp_warning internetExplorerChecks --jscomp_warning invalidCasts --jscomp_warning misplacedTypeAnnotation --jscomp_warning missingProperties --jscomp_warning missingProvide --jscomp_warning missingRequire --jscomp_warning missingReturn --jscomp_warning nonStandardJsDocs --jscomp_warning reportUnknownTypes --jscomp_warning suspiciousCode --jscomp_warning strictModuleDepCheck --jscomp_warning typeInvalidation --jscomp_warning undefinedNames --jscomp_warning undefinedVars --jscomp_warning unknownDefines --jscomp_warning uselessCode --use_types_for_optimization --jscomp_warning visibility --extra_annotation_name test > build\temp.bat
type build\manifest_spaces >> build\temp.bat

call build\temp.bat

echo cleaning...
del build\manifest*
del build\temp*
