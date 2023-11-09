
    const express    =  require('express') ;
    let app          =  express();
    const bodyParser =  require('body-parser');
    require('dotenv').config();

   
    /**middleware to use our app for form and json data*/
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(bodyParser.json());

    /*set ejs engine to rendor html*/
    app.set('view engine', 'html');
    app.engine('html', require('ejs').renderFile);

    /** Set publically accessable folder */
    app.use(express.static(__dirname + '/public'));

     /** Use to upload files */
     var fileUpload = require('express-fileupload');
     app.use(fileUpload({ 
        limits: { fileSize: 2 * 1024 * 1024 },
    }));


    /**requiring connection module*/ 
    const { connectToMongoDB } = require('./config/dbConnection');

    async function startServer() {
    try {
        const db = await connectToMongoDB();

        var routes = require('./routes/web');
            routes.configure(app,db);

        /**listening server on port */
        let port = process.env.PORT || 3000 ;
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
    }

    startServer();
