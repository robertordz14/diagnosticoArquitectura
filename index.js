const conexion = require('./conexion');
const express = require('express'),
    bodyParser = require('body-parser'),
    app = express();

const router = express.Router();
const cors =  require('cors');
//Si no existe una conexion a un host externo se correrá de forma local
const PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//Se habilitan los CORS para poder hacer las consultas a la BD
app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE, PATCH');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// //Se crea el endpoint de la ruta
// app.use('/api', router);

// router.use((req, res, next) => {    
//     next();
// })

//Al correr la BD nos indica en que puerto está
app.listen(
    PORT, 
    () => console.log(`it's running on http:localhost:${PORT}`)
);


//Se crea la consulta para traer las rutas que pasan por el id de parada escanedo, validando que esten activos
app.get('/', (req, res) => {
    conexion.query(`
    select * from informacion;`, (err, result) => {
        if(!err){
            res.json(result);            
            console.log(result);
        }else{
            return res.status(404).json({
                ok: false,
                msg: "Ocurrio un error al cargar las rutas",
                err
            })
        }
    });
});

app.post('/add', (req, res) => {
    const sql = `INSERT INTO informacion SET ?`;
    const alumnosObj = {
      nombre: req.body.nombre,
      direccion: req.body.direccion,
      telefono: req.body.telefono
    };
    conexion.query(sql, alumnosObj, error => {
      if (error) throw error;
      res.send('Alumno insertado con exito!');
    });
  });

  app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, direccion, telefono } = req.body;
    const sql = `UPDATE informacion SET nombre = '${nombre}', direccion='${direccion}', telefono='${telefono}' WHERE id =${id}`;
    conexion.query(sql, error => {
      if (error) throw error;
      res.send('Informacion del alumno actualizada exitosamente!');
    });
  });

  app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM informacion WHERE id= ${id}`;
  
    conexion.query(sql, error => {
      if (error) throw error;
      res.send('Alumno elimiado con exito');
    });
  });
  