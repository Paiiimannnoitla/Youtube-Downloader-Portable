// Quick check class list 
const have = (event,cls)=>{
	const isArr = cls.constructor == Array
	if(isArr){
		
	}else{
		return event.target.classList.contains(cls)
	}
}
//Auto loading
const autoload = (config)=>{
	const autoArr = document.querySelectorAll('.autofill')
	const autoLen = autoArr.length
	
	if(autoLen){
		for(var i=0;i<autoLen;i++){
			const e = autoArr[i]				
			const id = e.id				
			const content = config[id] ? config[id] : ''
			
			e.innerHTML = content		
		}
	}
}
// Extract key and value to array
Object.destruct = (dict)=>{
    const k = Object.keys(dict)
    const v = Object.values(dict)
    return [k,v]
}
// Deep copy
Object.copy = (dict)=>{
	const str = JSON.stringify(dict)
	const newDict = JSON.parse(str)
	return newDict
}
// Append array
Object.append = (targetDict,inputDict)=>{
    const dataArr = []
    // Sorting data
	const checklist = [String,Number,Object]
	for(const k in inputDict){
		let arr = inputDict[k]
		const notFormat = checklist.indexOf(arr.constructor) + 1
		if(notFormat){
			arr = [arr]
		}
		for(var i=0;i<arr.length;i++){
		    const v = arr[i]
		    const dataDict = {}
		    dataDict[k] = v
		    
		    dataArr[dataArr.length] = dataDict
		}
	}
	// Appending
	for(var i=0;i<dataArr.length;i++){
	    const dict = dataArr[i]
	    for(const k in dict){
	        const v = dict[k]
	        
	        const isExist = targetDict[k]
	        if(isExist){
	            let existedDict = targetDict[k]
	            const isString = (existedDict.constructor == String) + (existedDict.constructor == Number)
	            if(isString){
	                existedDict = [existedDict]
	            }
	            existedDict[existedDict.length] = v
	            targetDict[k] = existedDict
	        }else{
	            targetDict[k] = [v]
	        }
	    }
	}
}
// Append prefix and affix to all elements in array
Array.append = (list,prefix,affix,options={})=>{
	const arr = Object.copy(list)
    for(var i=0;i<arr.length;i++){
        let e = arr[i]
        const altArr = options[i]
		
		if(options['replace']){
			/* {'replace':{'targetPos':['targetStr','replaceStr','execStr','passStr']}}
				'targetPos':	The target position of array for replacing process
				
				'targetStr':	The string would be replaced
				'replaceStr':	The string would be replaced with
				'execStr':		If have,replace function only exec when target contains this specific string
				'passStr':		If have,replace function would end when target contains this specific string 
			*/
			const replaceOpt = options['replace']
			const replaceArr = replaceOpt[i]
			
			if(replaceArr){
				if(e){
					const targetStr = replaceArr[0]
					const replaceStr = replaceArr[1]
					const execStr = replaceArr[2]
					const passStr = replaceArr[3]
					let execStatus = true
					if(passStr){
						const isExist = e.indexOf(passStr) + 1
						console.log(isExist)
						if(isExist){
							execStatus = false
						}
					}
					
					if(execStatus){
						if(execStr){
							const isExist = e.indexOf(execStr)+1
							if(!isExist){
								execStatus = false
							}
						}
					}
					if(execStatus){
						e = e.replaceAll(targetStr,replaceStr)
					}
				}		
			}	
		}

		const preStr = altArr ? altArr[0] : prefix
		const affStr = altArr ? altArr[1] : affix
        arr[i] = preStr + e + affStr
		
    }
	return arr
}
// Extract assigned value from dictionary array
Array.extract = (list,key)=>{
	const arr = []
	for(var i=0;i<list.length;i++){
		const dict = list[i]
		arr[i] = dict[key]
	}
	return arr
}
const optMaker = (arr)=>{
	const optArr = []
	for(var i=0;i<arr.length;i++){
		const e = arr[i]
		optArr[i] = `<option value='` + e + `'>` + e + `</option>`
	}
	return optArr.join('')
}
// Transform into money format
const moneyFormat = (n,isInsert=false)=>{
	n = n + ''
	let str
	const arr = []
	const narr = []
	const len = n.length
	if(isInsert){
		for(var i=0;i<len;i=i+4){
			arr[arr.length] = n.substring(len-i-4,len-i)
		}	
		for(var i=0;i<arr.length;i++){
			let e = arr[arr.length-1-i]
			if(e.length>3){
				if(e=='0000'){
					e = ''
				}else{
					e = e.substring(0,1) + ',' + e.substring(1,4)
				}			
			}
			narr[i] = e
		}
		if(narr.length == 3){
			str = narr[0] + '億' + narr[1] + '萬' + narr[2] 
		}else{
			str = narr[0] + '萬' + narr[1] 
		}
	}else{
		for(var i=0;i<len;i=i+3){
			arr[arr.length] = n.substring(len-i-3,len-i)
		}		
		for(var i=0;i<arr.length;i++){
			narr[i] = arr[arr.length-1-i]
		}
		str = narr.join(',')
	}	
	
	console.log(str)
	return str
} 
//Transform into date format
const dateFormat = (date,isTaiwanlize = true)=>{
	date = date + ''
	let yearLen = 3
	let monLen = 3
	let dayLen = 5
	const isGregorian = date.length == 8
	if(isGregorian){
		yearLen = yearLen + 1
		monLen = monLen + 1
		dayLen = dayLen + 1
	}
	const year = date.substring(0,yearLen)-1911*isGregorian + '年'

	
	const m = date.substring(monLen,monLen+2)
	const month = m.substring(1) == '0' ? m + '月' : m.replace('0','') + '月'
	
	const d = date.substring(dayLen,dayLen+2)
	const day = d.substring(1) == '0' ? d  + '日': d.replace('0','') + '日'
	
	const time = year + month + day
	
	return time
}
// Date reverse Function
const dateReverse = (date)=>{
	const d = date.substring(4)
	const y = date.substring(0,3)
	const year = Number(y) + 1911 + '/'
	const content = year + d.replace('月','/').replace('日','')
	return content
}
//Get today
const today = (isGregorian = false)=>{
	const date = new Date()
	const year = date.getFullYear() - (1-isGregorian)*1911 + '年'
	const month = date.getMonth() + 1 + '月'
	const day = date.getDate() + '日'
	
	const curr = year + month + day
	return curr
}
//Get collumn nodes
const getColumn = (table,x)=>{
	const rows = table.rows
	const rowArr = []
	for(var i=0;i<rows.length;i++){
		rowArr[i] = rows[i].cells[x]
	}
	return rowArr
}

// Pack and return
const pack = (cls)=>{
	const nodeArr = document.querySelectorAll('.' + cls)
	const arr = {}
	
	for(var i=0;i<nodeArr.length;i++){
		const e = nodeArr[i]
		const name = e.getAttribute('name')
		const id = e.id
		const key = name ? name : id
		let v 
		const isFile = e.type == 'file'
		if(isFile){
			v = e.files[0].path
		}else{
			v = e.value			
		}
		arr[key] = v
	}
	
	return arr
}













