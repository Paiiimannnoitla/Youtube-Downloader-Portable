const dlFunc = ()=>{
	const dlbtn = document.getElementById('dl-download')
	const url = 'https://www.youtube.com/watch?v=9E6b3swbnWg'
	dlbtn.addEventListener('click',async()=>{
		const isDownload = await window.dl.main(url)
		console.log(isDownload)
	})
	
}
const dlInit = ()=>{
	dlFunc()
}
dlInit()