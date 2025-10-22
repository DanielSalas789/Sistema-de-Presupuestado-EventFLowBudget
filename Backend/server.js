// Librerias

const express=require('express');
const mysql=require('mysql');
const cors=require('cors');

//Instanciamos expres y definimos el puerto
const app=express();
const port=3307;
app.use(cors());

//conexion a la base de datos de mysql
const DB =mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'', 
    database:'EFB'
}); 

DB.connect  ((err)=>{
    if(err){
        throw err} 
        console.log('Conectado a la base de datos');
        return; 
    });

    //declarar RUTAS


    // echamos a andar el servidor escuchado anteriormente el puerto 3306
    app .listen(port,()=>{
        console.log(`Servidor escuchando en el puerto ${port}`);
    });