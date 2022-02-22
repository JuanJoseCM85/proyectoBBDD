const express = require("express");
const cors = require ("cors");
//const { application } = require("express");
const app = express();
mysql = require("mysql2");

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());


// CONEXION A LA BBDD
let connection = mysql.createConnection(
    {
        host        :"localhost",
        user        :"root",
        password    :"J1j2j3j4j5?",
        database    :"escenariotrabajoreto2"
});

connection.connect(function(error){
    if(error){
        console.log(error);
    }else{
        console.log("Conexión correcta");
    }
});


// Petición a la BBDD metodo GET obtención de datos
app.get("/alumnos", 
    function(request,response){

    let sql;
    let params = [];
    let respuesta;

    if( request.query.id != null){
        sql = "SELECT * FROM students WHERE student_id=?"
        params = [request.query.id];
        
    }else{
        sql = "SELECT * FROM students";
        
    }

    
    connection.query(sql,params,function(err, result){
        if(err)
            console.log(err);
        else{
            console.log(result);
            respuesta = {error: false, codigo:200, mensaje:"Mostramos alumno/os", resultado: result};
            response.send(respuesta);
        }
    });
    
});


// Petición a la BBDD metodo POST INTRODUCCIÓN de datos
app.post("/alumnos",
    function(request,response){
        let sql;
        let respuesta;
        console.log("Sacamos el body que nos llega:");
        console.log(request.body);
        let params = [request.body.first_name,
                    request.body.last_name,
                    request.body.group_id,
                    request.body.ano_ingreso];
        sql = "INSERT INTO students (first_name,last_name,group_id,ano_ingreso)"+
                "VALUES (?,?,?,?)";

        console.log(sql);

        connection.query(sql,params,function(err, result){

            if (err)
                console.log(err);
            else{
                if(result.insertId){
                    //Si todo sale correcto devolvemo el ID del nuevo alumno insertado.
                    respuesta = {error: false, codigo:200, mensaje:"Alumno insertado correctamente" , resultado: result.insertId};
                }else{
                    //Si la BBDD devuelve un error, devolvermos -1
                    respuesta = {error: true, codigo:200, mensaje:"Error al insertar el alumno" , resultado: -1};
                }

                response.send(respuesta);
                
            }
        });
    });

app.put("/alumnos",
    function(request,response){

        let respuesta;
        console.log(request.body);
        let params = [request.body.first_name,
                    request.body.last_name,
                    request.body.group_id,
                    request.body.ano_ingreso,
                    request.body.student_id];
        
        let sql ="UPDATE students SET first_name = COALESCE(?, first_name)," +
                "last_name = COALESCE(?,last_name)," +
                "group_id = COALESCE(?,group_id)," +
                "ano_ingreso = COALESCE(?, ano_ingreso) WHERE student_id = ?";


        connection.query(sql,params,function(err,result){
            if(err){
                console.log(err);
                respuesta = {error: true, codigo:200, mensaje:"Error al modificar el alumno" , resultado: -1}; 
            }else{
                respuesta = {error: false, codigo:200, mensaje:"Alumno modificado correctamente" , resultado: result}; 
            }
            response.send(respuesta);
        });

    });

app.delete("/alumnos",
    function(request, response){
        
        let respuesta;
        let params = [request.body.student_id];
        let sql = "DELETE FROM students WHERE student_id=?";

      
        connection.query(sql,params,function(err,result){
            if(err){
                console.log(err);
                respuesta = {error: true, codigo:200, mensaje:"No se puedo eliminar el alumno" , resultado: err}; 
            }else{
                respuesta = {error: false, codigo:200, mensaje:"Alumno eliminado correctamente" , resultado: result}; 
            }
            response.send(respuesta);
        });
    });

app.get("/notas",
    function(request,response){
        let sql;
        let params =[];
        let respuesta;

        if (request.query.id != null){
            params = [request.query.id];
            sql = "SELECT * FROM marks WHERE student_id = ?;"
        }else{
            sql = "SELECT * FROM marks;"
        }

        connection.query(sql,params,function(err,result){
            if(err){
                console.log(err);
                respuesta = {error: true, codigo:200,mensaje: "Error al mostrar las notas", resultado: err}
            }else{
                
                respuesta = {error: false, codigo:200, mensaje: "Mostramos las notas", resultado: result}
                
            }
            response.send(respuesta);
        });
    });

    //Introduce en la tabla notas una nueva fila con los campos pasados por el body.
app.post("/notas",
    function(request,response){
        let respuesta;
        console.log(request.body);
        let params = [request.body.student_id,
                        request.body.subject_id,
                        request.body.date,
                        request.body.mark];

        let sql = "INSERT INTO marks (student_id,subject_id,date,mark)" +
                    "VALUES (?,?,?,?);"
        
        connection.query(sql,params,function(err,result){

            if(err){
                console.log(err);
                respuesta = {error: true, codigo:200, mensaje: "Error al insertar la nota", resultado: err}
            }else{
                console.log(result);
                //response.send(result);
                respuesta = {error: false, codigo:200, mensaje: "Nota insertada", resultado: result.insertId}
            }

            response.send(respuesta);
        });
    });

    //Modifica los datos de un mark_id pasado por el body
