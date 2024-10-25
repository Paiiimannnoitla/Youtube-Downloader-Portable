const {ipcMain,dialog} = require('electron')
const fs = require('fs')
const path = require('path')
const { env } = require('./extension.js')
ipcMain.handle('dl-download',(event,arr)=>{
	const output = new Promise(async(resolve)=>{
		console.log(arr)
		resolve(true)
	})
	return output
})


