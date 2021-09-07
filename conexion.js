
const mysql = require('mysql');
//Se crea la conexion a la BD con los datos
var conexion = mysql.createConnection({
    host: 'localhost',        
    database: 'alumnos',  
    user: 'root',
    password: '',
    port: '3306'        
});
    //Si la conexion es erronea nos lo indicara
conexion.connect(function(error) {
    if(error){
        console.log(error);
    }else{
        console.log("Conexión exitosa");
    }
});    

module.exports = conexion;