app.put("/notas",
    function(request,response){
        console.log(request.body);
        let respuesta;
        let params = [request.body.student_id,
                        request.body.subject_id,
                        request.body.date,
                        request.body.mark,
                    request.body.mark_id];
        
        let sql = "UPDATE marks SET student_id= COALESCE(?,student_id)," +
                    " subject_id= COALESCE(?,subject_id)," +
                    " date = COALESCE(?,date)," +
                    " mark = COALESCE(?,mark) WHERE mark_id = ?";

        connection.query(sql,params,function(err,result){
            if (err){
                console.log(err);
                respuesta = {error: true, codigo:200, mensaje: "Error al modificar la nota", resultado: -1}
            }else{
                //response.send(result);
                respuesta = {error: false, codigo:200, mensaje: "Nota modificada", resultado: result}
            }
            response.send(respuesta);
        });
    });

    // Elimina las notas de un mark_id pasado por el body
app.delete("/notas",
    function(request,response){
        
        let params = [request.body.mark_id];
        let sql = "DELETE FROM marks WHERE mark_id=?;"

        connection.query(sql,params, function(err, result){
            if(err){
                console.log(err);
                respuesta = {error: true, codigo:200, mensaje: "Error al eliminar la nota", resultado: -1}
            }else{
                console.log(result);
                respuesta = {error: false, codigo:200, mensaje: "Nota eliminada", resultado: result}
                
            }
            response.send(respuesta);
        });
    });
    
//Obtiene la nota media del student_id del alumno pasado por parámetro.
// Devulve la nota media (mark), el nombre (first_name) y los apellidos (last_name)
app.get("/media",
    function(request, response){
        let sql;
        let params = [];
        let respuesta;

        if( request.query.id != null){
            params = [request.query.id];
            sql = "SELECT AVG(mark) as mark, first_name, last_name FROM marks " +
                       "JOIN students WHERE students.student_id = marks.student_id "  +
                        "AND students.student_id =?;";
        }else{
            //Madamos -1 en caso de que no nos pasen el id por parámetro.
            response.send("-1");
        }

        connection.query(sql,params,function(err,result){
            if (err){
                console.log(err);
                respuesta = {error: true, codigo:200, mensaje: "Nota media no encontrada", resultado: -1}
            }else{
                respuesta = {error: false, codigo:200, mensaje: "Mostramos nota media", resultado: result}  
            }
            response.send(respuesta);
        });

    });

app.get("/apuntadas", 
    function(request,response){
        let sql;
        let params;
        let respuesta;
        
        if (request.query.id != null){
            params = [request.query.id];
            sql = "SELECT students.first_name, students.last_name, subjects.title FROM subjects " +
            "JOIN subject_teacher ON subjects.subject_id = subject_teacher.subject_id " +
            "JOIN students ON subject_teacher.group_id = students.group_id " +
            "WHERE student_id =?;";
            connection.query(sql,params,function(err,result){
                if(err){
                    console.log(err);
                    respuesta = {error: true, codigo:200, mensaje: "Error al mostrar apuntadas", resultado: -1}
                }else{
                    respuesta = {error: false, codigo:200, mensaje: "Mostramos apuntadas", resultado: result}
                }
                response.send(respuesta);
            });
        }else{
            params = [];
            sql = "SELECT students.first_name, students.last_name, subjects.title FROM subjects "+
                "JOIN subject_teacher ON subjects.subject_id = subject_teacher.subject_id "+
                "JOIN students ON subject_teacher.group_id = students.group_id;";
            
            connection.query(sql,params,function(err,result){
                if(err){
                    console.log(err);
                    respuesta = {error: true, codigo:200, mensaje: "Error al mostrar apuntadas", resultado: -1}
                }else{
                    respuesta = {error: false, codigo:200, mensaje: "Mostramos apuntadas", resultado: result}
                }
                response.send(respuesta);
            });
        }
    });

app.get("/impartidas",
    function(request,response){
        let sql;
        let params;
        let respuesta;

        if(request.query.id != null){
            params = [request.query.id];
            sql = "SELECT subjects.title, teachers.first_name, teachers.last_name FROM subjects " +
            "JOIN subject_teacher ON subjects.subject_id = subject_teacher.subject_id " +
            "JOIN teachers ON subject_teacher.teacher_id = teachers.teacher_id " + 
            "WHERE teachers.teacher_id =?";
        }else{
            params = [request.query.id];
            sql = "SELECT subjects.title, teachers.first_name, teachers.last_name FROM subjects " +
            "JOIN subject_teacher ON subjects.subject_id = subject_teacher.subject_id " +
            "JOIN teachers ON subject_teacher.teacher_id = teachers.teacher_id";
        }

        connection.query(sql,params,function(err,result){
            if(err){
                console.log(err);
                respuesta = {error: true, codigo:200, mensaje: "Error al mostrar impartidas", resultado: -1}
            }else{
                respuesta = {error: false, codigo:200, mensaje: "Mostramos impartidas", resultado: result}
            }
            response.send(respuesta);
        });

    });



app.listen(3000);

