# PowerShell script to serve the Angular dist folder
# This script starts a simple HTTP server to serve your Angular app

Write-Host "Starting HTTP server for Angular app..." -ForegroundColor Green
Write-Host "The app will be available at: http://localhost:8080" -ForegroundColor Yellow

# Check if Python is available (most common)
try {
    python --version 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Using Python HTTP server..." -ForegroundColor Cyan
        Set-Location "dist\angular-mobile-app"
        python -m http.server 8080
        return
    }
} catch {
    Write-Host "Python not found..." -ForegroundColor Yellow
}

# Check if Node.js http-server is available
try {
    npx http-server --version 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Using Node.js http-server..." -ForegroundColor Cyan
        npx http-server dist/angular-mobile-app -p 8080 -o
        return
    }
} catch {
    Write-Host "http-server not found..." -ForegroundColor Yellow
}

# Fallback: Install and use http-server
Write-Host "Installing http-server globally..." -ForegroundColor Cyan
npm install -g http-server
npx http-server dist/angular-mobile-app -p 8080 -o

Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Red