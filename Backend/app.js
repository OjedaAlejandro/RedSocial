const express=require('express');
const app = express();
const projectRoutes=require('./routes/project')

//OJO ESTO ES MUCHO MUY IMPORTANTE
app.use(express.json());//. Este código se encarga de configurar Express para que pueda manejar datos en formato JSON en las solicitudes HTTP
//express.json(): Este método es un middleware de Express que analiza las solicitudes entrantes con un tipo de contenido JSON y transforma el cuerpo del JSON en un objeto JavaScript, que luego estará disponible en req.body

app.use(express.urlencoded({extended: true })); // express.urlencoded(). Este middleware es responsable de analizar las solicitudes entrantes con datos codificados en la URL (por ejemplo, formularios HTML enviados mediante el método POST). El objeto extended se establece en true para indicar que se pueden analizar objetos complejos codificados en la URL (como aquellos que provienen de formularios HTML que tienen campos de array o anidados).


// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
//ESTE CODIGO ES PARA QUE ME DEVULVA LA IMAGEN
// Ruta para servir las imágenes
app.use('/uploads', express.static('uploads'));

// Manejador de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal!');
});

app.use('/',projectRoutes);
module.exports= app;
