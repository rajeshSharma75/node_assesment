
const sharp = require('sharp');
let path    = require('path');

function uploadModel (){

    /**function to upload images
    * @param req as request object
    * @param res as response object
    * @returns  json
    */
    this.uploadImage = async(req,res)=>{
        let collection = db.collection('gamerji_images') ;

        if(isPost(req)){

            if (!req.files || Object.keys(req.files).length === 0) {
              res.status(400).send('No files were uploaded.');
              return;
            }
          
            let image = req.files && req.files.image ? req.files.image : '';
          
            let options	=	{
				'image' 	:	image,
				'filePath' 	: 	IMAGE_UPLOAD_PATH,
			};

            let response = await  moveUploadedFile(req,res,options);
            
                if(response.status == 'error'){
                    res.send({
                        status : 'error',
                        message:'Image has not been uploaded successfully',
                        result : {},
                    })
                }

                var imageName	=	(response.fileName)	?	response.fileName	:"";

                let insertData = {
                  image : imageName,
                }

                try {
                    const result = await collection.insertOne(insertData);
                    res.send({
                                status : 'success',
                                message:"Image has been uploaded successfully.",
                                insertedId : result.insertedId,
                                upload_url : IMAGE_UPLOAD_URL+imageName,
                            })
                } catch (error) {
                    res.send({
                        status : 'error',
                        message : 'Something went wrong !'
                    })
                }     
        }else{

           let imageList =  await collection.find({}).toArray();
           return   res.send({
                status : 'success',
                message : 'All uploaded images list.',
                result : imageList,
           })     
        }
    }



    /**function to show resize images
    * @param req as request object
    * @param res as response object
    * @returns  file
    */
    this.showResizeImage = async(req,res)=>{
      
        let imageName = req.params && req.params.image ? req.params.image : '';
        let imageExt = path.extname(imageName);
        if (imageExt.startsWith('.')) {
            imageExt = imageExt.slice(1);
        }
        
        const regex = new RegExp(`_(\\d+)x_(\\d+)\\.${imageExt}`, 'i');  // Regular expression
        const match = imageName.match(regex);
            
        if (match) {

            const width = parseInt(match[1]); 
            const height = parseInt(match[2]); 
            const indexOfFirstUnderscore = imageName.indexOf('_');

            if (indexOfFirstUnderscore !== -1) {
                var newImageName = imageName.substring(0,indexOfFirstUnderscore);
            }
                  
            newImageName =newImageName+"."+imageExt;
        
            const resizedImagePath = IMAGE_UPLOAD_PATH+imageName ;
            imagePath = IMAGE_UPLOAD_PATH+newImageName ;

            console.log(newImageName);
            console.log(imagePath);

            await sharp(imagePath)
              .resize({ width: parseInt(width), height: parseInt(height) })
              .toFile(resizedImagePath);
        
            /**sending resize image */
            res.sendFile(resizedImagePath);

        } else {
            console.log("Pattern not found in the string.");
            let imagePath = IMAGE_UPLOAD_PATH+imageName;
                return res.sendFile(imagePath);
            }
    }
       

 
}

module.exports = new uploadModel();