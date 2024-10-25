const ttArr = {}
const ttMain = ()=>{
	const main = document.getElementById('tt-main')
	main.addEventListener('click',async(event)=>{
		const id = event.target.id
		// Test channel
		const isChannel = currPage == 'test-channel'
		if(isChannel){
			console.log('click test')
		}
	})
}

// Function first run
const ttInit = () =>{
	console.log(ttArr['test-channel'])
	const output = new Promise((resolve)=>{
		resolve(true)
	})
	return output
}

// Page loading Function
pageArr['test'] = async()=>{
	
	// Test channel
	const isChannel = currPage == 'test-channel'
	if(isChannel){
		console.log('page loading test')
	}
}
// Main function
funcArr['test'] = async()=>{
	const initStatus = await ttInit()
	if(initStatus){
		ttMain()
	}
}

// Preload data
preloadArr['test'] = async()=>{
	console.log('test function preload phase')
	
}
// Loaded Function
loadArr['test'] = async()=>{
	console.log('test function load phase')
	ttArr['test-channel'] = 'load data test'
}