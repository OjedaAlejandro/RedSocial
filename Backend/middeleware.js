const jwt= require('jsonwebtoken')

const checkToken=(req,res,next)=>{
    if(!req.headers['authorization']){
        return res.json({error:'Debes incluir la cabecera con el token'})
    }
    const token=req.headers['authorization'];
    let payload;
    try{
        payload=jwt.verify(token,'en un lugar de la mancha');
    }catch{
        return res.json({error:'El token esta mal'})
    }

    next()
}
module.exports={checkToken}