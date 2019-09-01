#! /bin/bash
cat sc3_modhandler.js > sc3_mods.src.js
cat mods/* >> sc3_mods.src.js
java -jar compiler.jar --compilation_level ADVANCED_OPTIMIZATIONS --assume_function_wrapper --externs=externs.js --js=sc3_mods.src.js --language_out=ECMASCRIPT_2019 --js_output_file=sc3_mods.min.js
echo "`stat -f%z sc3_mods.min.js` bytes"