@echo off
chcp 65001 >nul
cls
echo ===================================
echo   Game Server Launcher
echo ===================================
echo.
echo Starting local HTTP server...
echo.
echo Server URL: http://localhost:8000
echo Press Ctrl+C to stop the server
echo.

python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python not found. Please install Python first.
    pause
    exit /b 1
)

timeout /t 2 /nobreak >nul
start "" http://localhost:8000
python -m http.server 8000
