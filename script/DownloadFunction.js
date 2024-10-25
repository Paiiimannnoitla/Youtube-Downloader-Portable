const {ipcMain,dialog} = require('electron')
const fs = require('fs')
const path = require('path')
const { env } = require('./extension.js')
const util = require('util')
const exec = util.promisify(require('child_process').exec)
ipcMain.handle('dl-download',(event,arr)=>{
	const output = new Promise(async(resolve)=>{
		console.log(arr)
		const cmd = `python --version`
		const resDict = await exec(cmd)
		if(resDict){
			const { stdout:res,stderr:err } = resDict
			console.log(res)
			console.log(err)
		}
		resolve(true)
	})
	return output
})


