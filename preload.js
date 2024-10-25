const { contextBridge, ipcRenderer } = require('electron')

// General Function
contextBridge.exposeInMainWorld('gl', {
    load: 			(arr)	=> ipcRenderer.invoke('gl-load',arr),
	path:			(b)		=> ipcRenderer.invoke('gl-path',b),
	save:			(arr)	=> ipcRenderer.invoke('gl-save',arr),
	config:			()		=> ipcRenderer.invoke('gl-config'),
	init:			(arr)	=> ipcRenderer.invoke('gl-init'),
	cmd:			(arr)	=> ipcRenderer.invoke('gl-cmd',arr)
})
// Download Function
contextBridge.exposeInMainWorld('dl', {
    download: 			(arr)	=> ipcRenderer.invoke('dl-download',arr)
})

// Setting Function
contextBridge.exposeInMainWorld('st', {
    load: 			()	=> ipcRenderer.invoke('st-load')
})




