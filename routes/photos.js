const express = require('express')
const router = express.Router();
const {root, upload,index,singleImage,updateImageDetails, deleteImg} = require('../controllers/photos')
router.route('/').get(index)
router.route('/images').get(root)
router.route('/upload').post(upload)
router.route('/image/:id').get(singleImage).put(updateImageDetails).delete(deleteImg)

module.exports = router