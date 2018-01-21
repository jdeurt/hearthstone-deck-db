@echo off

echo This script will install everything you need to get this bot running.

cd /d %~dp0
npm install discord.js
npm install -g nodemon

echo Done! You may close this window now.
pause
