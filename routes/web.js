
/** Including contants file */
require("./../config/global_constant");

/** Including common utility function */
require(WEBSITE_ROOT_PATH + "utility");

const logger   =  require('./../config/logger') ;
var cors	   =  require('cors');

/**
 * Export a function, so that we can pass the app instances from index.js
 * @param router As Express Object
 * @param mongo As mongo connection
 * @return void.
 */
module.exports = {
	configure: function(router,dbInstance) {
		db			= dbInstance;
		ObjectId	= require("mongodb").ObjectID;
		app 		= router;

		app.use(cors());

		/** middleware to log each request*/
		app.use(function(req,res,next){	
			let reqFile = req.files && req.files.image.name ? req.files.image.name : '';
			if(reqFile !== ''){
				req.body.image_url = reqFile; 
			}
			logger.info("api_request : "+req.body);

			let oldSend = res.send ;
			res.send  = function(data){
				logger.info("api_response : "+data);
				oldSend.apply(res,arguments);
			}
			next();
		})

		/**================MODULE ROUTES START=====================*/
	   
		/** Include APIs module **/
		require(WEBSITE_MODULES_PATH+"api/routes")

		/** Include Art Institute of Chicago API integration module **/
		require(WEBSITE_MODULES_PATH+"chicago_api_integration/routes") ;

		/**================MODULE ROUTES END=====================*/

		/** Route is used to for 404 page */
		app.get("*", function(req, res){
			res.status(400).send("Requested Url Not Found") ;
		});
			
	}
};
