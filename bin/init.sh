#!/bin/bash

PROJECT="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )/../../.."
echo "dir = ${PROJECT}"

cd $PROJECT
npm init -y
npm install moment