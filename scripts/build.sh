#!/usr/bin/env bash
set -e # fail on first error
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )/.."
cd "${DIR}"

#§ 'IMAGE="node:' + data.config.npm.node.version + '-alpine"'
IMAGE="node:10.12-alpine"

docker run --rm \
  -w "/app" \
  --volume="$PWD:/app:rw" \
  "${IMAGE}"
  sh -c "npm install && NODE_ENV=production npm run build | tr -d '{}[]'"
