#!/usr/bin/env bash

echo "<link rel=\"stylesheet\" href=\"vendor/bootstrap/bootstrap-4.0.0.min.css\" \
integrity=\"sha384-$(shasum -b -a 384 vendor/bootstrap/bootstrap-4.0.0.min.css | xxd -r -p | base64)\" />"

echo "<script src=\"vendor/jquery/jquery-3.3.1.min.js\" \
integrity=\"sha384-$(shasum -b -a 384 vendor/jquery/jquery-3.3.1.min.js | xxd -r -p | base64)\"></script>"

echo "<script src=\"vendor/bootstrap/bootstrap-4.0.0.min.js\" \
integrity=\"sha384-$(shasum -b -a 384 vendor/bootstrap/bootstrap-4.0.0.min.js | xxd -r -p | base64)\"></script>"
