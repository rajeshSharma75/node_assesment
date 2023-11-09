
const axios = require('axios');

function artworkModel(){

    this.getArtworkList = async(req,res) =>{
        const paramsData = {
            fields: 'id,title,artist_display,date_display,main_reference_number,classification_title ',
          };
        axios.get(CHICAGO_API_ARTWORK_URL,{ params: paramsData }).then(response =>{
            let artworkList = response.data && response.data.data ? response.data.data : [] ;
            res.render("list",{
                artworkList : artworkList,
            })
        }).catch(err=>{
            res.send(err);
        })
    }
}

module.exports = new artworkModel();