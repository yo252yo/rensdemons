copy "assets\app\icon.png" "bin/out/" /y
timeout /t 10
npm exec electron-builder build
