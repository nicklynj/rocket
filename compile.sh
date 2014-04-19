#!/bin/bash

clear

mkdir -p build
mkdir -p doc

echo documenting
php -f doc/hermes.php

echo generating development...

cat src/rocket.js                                  > build/rocket.development.js

cat src/inherits.js                               >> build/rocket.development.js
cat src/event.js                                  >> build/rocket.development.js
cat src/eventlistener.js                          >> build/rocket.development.js
cat src/eventtarget.js                            >> build/rocket.development.js
cat src/expando.js                                >> build/rocket.development.js
cat src/guid.js                                   >> build/rocket.development.js
cat src/elements.js                               >> build/rocket.development.js
cat src/xmlhttprequest.js                         >> build/rocket.development.js
cat src/disposable.js                             >> build/rocket.development.js
cat src/component.js                              >> build/rocket.development.js
cat src/input.js                                  >> build/rocket.development.js
cat src/autoselect.js                             >> build/rocket.development.js
cat src/autosuggest.js                            >> build/rocket.development.js
cat src/autotab.js                                >> build/rocket.development.js
cat src/dateinput.js                              >> build/rocket.development.js
cat src/timeinput.js                              >> build/rocket.development.js

cat src/$.js                                      >> build/rocket.development.js
cat src/arrayify.js                               >> build/rocket.development.js
cat src/bind.js                                   >> build/rocket.development.js
cat src/chunk.js                                  >> build/rocket.development.js
cat src/clamp.js                                  >> build/rocket.development.js
cat src/clone.js                                  >> build/rocket.development.js
cat src/construct.js                              >> build/rocket.development.js
cat src/cookie.js                                 >> build/rocket.development.js
cat src/createelement.js                          >> build/rocket.development.js
cat src/dateisostring.js                          >> build/rocket.development.js
cat src/debounce.js                               >> build/rocket.development.js
cat src/equal.js                                  >> build/rocket.development.js
cat src/every.js                                  >> build/rocket.development.js
cat src/extend.js                                 >> build/rocket.development.js
cat src/filter.js                                 >> build/rocket.development.js
cat src/flip.js                                   >> build/rocket.development.js
cat src/foreach.js                                >> build/rocket.development.js
cat src/htmlentities.js                           >> build/rocket.development.js
cat src/indexof.js                                >> build/rocket.development.js
cat src/insertrule.js                             >> build/rocket.development.js
cat src/isarray.js                                >> build/rocket.development.js
cat src/isempty.js                                >> build/rocket.development.js
cat src/json.js                                   >> build/rocket.development.js
cat src/key.js                                    >> build/rocket.development.js
cat src/keys.js                                   >> build/rocket.development.js
cat src/lastindexof.js                            >> build/rocket.development.js
cat src/lexeme.js                                 >> build/rocket.development.js
cat src/load.js                                   >> build/rocket.development.js
cat src/map.js                                    >> build/rocket.development.js
cat src/now.js                                    >> build/rocket.development.js
cat src/numberformat.js                           >> build/rocket.development.js
cat src/object.js                                 >> build/rocket.development.js
cat src/padleft.js                                >> build/rocket.development.js
cat src/padright.js                               >> build/rocket.development.js
cat src/pluck.js                                  >> build/rocket.development.js
cat src/queryselectorall.js                       >> build/rocket.development.js
cat src/random.js                                 >> build/rocket.development.js
cat src/range.js                                  >> build/rocket.development.js
cat src/ready.js                                  >> build/rocket.development.js
cat src/reduce.js                                 >> build/rocket.development.js
cat src/reduceright.js                            >> build/rocket.development.js
cat src/setinterval.js                            >> build/rocket.development.js
cat src/settimeout.js                             >> build/rocket.development.js
cat src/some.js                                   >> build/rocket.development.js
cat src/sort.js                                   >> build/rocket.development.js
cat src/step.js                                   >> build/rocket.development.js
cat src/strtodate.js                              >> build/rocket.development.js
cat src/strtotime.js                              >> build/rocket.development.js
cat src/sum.js                                    >> build/rocket.development.js
cat src/table.js                                  >> build/rocket.development.js
cat src/throttle.js                               >> build/rocket.development.js
cat src/trim.js                                   >> build/rocket.development.js
cat src/trimleft.js                               >> build/rocket.development.js
cat src/trimright.js                              >> build/rocket.development.js
cat src/unique.js                                 >> build/rocket.development.js
cat src/values.js                                 >> build/rocket.development.js
cat src/version.js                                >> build/rocket.development.js

echo linting
time gjslint --strict --time --custom_jsdoc_tags=namespace,example,name,ignore,memberof,version,test -r src


echo compile simple optimizations
time java -jar ~/Desktop/closure-compiler/build/compiler.jar  --compilation_level SIMPLE_OPTIMIZATIONS --use_types_for_optimization --externs src/externs.js --js_output_file build/rocket.js \
 \
--js src/rocket.js \
 \
--js src/inherits.js \
--js src/event.js \
--js src/eventlistener.js \
--js src/eventtarget.js \
--js src/expando.js \
--js src/guid.js \
--js src/elements.js \
--js src/xmlhttprequest.js \
--js src/disposable.js \
--js src/component.js \
--js src/input.js \
--js src/autoselect.js \
--js src/autosuggest.js \
--js src/autotab.js \
--js src/dateinput.js \
--js src/timeinput.js \
 \
