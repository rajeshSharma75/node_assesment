/** Model file path for chicago APIs**/
var modelPath  	     = __dirname+"/model/chicago_api";
var modulePath	     = "/artworks/";
let path             = require('path');
var chicagoApiModel  = require(modelPath);

/**middleware to set current views*/
const setCurrentViews = (req,res,next)=>{
    app.set('views', path.join(__dirname, 'views'));
    next();
}


/**Routing is used to get list of artwork*/
app.all(modulePath,setCurrentViews,(req, res) => {
    chicagoApiModel.getArtworkList(req, res);
});
