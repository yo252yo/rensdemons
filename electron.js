const { app, BrowserWindow, Menu, globalShortcut } = require('electron')

var greenworks = require('greenworks');

const isMac = process.platform === 'darwin'
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

  win.loadFile('index.html')


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


var steamApiTick = function(){
  win.webContents
    .executeJavaScript('STATS._stats;', true)
    .then(result => {
    /*  console.log(result._map);
    greenworks.activateAchievement('NEW_ACHIEVEMENT_1_0',
        function() { console.log('Activating achievement successfully'); },
        function(err) { console.log('Failed on activating achievement.'); });
        */
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
  } else {
    console.log('NO STEAM API LOADED.');
  }
})


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
