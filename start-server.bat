@echo off
echo Starting Nexus Labs Website...
echo.
echo If you see "Python not found", install Python from python.org
echo.
echo Opening browser in 3 seconds...
timeout /t 3 /nobreak >nul
start http://localhost:8000
python -m http.server 8000
pause