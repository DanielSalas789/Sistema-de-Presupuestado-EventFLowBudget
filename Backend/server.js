// Librerias

const express=require('express');
const mysql=require('mysql');
const cors=require('cors');

//Instanciamos expres y definimos el puerto
const app=express();
const port=5000;
app.use(cors());

//conexion a la base de datos de mysql
const DB =mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'Eventflowbudget'
}); 

DB.connect  ((err)=>{
    if(err){
        throw err} 
        console.log('Conectado a la base de datos');
        return; 
    });

    //declarar RUTAS

    //Ruta para obtener todos los Productos y devolverlos al fornted    
    app.get('/productos',(req,res) => {
        const SQL_QUERY ='SELECT * FROM productos';
        DB.query(SQL_QUERY,(err,results) => {
            if(err){ 
                throw err
            }
            res.json(results);
        });
    });

    // echamos a andar el servidor escuchado anteriormente el puerto 3306
    app .listen(port,()=>{
        console.log(`Servidor escuchando en el puerto ${port}`);
    });