const {ipcMain,dialog} = require('electron')
const fs = require('fs')
const path = require('path')
const { env } = require('./extension.js')
const { readdir } = require('fs/promises')
const util = require('util')
const exec = util.promisify(require('child_process').exec)

const templatePath = './template'
// Run cmd command
ipcMain.handle('gl-cmd',(event,arr)=>{
	const output = new Promise(async(resolve)=>{
		console.log(arr)
		const { cmd } = arr
		const resDict = await exec(cmd)
		if(resDict){
			const { stdout:res,stderr:err } = resDict
			console.log(res)
			console.log(err)
			const dataArr = {
				'success':res,'error':err
			}
			resolve(dataArr)
		}
	})
	return output
})
// Initialization loading
ipcMain.handle('gl-init',async(event,arr='')=>{
	const promiseChain = []
	const data = {}
	if(arr){
		
	}else{
		promiseChain[0] = new Promise(async(resolve)=>{
			const htmlSlicer = (str)=>{
				const filename = str.split('.')
				const ext = filename[filename.length-1]
				if(ext == 'html'){
					filename.pop()
					return filename.join('.')
				}else{
					return false
				}
			}
			const templateArr = {}
			const initArr = await readdir(templatePath)
			if(initArr){
				const htmlArr = []
				for(var i=0;i<initArr.length;i++){
					const e = initArr[i]
					const html = htmlSlicer(e)
					if(html){
						htmlArr[htmlArr.length] = html
					}
				}
				
				const subChain = []
				for(var i=0;i<htmlArr.length;i++){
					const dirname = htmlArr[i]
					subChain[i] = new Promise(async(subRes)=>{
						const subPath = templatePath + '/' + dirname
						const subArr = await readdir(subPath)
						if(subArr){
							const pageArr = []
							for(var s=0;s<subArr.length;s++){
								const e = subArr[s]
								const html = htmlSlicer(e)
								if(html){
									pageArr[pageArr.length] = html
								}
							}
							templateArr[dirname] = pageArr
							subRes(true)
						}
					})
				}
				const finished = await Promise.all(subChain)
				if(finished){
					data.template = templateArr
					resolve(true)
				}
			}
		})
	}
	const output = await Promise.all(promiseChain)
	if(output){
		return data
	}
})
// Page Loading
ipcMain.handle('gl-load',async(event,arr)=>{
	const { name } = arr
	const output = new Promise((resolve)=>{
		let filepath = './template/' + name + '.html'
		fs.readFile(filepath,'utf8',(err,html)=>{
			if(err){
				filepath = `./resources/app/template/` + name + `.html`
				fs.readFile(filepath,'utf8',(err,html)=>{
					resolve(html)
				})
			}else{
				resolve(html)
			}		
		})		
	})
	return output
})

//Path Finder
ipcMain.handle('gl-path',(event,isDirectory = false)=>{
	const output = new Promise(async(resolve)=>{
		if(isDirectory){
			const dialogArr = await dialog.showOpenDialog({
				properties: ['openDirectory']
			})
			const filepath = dialogArr.filePaths[0]
			resolve(filepath)
		}		
	})
	return output
})
//Path Finder
ipcMain.handle('gl-save',(event,arr)=>{
	const {start,end,content} = arr
	const output = new Promise(async(resolve)=>{
		
		const filepath = "./data/config.json"
		fs.readFile(filepath,(err,file)=>{
			const config = JSON.parse(file)
			const {key,value} = arr
			config[key] = value
		
			const json = JSON.stringify(config)
			fs.writeFile(filepath,json,(err,res)=>{
				resolve(true)
			})
		})
	
	})
	return output
})
//Load config
ipcMain.handle('gl-config',(event)=>{
	const output = new Promise((resolve)=>{
		const filepath = "./data/config.json"
		fs.readFile(filepath,(err,file)=>{
			const config = JSON.parse(file)
			resolve(config)
		})
	})
	return output
})