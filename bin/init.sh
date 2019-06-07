#!/bin/bash

OLD_DIR=`pwd`

# Find root dir for enclosing project. 
# This relies on the stencil-cocos-common module being placed in $PROJECT/assets/
PROJECT="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )/../../.."
cd $PROJECT

# Initialize npm if no package data exists
if [ ! -f $PROJECT/package.json ]; then
npm init -y
fi

# Install required libraries for common layer
npm install moment

# Navigate back to where we started
cd $OLD_DIR