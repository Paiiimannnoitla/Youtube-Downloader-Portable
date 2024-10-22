const process = require('child_process')
const fs = require('fs')


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
const open = (path)=>{
	process.exec('start "" "'+ path +'"')
}

const clear = (arr,allowDuplicate = false,dictPass = false)=>{
	const newArr = []
	const strArr = []
	for(var i=0;i<arr.length;i++){
		const a = arr[i]
		if(a){
			const isDuplicate = newArr.indexOf(a) + 1
			if(!isDuplicate + allowDuplicate){
				// Dictionary check 
				const isDictionary = a.constructor == Object
				if(isDictionary){
					if(dictPass){
						newArr[newArr.length] = a
					}else{
						const dictStr = JSON.stringify(a)
						const isSameDict = strArr.indexOf(dictStr) + 1
						if(!isSameDict){
							strArr[strArr.length] = dictStr
							newArr[newArr.length] = a
						}
					}
				}else{
					newArr[newArr.length] = a
				}	   
			}
		}
	}
	return newArr
}

// Load config 
const env = (key,newValue=false)=>{
	const output = new Promise((resolve)=>{
		const filepath = "./data/config.json"
		fs.readFile(filepath,(err,file)=>{
			const config = JSON.parse(file)
			if(key){
				if(newValue){
					config[key] = newValue
					const json = JSON.stringify(config)
					fs.writeFile(filepath,json,()=>{
						resolve(true)
					})
				}else{
					const value = config[key]
					resolve(value)
				}
				
			}else{
				resolve(config)
			}
		})
	})
	return output
}
module.exports = {
	open,
	clear,
	env
}