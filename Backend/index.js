'use strict'
// getting-started.js
const mongoose = require('mongoose');
const app=require('./app');
const PORT = process.env.PORT ||3000;
main().catch(err => console.log(err));

async function main() {
    try{
        await mongoose.connect('mongodb+srv://alejandroojedadesarrolloweb:'+process.env.password+'@cluster0.sakc6xx.mongodb.net/?retryWrites=true&w=majority');
        console.log("conexión a la bd exitosa");

        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Example app listening on port ${PORT}`)
        })
    }catch(err){
        console.log(err)
    }


  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
