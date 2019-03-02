#!/usr/bin/env bash
firebase use hackpsu18 --token "$FIREBASE_TOKEN"
firebase deploy --only hosting:app --token "$FIREBASE_TOKEN"
firebase deploy --only hosting:website --token "$FIREBASE_TOKEN"
