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
    var result = await axios(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_KEY}&format=json&tags=${req.query.tags}&text=${req.query.text}`).then(r => r.data).then(r=>  {return eval(r)})
    var photosId = result.photos.photo.map(onePhoto=> onePhoto.id)
    var photosPromise = photosId.map(oneId => {
         return axios(`https://www.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=${API_KEY}&format=json&photo_id=${oneId}`).then(r => r.data).then(r=>  {return eval(r)})
    });
    var photosInfo = await Promise.all(photosPromise).then(r=> r)
    var infoResolved = photosInfo.map(onePhoto =>  {
        var info={}
        info.text= onePhoto.photo.description._content
        onePhoto.photo.urls.url.forEach(url => {
            if(url.type === 'photopage') info.url= url._content
        });
        info.title = onePhoto.photo.title._content
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
