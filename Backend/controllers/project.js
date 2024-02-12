'use strict'
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');//Me genera un token de seguridad
const Registro=require('../models/user.model');
const fs=require('node:fs');

//INICIO CONFIGURACIONES DE FIREBASE
const admin = require('firebase-admin');
const serviceAccount = require('./app-red-social-80b47-firebase-adminsdk-jjujq-df70d54238.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gs://app-red-social-80b47.appspot.com'
});
//FIN CONFIGURACIONES DE FIREBASE

const path = require('path');//Se importa el módulo path, que proporciona utilidades para trabajar con rutas de archivos y directorios.

const { v4: uuidv4 } = require('uuid');//Se importa la función uuidv4 del módulo uuid. Esta función se usará para generar un identificador único para el nombre del archivo de imagen.


var controller={
    home:(req, res) => {
        res.send('holaaa')
    },
    getProjects:async(req,res)=>{
        const Datos=await Registro.find({});
        res.json(Datos)
    },
    getPoject:async(req,res)=>{
        const id=req.params.id;
        const Datos=await Registro.findById(id)
        res.json(Datos)
    },
    delatePoject:async(req,res)=>{
        const id=req.params.id;
        const Datos=await Project.findByIdAndDelete(id)
        res.json(Datos)
    },
    UpdateProject:async(req,res)=>{
        const id=req.params.id;
        const Data=req.body;
        try{
            const envio=await Project.findByIdAndUpdate(id,Data,{new:true});
            res.json(envio)
        }catch(err){
            res.json(err)
        }
    },
   /* register: async(req,res)=>{
        const newRegistro=new Registro();
        const Data=req.body;
        newRegistro.username=Data.username;
        newRegistro.email=Data.email;
        newRegistro.password=Data.password;
        try{
            newRegistro.password=bcrypt.hashSync(Data.password,12);//Encriptamos la contraseña
            const user=await newRegistro.save();
            res.json(user)

        }catch(err){
            res.json(err)
        }
    },*/
    registerDataUser: async(req,res)=>{
        const newRegistro=new Registro();
        const Data=req.body;
        newRegistro.name=Data.name;
        newRegistro.year=Data.year;
        newRegistro.sex=Data.sex;
        newRegistro.username=Data.username;
        newRegistro.email=Data.email;
        newRegistro.password=Data.password;
        newRegistro.description=Data.description;
        newRegistro.img=Data.img;

        try{
            const user=await newRegistro.save();
            res.json(user)

        }catch(err){
            res.json(err)
        }
    },
    registerPasswordAndEmail: async(req,res)=>{
        const id=req.params.id;
        const Data=req.body;
        console.log(Data);
        console.log(id)
        try{
            Data.password=bcrypt.hashSync(Data.password,12);//Encriptamos la contraseña
            const user=await Registro.findByIdAndUpdate(id,Data,{new:true});
            res.json(user)
        }catch(err){
            res.json(err)
        }
    },
    login:async (req,res)=>{
        try{
            const user= await Registro.findOne({email:req.body.email});//Recogemosm el primer usuario con el gmail ingresado

            if(!user){//Si el usuario no existe entra a este if y me devuelve un error
                return res.json({error:'Error en email/contraseña'})
            }
            const eq=bcrypt.compareSync(req.body.password,user.password);// Se hace una comparacion de contraseña
            if(!eq){//Si la comparacion no es correcta me devuelve un error
                return res.json({error:'Error en email/contraseña'})
            }
            //Si la comparacion me dice que las contraseñas son correctas...
            res.json({
                success:'Login correcto',//me devuelve un mensaje 
                token:CreateToken(Registro)//me crea un token
            })
        }catch(err){
            res.json({mensseger:err})
        }
    },
    uploadImage: async(req,res)=>{
        try{
            console.log(req.file);//Se accede a la información del archivo subido a través de req.file.
            saveImage(req.file);
            res.send({menssege:'Termina'});
        }catch(err){
            res.send(err)
        }
    },

    getUser:async(req,res)=>{
        const Data=req.body
        try{
            const resultado = await Registro.findOne({ email:Data.email});
            console.log(resultado);
            res.send(resultado)
        }catch(err){
            res.send(err)
        }
    },
    UpdateUrlImg:async(req,res)=>{
        const id=req.params.id;
        const Data=req.body;
        try{
            const envio=await Registro.findByIdAndUpdate(id,Data,{new:true});
            res.json(envio)
        }catch(err){
            res.json(err)
        }
    },

    uploadImage: async(req,res)=>{
        try {
            if (!req.file) {
              return res.status(400).send('No file uploaded.');
            }
        
            const file = req.file;
            const bucket = admin.storage().bucket();//Se obtiene el bucket de almacenamiento de Firebase usando el SDK de Firebase admin.
        
            const filename = uuidv4() + path.extname(file.originalname);//Se genera un nombre de archivo único utilizando uuidv4() y path.extname() para obtener la extensión del archivo original.
            const fileUpload = bucket.file(filename);//Se crea un objeto fileUpload que representa el archivo en el bucket de almacenamiento de Firebase.
        
            await fileUpload.save(file.buffer, {
              metadata: {
                contentType: file.mimetype
              }
            });
        
            const url = await fileUpload.getSignedUrl({
                action: 'read',
                expires: '01-01-2100' // Puedes especificar un tiempo de expiración opcional para la URL
              });
            
            return res.status(200).send({nameImg:url[0]});
          } catch (error) {
            console.error('Error uploading file:', error);
            return res.status(500).send('Error uploading file.');
          }
    },
}
function saveImage(file){
    const newPath='./uploads/'+file.originalname;// Creo una variable la cual tiene la ruta del archivo subido, al nombre del archivo que me genera multer lo renombramos y le ponemos el nombre del archivo original que esta en "file.originalname"
    fs.renameSync(file.path,newPath);//Usando fs y la propiedad renameSync cambiamos el nombre de la ruta y con ello el nombre del archivo
    return newPath;
}
function CreateToken(Registro){
    const payload={
        user_id:Registro._id,
        user_role:Registro.role
    }
    return jwt.sign(payload,'en un lugar de la mancha')
}

module.exports=controller;