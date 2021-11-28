var express = require('express');
const { Router, response } = require('express');
const axios = require ('axios');
require('dotenv').config();
const {API_KEY} = process.env;

const router = Router();
var name = "foo";
var customAction = function() {
    alert("hi there!")
}
//implement it 
        


const jsonFlickrApi= function (data)
{
    return data;
}
router.use(express.json());
router.get('/',async (req,res)=>{
    var result = await axios(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_KEY}&format=json&text=${req.query.text}&extras=url_m&page=${req.query.page}`).then(r => r.data).then(r=>  {return eval(r)}).catch(error=> console.log(error))
    var infoResolved = result.photos.photo.map(onePhoto =>  {
        var info={}
        info.url= onePhoto.url_m
        if (onePhoto.title.length>30) info.title = onePhoto.title.slice(0,30) +'...'
        else info.title = onePhoto.title
        info.id = onePhoto.id
        info.height= onePhoto.height_m
        info.width= onePhoto.width_m
        return info;
    })
    photoResponse= {
        total: result.photos.total,
        page: result.photos.page,
        pages: result.photos.pages,
        photos: infoResolved
    }
    res.send(photoResponse)
})

module.exports = router;
