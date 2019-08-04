#!/bin/bash

# build code from /src to /dist
# use babel and include non-JS files
rm -rf dist && mkdir dist
npx babel src --out-dir dist --copy-files