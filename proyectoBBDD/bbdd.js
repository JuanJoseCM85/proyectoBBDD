mysql = require("mysql2");

let connection = mysql.createConnection(
    {
        host        : "localhost",
        user        : "root",
        password    : "J1j2j3j4j5?",
        database    : "escenariotrabajoreto2"
});

connection.connect(function(error){
    if(error){
        console.log(error);
    }else{
        console.log("Conexión correcta");
    }
});

//CREAR DE LA TABLA ASIGNATURAS.
// let sql = " CREATE TABLE `codenotch`.`asignatura` (\
//     `id` INT NOT NULL AUTO_INCREMENT,\
//     `nombre` VARCHAR(45) NULL,\
//     `id_profesor` INT NULL,\
//     `descripcion` VARCHAR(100) NULL,\
//     PRIMARY KEY (`id`))\
//   COMMENT = 'Tabla de asignaturas';"

// connection.query(sql,function(err, result)
// {
//     if (err){
//         console.log(err);
//     }else{
//         console.log("Tabla Creada");
//         console.log(result);
//     }
// });

// let sql = "ALTER TABLE `codenotch`.`profesor` \
//             ADD COLUMN `antiguedad` INT(2) NULL AFTER `email`;"

// connection.query(sql,function(err,result){
//     if(err){
//         console.log(err);
//     }else{
//         console.log("Tabla Modificada");
//         console.log(result);
//     }
// });

//let sql = "SELECT first_name, last_name FROM escenariotrabajoreto2.students;"

//let sql = "SELECT * FROM escenariotrabajoreto2.teachers;"

//let sql = "DELETE FROM marks WHERE marks.date < '2012-01-01'";

let sql = "UPDATE marks SET mark = 5 WHERE mark < 5";

connection.query(sql,function(err,result){
    if (err){

    }else{
        console.log("Selección Correcta");
        console.log(result);
    }
});