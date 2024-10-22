const { app, BrowserWindow, ipcMain, dialog, session } = require('electron')
const path = require('path')
const fs = require('fs')
const { readdir,mkdir,writeFile } = require('fs/promises')
const { env } = require('./script/extension.js')
require('./script/GeneralFunction.js')
require('./script/SettingFunction.js')

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'
app.allowRendererProcessReuse = false

// WindowsCreator
	// Main Window
const WindowMain = async () => {
    const win = new BrowserWindow({
        width: 1280,
        height: 720,
        webPreferences: {
			disableBlinkFeatures: 'DisallowInsecureUsage,AllowLists',
			allowlist:['style-src','self'],
            preload: path.join(__dirname, 'preload.js'),
			contextIsolation:true,
			nodeIntegration: false
        }
    })
	const debugMode = true
	if (debugMode){
		win.webContents.openDevTools()
	}
    win.loadFile('./index.html')	

}
const sysBuild = async()=>{
	const configDir = './data'
	const promiseChain = []
	// Data and config check
	const configStatus = new Promise(async(resolve)=>{
		const currList = await readdir('./')
		if(currList){
			const configDict = {
				"test-auto-fill":"Auto loading function works fine",
				"setting-homepage":"homepage",
				"test-homepage":"test-channel",
				"production-mode":false
			}
			const json = JSON.stringify(configDict)
		
			const dataDirStatus = currList.indexOf('data') + 1
			if(dataDirStatus){
				const dataList = await readdir(configDir)
				if(dataList){
					const configStatus = dataList.indexOf('config.json') + 1
					if(configStatus){
						resolve(true)
					}else{
						fs.writeFile('./data/config.json',json,()=>{
							resolve(true)
						})
					}
				}
			}else{
				fs.mkdir('./data',(err,res)=>{
					fs.writeFile('./data/config.json',json,()=>{
						resolve(true)
					})
				})
			}
		}	
	})
	// Production mode check
	if(await configStatus){
		promiseChain[0] = new Promise(async(resolve)=>{
			const isProduction = await env('production-mode')
			if(isProduction){
				resolve(true)
			}else{
				const currList = await readdir('./')
				const isLocale = currList.indexOf('locales') + 1
				if(isLocale){
					const writeStatus = await env('production-mode',true)
					if(writeStatus){
						resolve(true)
					}
				}else{
					resolve(true)
				}
			}
		})
	}
	const output = await Promise.all(promiseChain)
	return output
}
const init = async() =>{  
	const isBuild = await sysBuild()
	console.log(isBuild)
	if(isBuild){
		app.whenReady().then(() => {
			WindowMain()
			// Prevent from multiple windows create
			app.on('activate', () => {
				if (BrowserWindow.getAllWindows().length === 0) {
					WindowMain()
				}
			})	
		})
	}
	
	
}

init()

// Release all resources of the app
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})