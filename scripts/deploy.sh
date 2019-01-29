#!/usr/bin/env bash
firebase deploy --only hosting:app --token "$FIREBASE_TOKEN"
firebase deploy --only hosting:website --token "$FIREBASE_TOKEN"
