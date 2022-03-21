copy "assets\app\icon.png" "bin/out/" /y
timeout /t 10
npx electron-builder build -w
npx electron-builder build -l
npx electron-builder build -m
