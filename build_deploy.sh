#!/bin/bash
default_message_commit="Update code"
default_publish="publish-patch"
npm run build
git add .
git commit -m "${1:-default_message_commit}"
git push origin master
npm run "${2:-default_publish}"
