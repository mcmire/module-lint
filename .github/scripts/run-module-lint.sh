#!/usr/bin/env bash

if [[ -z "$PROJECT_NAME" ]]; then
  echo "Missing PROJECT_NAME."
  exit 1
fi

mkdir -p "/tmp/module-lint/$PROJECT_NAME"
yarn run-tool "$PROJECT_NAME" > "/tmp/module-lint/$PROJECT_NAME/output"
exitcode=$?
echo $exitcode > "/tmp/module-lint/$PROJECT_NAME/exitcode"
exit $exitcode
