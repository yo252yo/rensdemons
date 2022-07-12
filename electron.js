const { app, BrowserWindow, Menu, globalShortcut } = require('electron')

var greenworks = require('greenworks');

const isMac = process.platform === 'darwin'
var argvs = process.argv;
var win;
var menuvisibility = false;

const templateMenu = [
  ...(isMac ? [{
    label: app.name,
    submenu: [
      { role: 'about' },
      { type: 'separator' },
      { role: 'services' },
      { type: 'separator' },
      { role: 'hide' },
      { role: 'hideOthers' },
      { role: 'unhide' },
      { type: 'separator' },
      { role: 'quit' }
    ]
  }] : []),
  {
    label: 'File',
    submenu: [
      {
      label: 'Hide menu',
      click: async () => {
          menuvisibility = false;
          win.setMenuBarVisibility(menuvisibility);
        }
      },
      isMac ? { role: 'close' } : { role: 'quit' }
    ]
  },
  {
    label: 'View',
    submenu: [
      { role: 'resetZoom', accelerator: '' },
      { role: 'zoomIn', accelerator: '' },
      { role: 'zoomOut', accelerator: '' },
      { role: 'togglefullscreen', accelerator: '' }
    ]
  },
  {
    label: 'Debug',
    submenu: [
      { role: 'toggleDevTools',
        accelerator: 'Ctrl+Shift+I',
       },
      { role: 'reload', accelerator: '', },
      {
        label: 'Normal view',
        click: async () => {
          win.loadFile('index.html')
        }
      },
      {
        label: 'Testing view',
        click: async () => {
          win.loadFile('testing.html')
        }
      },
      {
        label: 'Debug view',
        click: async () => {
          win.loadFile('debug.html')
        }
      }
    ]
  },
  {
    label: 'Help',
    role: 'help',
    submenu: [
      {
        label: 'Gamefaqs',
        click: async () => {
          const { shell } = require('electron')
          await shell.openExternal('https://gamefaqs.gamespot.com/company/198099-yo252yo')
        }
      },
      {
        label: 'Github',
        click: async () => {
          const { shell } = require('electron')
          await shell.openExternal('https://github.com/yo252yo/rensdemons/blob/master/man.md')
        }
      }
    ]
  },
  {
    label: 'HELP IN CASE OF PROBLEMS',
    submenu: [
      {
        label: 'Force load main menu',
        click: async () => {
          win.loadURL(`file://${__dirname}/testing.html?lvl=titlescreen`);
        }
      },
      {
        label: 'Teleport to world map (reinitialize)',
        click: async () => {
          win.loadURL(`file://${__dirname}/testing.html?lvl=010_world_map`);
        }
      },
      {
        label: 'Teleport to hell (reinitialize)',
        click: async () => {
          win.loadURL(`file://${__dirname}/testing.html?lvl=050_hell_map`);
        }
      }
    ]
  }
]


const createWindow = () => {
  win = new BrowserWindow({
    width: 1440,
    height: 1080,
  })

  win.setMenuBarVisibility(menuvisibility);

  const menu = Menu.buildFromTemplate(templateMenu)
  Menu.setApplicationMenu(menu)

  if(argvs.length > 2){
    win.loadFile('index.html');
  } else{
    win.loadURL(`file://${__dirname}/index.html?trial=yo252yo.com`);
  }


  win.webContents.on('before-input-event', (event, input) => {
    if (input.alt) {
      menuvisibility = !menuvisibility;
      win.setMenuBarVisibility(menuvisibility);
    }
  })


  globalShortcut.register('Ctrl+Shift+I', function () {
    win.webContents.openDevTools();
  })
  globalShortcut.register('Alt+M', function () {
    menuvisibility = !menuvisibility;
    win.setMenuBarVisibility(menuvisibility);
  })
}

var activated = [];

var achieve = function(n){
  greenworks.activateAchievement(n,
      function() {
        console.log('Activated achievement ' + n);
        activated.push(n);
      },
      function(err) {
        console.log('Failed setting achievement ' + n + ':' + err);
      }
    );
}
var unachieve = function(n){
  greenworks.clearAchievement(n,
      function() {
        console.log('Deactivated achievement ' + n);
        activated.push(n);
      },
      function(err) {
        console.log('Failed unsetting achievement ' + n + ':' + err);
      }
    );
}

var steamApiTick = function(){
  win.webContents
    .executeJavaScript('STATS.get_steam_achievements();', true)
    .then(result => {
      for(var n of result){
        if(activated.includes(n)){
          continue;
        }
        achieve(n);
      }
    });
}


app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0)   createWindow()
  })

  if (greenworks.init()){
    console.log('Steam API initalized.');
    setInterval(steamApiTick, 5000);
    unachieve("END OF LACK");
  } else {
    console.log('NO STEAM API LOADED.');
  }
})


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('before-quit' , (e) => {
  if (greenworks.init()){
    if(activated.includes("END OF SUFFERING") && activated.includes("END OF WORLD")){
      achieve("END OF LACK");
    }
  }
});
