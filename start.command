#!/bin/bash
cd "$(dirname "$0")"
open -a Terminal .
sleep 1
open http://localhost:3000 &
node server.js
