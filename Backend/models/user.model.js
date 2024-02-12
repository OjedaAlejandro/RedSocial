const{model,Schema}=require('mongoose');

const userShema=new Schema({
    username:String,
    email:String,
    password:String,
    role:{
        type:String,
        default:'regular'
    },
    //Datos del usuario
    name:String,
    lastname:String,
    year:String,
    sex:String,
    description:String,
    img:String,
})

module.exports=model('Registro',userShema);