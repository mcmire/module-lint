#!/usr/bin/env bash

if [[ -z "$PROJECT_NAME" ]]; then
  echo "Missing PROJECT_NAME."
  exit 1
fi

yarn run-tool "$PROJECT_NAME" > /tmp/module-lint-report.txt

exitcode=$?

cat /tmp/module-lint-report.txt

if [[ $exitcode -ne 0 && $exitcode -ne -127 ]]; then
  exit 1
else
  exit 0
fi
