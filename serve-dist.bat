@echo off
echo Starting HTTP server for Angular app...
echo The app will be available at: http://localhost:8080

cd dist\angular-mobile-app

:: Try Python first
python --version >nul 2>&1
if %errorlevel% == 0 (
    echo Using Python HTTP server...
    python -m http.server 8080
    goto :end
)

:: Try http-server
npx http-server --version >nul 2>&1
if %errorlevel% == 0 (
    echo Using Node.js http-server...
    npx http-server . -p 8080 -o
    goto :end
)

:: Install http-server
echo Installing http-server...
npm install -g http-server
npx http-server . -p 8080 -o

:end
echo Press Ctrl+C to stop the server
pause