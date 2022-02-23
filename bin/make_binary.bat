copy "assets\app\icon.png" "bin/out/" /y
timeout /t 10
npx electron-builder build
