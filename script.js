const {ipcMain,dialog} = require('electron')

ipcMain.handle('dl-main',async(event,url)=>{
	const output = new Promise((resolve)=>{
		console.log(url)
		resolve(url)
	})
	return output
})