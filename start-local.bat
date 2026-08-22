@echo off
setlocal

cd /d "%~dp0"
title Ken Resume Local Server

where node >nul 2>nul
if errorlevel 1 (
  echo [ERROR] Node.js not found in PATH.
  echo Install Node.js or open this BAT from a shell where node is available.
  pause
  exit /b 1
)

echo.
echo Ken Huang Resume - Local Preview
echo Local: http://127.0.0.1:4321/
echo.

echo Building latest local content...
call npm run build
if errorlevel 1 (
  echo.
  echo [ERROR] Build failed.
  pause
  exit /b 1
)

curl.exe -fsS --max-time 2 http://127.0.0.1:4321/ >nul 2>nul
if not errorlevel 1 (
  echo.
  echo Local server is already running.
  echo Just refresh: http://127.0.0.1:4321/
  echo.
  pause
  exit /b 0
)

netstat -ano | findstr ":4321" | findstr "LISTENING" >nul 2>nul
if not errorlevel 1 (
  echo.
  echo [ERROR] Port 4321 is occupied, but it is not serving the resume site.
  echo Close the process using port 4321, then run this BAT again.
  echo.
  netstat -ano | findstr ":4321"
  echo.
  pause
  exit /b 1
)

echo Starting local/LAN/Tailscale server on 0.0.0.0:4321...
echo Press Ctrl+C to stop the server.
echo.

node scripts\dev-server.mjs

echo.
echo Server stopped.
pause
