const { app, BrowserWindow, Menu } = require('electron');
const { url } = require('url');
const { path } = require('path');
const template = require('./utils/menu.template');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let addOrderWindow;


// adding the quit submenu with event of keyboar using accelerator field
template[0].submenu.push({
    label: "Quit",
    accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
    click() {
        app.quit()
    }
});

//Handle create add window event
template[1].submenu[0].click = function () {
    console.log('click event');
    createAddOrderWindow();
}

/**
 * @description creatubg the new order window
 */
function createAddOrderWindow() {
    // Create the browser window.
    addOrderWindow = new BrowserWindow({ width: 400, height: 400, title: 'New Order' });

    // and load the index.html of the app.
    addOrderWindow.loadFile('./view/add.order.html');
}

/**
 *@description Creating the home window
 */
function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({});

    // and load the index.html of the app.
    mainWindow.loadFile('index.html');

    // Open the DevTools.
    mainWindow.webContents.openDevTools();

    // Emitted when the mainWindowdow is closed.
    mainWindow.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    });

    //Build menu fron template
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
