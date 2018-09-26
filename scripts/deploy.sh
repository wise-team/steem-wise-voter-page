#!/usr/bin/env bash
set -e # fail on first error
set -x
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )/.." # parent dir of scripts dir
cd "${DIR}"

VERSION=$1

if [ -z "${VERSION}" ]; then
    echo "You must specify new version"
    exit 1
fi


REQUIRED_BRANCH="master"
if [ "$(git rev-parse --abbrev-ref HEAD)" != "${REQUIRED_BRANCH}" ]; then
    echo "You must be on a \"${REQUIRED_BRANCH}\" branch to do semver"
    exit 1
fi

if [ ! -z "$(git status --porcelain)" ]; then 
    echo "Working directory (git status) must be clean"
    exit 1
fi


echo "Updating steem-wise-voter-page to ${VERSION}, and updating the version of core-library"
node -e " \
var packageFileContents = require(\"./package.json\"); \
packageFileContents.version = \"${VERSION}\"; \
packageFileContents.dependencies[\"steem-wise-core\"] = \"^${VERSION}\"; \
require('fs').writeFileSync(\"./package.json\", JSON.stringify(packageFileContents, null, 2), \"utf8\"); \
"
echo "Updating version succeeded"


echo "Building..."
npm install
npm run build
echo "Build successful"


echo "Creating git tag"
git add package.json package-lock.json
git commit -m "Semver ${VERSION}"
git push
git tag -a "v${VERSION}" -m "Steem WISE voter page ${VERSION}"
git push --tags
echo "Done creating tag"


echo "Checking out gh-pages branch"
git checkout gh-pages
git merge master -m "Merge master"

echo "Building production version"
NODE_ENV=production npm run build
# mv "${DIR}/dist/index.html" "${DIR}/index.html"
git add dist/
git add index.html
git commit -m "Update gh-pages to version ${VERSION}"
git push

echo "Checking out master"
git checkout master

echo "Done"