--js src/$.js \
--js src/arrayify.js \
--js src/bind.js \
--js src/chunk.js \
--js src/clamp.js \
--js src/clone.js \
--js src/construct.js \
--js src/cookie.js \
--js src/createelement.js \
--js src/dateisostring.js \
--js src/debounce.js \
--js src/equal.js \
--js src/every.js \
--js src/extend.js \
--js src/filter.js \
--js src/flip.js \
--js src/foreach.js \
--js src/htmlentities.js \
--js src/indexof.js \
--js src/insertrule.js \
--js src/isarray.js \
--js src/isempty.js \
--js src/json.js \
--js src/key.js \
--js src/keys.js \
--js src/lastindexof.js \
--js src/lexeme.js \
--js src/load.js \
--js src/map.js \
--js src/now.js \
--js src/numberformat.js \
--js src/object.js \
--js src/padleft.js \
--js src/padright.js \
--js src/pluck.js \
--js src/queryselectorall.js \
--js src/random.js \
--js src/range.js \
--js src/ready.js \
--js src/reduce.js \
--js src/reduceright.js \
--js src/setinterval.js \
--js src/settimeout.js \
--js src/some.js \
--js src/sort.js \
--js src/step.js \
--js src/strtodate.js \
--js src/strtotime.js \
--js src/sum.js \
--js src/table.js \
--js src/throttle.js \
--js src/trim.js \
--js src/trimleft.js \
--js src/trimright.js \
--js src/unique.js \
--js src/values.js \
--js src/version.js


echo compile advanced optimizations
time java -jar ~/Desktop/closure-compiler/build/compiler.jar --warning_level VERBOSE --compilation_level ADVANCED_OPTIMIZATIONS --externs src/externs.js --summary_detail_level 3 --formatting PRETTY_PRINT --manage_closure_dependencies --jscomp_warning accessControls --jscomp_warning ambiguousFunctionDecl --jscomp_warning checkEventfulObjectDisposal --jscomp_warning checkRegExp --jscomp_warning checkStructDictInheritance --jscomp_warning checkTypes --jscomp_warning checkVars --jscomp_warning const --jscomp_warning constantProperty --jscomp_warning deprecated --jscomp_warning duplicateMessage --jscomp_warning es3 --jscomp_warning es5Strict --jscomp_warning externsValidation --jscomp_warning fileoverviewTags --jscomp_warning globalThis --jscomp_warning internetExplorerChecks --jscomp_warning invalidCasts --jscomp_warning misplacedTypeAnnotation --jscomp_warning missingProperties --jscomp_warning missingProvide --jscomp_warning missingRequire --jscomp_warning missingReturn --jscomp_warning nonStandardJsDocs --jscomp_warning reportUnknownTypes --jscomp_warning suspiciousCode --jscomp_warning strictModuleDepCheck --jscomp_warning typeInvalidation --jscomp_warning undefinedNames --jscomp_warning undefinedVars --jscomp_warning unknownDefines --jscomp_warning uselessCode --use_types_for_optimization --jscomp_warning visibility --extra_annotation_name test \
 \
--js src/rocket.js \
 \
--js src/inherits.js \
--js src/event.js \
--js src/eventlistener.js \
--js src/eventtarget.js \
--js src/expando.js \
--js src/guid.js \
--js src/elements.js \
--js src/xmlhttprequest.js \
--js src/disposable.js \
--js src/component.js \
--js src/input.js \
--js src/autoselect.js \
--js src/autosuggest.js \
--js src/autotab.js \
--js src/dateinput.js \
--js src/timeinput.js \
 \
--js src/$.js \
--js src/arrayify.js \
--js src/bind.js \
--js src/chunk.js \
--js src/clamp.js \
--js src/clone.js \
--js src/construct.js \
--js src/cookie.js \
--js src/createelement.js \
--js src/dateisostring.js \
--js src/debounce.js \
--js src/equal.js \
--js src/every.js \
--js src/extend.js \
--js src/filter.js \
--js src/flip.js \
--js src/foreach.js \
--js src/htmlentities.js \
--js src/indexof.js \
--js src/insertrule.js \
--js src/isarray.js \
--js src/isempty.js \
--js src/json.js \
--js src/key.js \
--js src/keys.js \
--js src/lastindexof.js \
--js src/lexeme.js \
--js src/load.js \
--js src/map.js \
--js src/now.js \
--js src/numberformat.js \
--js src/object.js \
--js src/padleft.js \
--js src/padright.js \
--js src/pluck.js \
--js src/queryselectorall.js \
--js src/random.js \
--js src/range.js \
--js src/ready.js \
--js src/reduce.js \
--js src/reduceright.js \
--js src/setinterval.js \
--js src/settimeout.js \
--js src/some.js \
--js src/sort.js \
--js src/step.js \
--js src/strtodate.js \
--js src/strtotime.js \
--js src/sum.js \
--js src/table.js \
--js src/throttle.js \
--js src/trim.js \
--js src/trimleft.js \
--js src/trimright.js \
--js src/unique.js \
--js src/values.js \
--js src/version.js
