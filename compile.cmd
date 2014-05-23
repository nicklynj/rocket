echo off
cls

if not exist build mkdir build
if not exist doc mkdir doc

echo. && echo. && echo. && echo. && echo documenting...
php -f doc/hermes.php

echo. && echo. && echo. && echo. && echo generating manifest...
php -f manifest.php

echo. && echo. && echo. && echo. && echo generating development...

if exist build\rocket.development.js del build\rocket.development.js
for /F "tokens=*" %%A in (build\manifest) do type %%A >> build\rocket.development.js

echo. && echo. && echo. && echo. && echo linting...
c:\python\scripts\gjslint.exe --strict --time --custom_jsdoc_tags=namespace,example,name,ignore,version,memberof,test -r src

echo. && echo. && echo. && echo. && echo compiling...
java -jar C:\git\closure-compiler\build\compiler.jar --compilation_level SIMPLE_OPTIMIZATIONS --use_types_for_optimization --externs src\externs.js --js_output_file build\rocket.js ^
 ^
--js src\rocket.js ^
 ^
--js src\inherits.js ^
--js src\event.js ^
--js src\eventlistener.js ^
--js src\eventtarget.js ^
--js src\version.js ^
--js src\expando.js ^
--js src\guid.js ^
--js src\elements.js ^
--js src\xmlhttprequest.js ^
--js src\disposable.js ^
--js src\component.js ^
--js src\input.js ^
--js src\autoselect.js ^
--js src\autosuggest.js ^
--js src\autotab.js ^
--js src\dateinput.js ^
--js src\timeinput.js ^
 ^
--js src\$.js ^
--js src\arrayify.js ^
--js src\bind.js ^
--js src\chunk.js ^
--js src\clamp.js ^
--js src\clone.js ^
--js src\construct.js ^
--js src\cookie.js ^
--js src\createelement.js ^
--js src\dateisostring.js ^
--js src\debounce.js ^
--js src\equal.js ^
--js src\every.js ^
--js src\extend.js ^
--js src\filter.js ^
--js src\flip.js ^
--js src\foreach.js ^
--js src\htmlentities.js ^
--js src\indexof.js ^
--js src\insertrule.js ^
--js src\isarray.js ^
--js src\isempty.js ^
--js src\json.js ^
--js src\key.js ^
--js src\keys.js ^
--js src\lastindexof.js ^
--js src\lexeme.js ^
--js src\load.js ^
--js src\map.js ^
--js src\now.js ^
--js src\numberformat.js ^
--js src\object.js ^
--js src\padleft.js ^
--js src\padright.js ^
--js src\pluck.js ^
--js src\queryselectorall.js ^
--js src\random.js ^
--js src\range.js ^
--js src\ready.js ^
--js src\reduce.js ^
--js src\reduceright.js ^
--js src\setinterval.js ^
--js src\settimeout.js ^
--js src\some.js ^
--js src\sort.js ^
--js src\step.js ^
--js src\strtodate.js ^
--js src\strtotime.js ^
--js src\sum.js ^
--js src\table.js ^
--js src\throttle.js ^
--js src\trim.js ^
--js src\trimleft.js ^
--js src\trimright.js ^
--js src\unique.js ^
--js src\values.js


echo. && echo. && echo. && echo. && echo advanced checking...
java -jar C:\git\closure-compiler\build\compiler.jar --warning_level VERBOSE --compilation_level ADVANCED_OPTIMIZATIONS --externs src\externs.js --summary_detail_level 3 --formatting PRETTY_PRINT --manage_closure_dependencies --jscomp_warning accessControls --jscomp_warning ambiguousFunctionDecl --jscomp_warning checkEventfulObjectDisposal --jscomp_warning checkRegExp --jscomp_warning checkStructDictInheritance --jscomp_warning checkTypes --jscomp_warning checkVars --jscomp_warning const --jscomp_warning constantProperty --jscomp_warning deprecated --jscomp_warning duplicateMessage --jscomp_warning es3 --jscomp_warning es5Strict --jscomp_warning externsValidation --jscomp_warning fileoverviewTags --jscomp_warning globalThis --jscomp_warning internetExplorerChecks --jscomp_warning invalidCasts --jscomp_warning misplacedTypeAnnotation --jscomp_warning missingProperties --jscomp_warning missingProvide --jscomp_warning missingRequire --jscomp_warning missingReturn --jscomp_warning nonStandardJsDocs --jscomp_warning reportUnknownTypes --jscomp_warning suspiciousCode --jscomp_warning strictModuleDepCheck --jscomp_warning typeInvalidation --jscomp_warning undefinedNames --jscomp_warning undefinedVars --jscomp_warning unknownDefines --jscomp_warning uselessCode --use_types_for_optimization --jscomp_warning visibility --extra_annotation_name test ^
 ^
--js src\rocket.js ^
--js src\inherits.js ^
 ^
--js src\event.js ^
--js src\eventlistener.js ^
--js src\eventtarget.js ^
--js src\version.js ^
--js src\expando.js ^
--js src\guid.js ^
--js src\elements.js ^
--js src\xmlhttprequest.js ^
--js src\disposable.js ^
--js src\component.js ^
--js src\input.js ^
--js src\autoselect.js ^
--js src\autosuggest.js ^
--js src\autotab.js ^
--js src\dateinput.js ^
--js src\timeinput.js ^
 ^
--js src\$.js ^
--js src\arrayify.js ^
--js src\bind.js ^
--js src\chunk.js ^
--js src\clamp.js ^
--js src\clone.js ^
--js src\construct.js ^
--js src\cookie.js ^
--js src\createelement.js ^
--js src\dateisostring.js ^
--js src\debounce.js ^
--js src\equal.js ^
--js src\every.js ^
--js src\extend.js ^
--js src\filter.js ^
--js src\flip.js ^
--js src\foreach.js ^
--js src\htmlentities.js ^
--js src\indexof.js ^
--js src\insertrule.js ^
--js src\isarray.js ^
--js src\isempty.js ^
--js src\json.js ^
--js src\key.js ^
--js src\keys.js ^
--js src\lastindexof.js ^
--js src\lexeme.js ^
--js src\load.js ^
--js src\map.js ^
--js src\now.js ^
--js src\numberformat.js ^
--js src\object.js ^
--js src\padleft.js ^
--js src\padright.js ^
--js src\pluck.js ^
--js src\queryselectorall.js ^
--js src\random.js ^
--js src\range.js ^
--js src\ready.js ^
--js src\reduce.js ^
--js src\reduceright.js ^
--js src\setinterval.js ^
--js src\settimeout.js ^
--js src\some.js ^
--js src\sort.js ^
--js src\step.js ^
--js src\strtodate.js ^
--js src\strtotime.js ^
--js src\sum.js ^
--js src\table.js ^
--js src\throttle.js ^
--js src\trim.js ^
--js src\trimleft.js ^
--js src\trimright.js ^
--js src\unique.js ^
--js src\values.js
