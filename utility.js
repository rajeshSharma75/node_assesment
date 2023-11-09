
/**
* To check request method is post or get
* @param req	As Request Data
* @param res	As Response Data
* @return boolean
*/
isPost = (req)=>{
	if(typeof req.body !== typeof undefined && Object.keys(req.body).length != 0){
		return true;
	}else if(req.method == "POST"){
		return true;
	}
	else{
		return false;
	}
}//End isPost()



/**
 * Function to upload image
 * @param options	As data in Object
 * @return json
 */
moveUploadedFile = (req,res,options)=>{
	return new Promise(resolve=>{
		let image 		=	(options && options.image)	   ?	options.image		:"";
		let filePath 	=	(options && options.filePath)  ?	options.filePath	:"";
		let imageName	= (image.name)	                   ? image.name : '';
	
		let newFileName   =  Date.now()+ '-' +changeFileName(imageName);
		let uploadedFile  = filePath+newFileName;

		/** move image to folder*/
		image.mv(uploadedFile,(err)=>{					
			if (err){					
				/** Send error response **/
				let response = {
					status	: 	'error',
					message	:	"something went wrong ! try again",
					options	:	options
				};
				resolve(response);
			}else{								
				/** Send success response **/
				let response = {
					status	: 	'success',
					fileName:	newFileName,
					options	:	options
				};
				resolve(response);								
			}
		});
	});
}//End moveUploadedFile()




/**
 * Function for change file name
 * @param fileName AS File Name
 * @return filename
 */
changeFileName = (fileName)=>{
	let fileData		=	(fileName) ? fileName.split('.') : [];
	let extension		=	(fileData) ? fileData.pop() : '';
	fileName			=	fileName.replace('.'+extension,'');
	fileName			= 	fileName.replace(RegExp('[^0-9a-zA-Z\.]+','g'),'');
	fileName			= 	fileName.replace('.','');
	return fileName+'.'+extension;
}//end changeFileName();