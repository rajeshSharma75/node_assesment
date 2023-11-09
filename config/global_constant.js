require("./database_collection");
/** Website root directory path */
WEBSITE_ROOT_PATH	=	process.cwd()+ "/";

/** Website Url*/
WEBSITE_URL  =	process.env.URL+":"+process.env.PORT+"/";

/** Website public directory path */
WEBSITE_PUBLIC_PATH  = 	WEBSITE_ROOT_PATH + "public/";

/**Modules root path */
WEBSITE_MODULES_PATH = 	WEBSITE_ROOT_PATH + "modules/";

/** image upload path */
IMAGE_UPLOAD_PATH = WEBSITE_ROOT_PATH+"public/uploads/";
IMAGE_UPLOAD_URL  = WEBSITE_URL+"uploads/";

/** Art Institute of Chicago API integration url */
CHICAGO_API_ARTWORK_URL = 'https://api.artic.edu/api/v1/artworks' ;