const photo = require('../models/photos')
const path = require('path')
const fs = require('fs')
const Busboy = require('busboy');


const index = async(req, res)=>{
    images = await photo.find({})
        if (!images) {
            res.status(400).json({msg:"Error completing your request"})
        } else {
            res.render('index', { images:images, msg: req.query.msg});
        }
}
const singleImage = async (req, res)=>{
    const{id:imageId} = req.params
    var image = await photo.find({_id:imageId})
    if(!image){
        res.status(404).json({msg:`Image with Id ${imageId} not found`})
    }else{
        res.render('singleImage',{image:image})
    }
}
const updateImageDetails = async (req, res)=>{
    photo.updateOne(
        {_id:req.params.id},
        {$set:{name:req.body.name, desc:req.body.desc}},
        {upsert:true},
        (err, image) =>{
            if (err) {
                console.log(err);
            }else{
                res.redirect('/')
            }
        }
    )
}
const deleteImg = async(req, res)=>{
    photo.deleteOne({_id:req.params.id}, (err, image)=>{
        if (err) {
            console.log(err);
        }else{
            res.json({msg:"Success"})
        }
    })
}
const root = async (req, res)=>{
    images = await photo.find({})
        if (!images) {
            res.status(400).json({msg:"Error completing your request"})
        } else {
            res.render('index', { images:images, msg: req.query.msg});
        }
}

const upload = async(req, res,)=>{
    const busboy = Busboy({ headers: req.headers });
    busboy.on('file', function(name, file, info) {
        if (file === "undefined") {
            res.json({msg:'Error:No file selected'})
        }
        else{
            let newPhoto= new photo({
                name:String(info.filename),
                path: '/images/'+ String(info.filename),
                size: req.headers['content-length']
            })
            newPhoto.save()
            
        }
      var saveTo = path.join(__dirname, '../public/images/' + info.filename);
      file.pipe(fs.createWriteStream(saveTo));

    });
    images = await photo.find({});
    busboy.on('finish', function() {
        if (!images) {
            res.status(400).json({msg:"Error completing your request"})
        } else {
            res.redirect('/');
        }
    });
  
    return req.pipe(busboy); 
}

module.exports = {root, upload, index,singleImage, updateImageDetails, deleteImg}