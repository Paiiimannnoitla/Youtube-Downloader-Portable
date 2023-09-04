const { contextBridge, ipcRenderer } = require('electron')



// Downloader
contextBridge.exposeInMainWorld('dl', {
	main:		(i)			=> ipcRenderer.invoke('dl-main',i),
	build:		()			=> ipcRenderer.invoke('dl-build')

})




