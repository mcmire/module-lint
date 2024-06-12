#!/usr/bin/env bash

if [[ -z "$PROJECT_NAME" ]]; then
  echo "Missing PROJECT_NAME."
  exit 1
fi

yarn run-tool "$PROJECT_NAME" | tee "/tmp/module-lint-report"
