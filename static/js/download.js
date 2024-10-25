const dlArr = {}
const dlMain = ()=>{
	const main = document.getElementById('dl-main')
	main.addEventListener('click',async(event)=>{
		const id = event.target.id
		// Test channel
		const isChannel = currPage == 'download'
		if(isChannel){
			console.log('click download')
		}
	})
}

// Function first run
const dlInit = () =>{
	const output = new Promise((resolve)=>{
		resolve(true)
	})
	return output
}

// Page loading Function
pageArr['download'] = async()=>{
	
	// Test channel
	const isChannel = currPage == 'download'
	if(isChannel){
		console.log('page loading download')
	}
}
// Main function
funcArr['download'] = async()=>{
	const initStatus = await dlInit()
	if(initStatus){
		dlMain()
	}
}

// Preload data
preloadArr['download'] = async()=>{
	console.log('download function preload phase')
	
}
// Loaded Function
loadArr['download'] = async()=>{
	console.log('download function load phase')
	dlArr['download'] = 'load data download'
}