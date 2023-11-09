/** Model file path for APIs**/
var modelPath  	= __dirname+"/model/upload";
var modulePath	= "/api/";
var apiModel    = require(modelPath);


/**Routing is used to upload image*/
app.all(modulePath+"images",(req, res) => {
    apiModel.uploadImage(req, res);
});


/**Routing is used to show resized image*/
app.all("/uploads/:image",(req, res) => {
    apiModel.showResizeImage(req, res);
});



