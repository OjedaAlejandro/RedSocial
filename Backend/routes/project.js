'use strict'
const express=require('express');
const router=express.Router();
const controller=require('../controllers/project')
const {checkToken}=require('../middeleware');

const multer=require('multer');
const storage = multer.memoryStorage();// indica que los archivos se mantendrán en memoria en lugar de escribirse en el disco.
const upload = multer({ storage: storage });// Se configura Multer con el almacenamiento definido anteriormente.

router.get('/',controller.home);
router.get('/SeeProject',controller.getProjects);
router.get('/SeeProject/:id',controller.getPoject);
router.delete('/delateProject/:id',controller.delatePoject);
router.put('/UpdateProject/:id',controller.UpdateProject);
router.post('/getUser',controller.getUser)


router.put('/registerPasswordAndEmail/:id',controller.registerPasswordAndEmail);
router.put('/UpdateUrlImg/:id',controller.UpdateUrlImg)
router.post('/registerDataUser',controller.registerDataUser);
//router.post('/register',controller.register);
router.post('/login',controller.login);
router.post('/upload',upload.single('image'),controller.uploadImage)

module.exports=router;

