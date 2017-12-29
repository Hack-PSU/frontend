#!/usr/bin/env bash
echo $DEPLOY_FB
if [[ $DEPLOY_FB -eq 0 ]]
then
    cd api;
    npm install;
    DEPLOY_FB=1;
fi