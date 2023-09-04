const {ipcMain,dialog} = require('electron')
const spawn = require('child_process').spawn
const fs = require('fs')
ipcMain.handle('dl-main',async(event,url)=>{
	const output = new Promise((resolve)=>{
		const path = `C:\\Users\\329058.D007\\Desktop\\others\\Youtube-Downloader-Portable\\yt-dlp`
		const url = ` https://www.youtube.com/watch?v=9E6b3swbnWg`
		const cmd = path + url
		const powershell = spawn('powershell.exe',[cmd])
		powershell.stdout.on('data',(i)=>{
			console.log('success:' + i)
		})
		powershell.stderr.on('data',(i)=>{
			console.log('fail:' + i)
		})
		resolve(url)
	})
	return output
})