#!/usr/bin/env bash

if [[ -z "$PROJECT_NAME" ]]; then
  echo "Missing PROJECT_NAME."
  exit 1
fi

{
  echo 'OUTPUT<<EOF'
  yarn run-tool "$PROJECT_NAME"
  exitcode=$?
  echo EOF
} >> "$GITHUB_ENV"
