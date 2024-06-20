#!/usr/bin/env bash

if [[ -z "$PROJECT_NAME" ]]; then
  echo "Missing PROJECT_NAME."
  exit 1
fi

directory=/tmp/module-lint-run

mkdir -p "$directory"

yarn run-tool "$PROJECT_NAME" > "$directory/$PROJECT_NAME--output.txt"

exitcode=$?

echo $exitcode > "$directory/$PROJECT_NAME--exitcode.txt"

cat "$directory/output.txt"

if [[ $exitcode -ne 0 && $exitcode -ne 100 ]]; then
  exit 1
else
  exit 0
fi
