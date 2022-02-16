mysql = require("mysql2");

let connection = mysql.createConnection(
    {
        host        : "localhost",
        user        : "root",
        password    : "J1j2j3j4j5?",
        database    : "museo"
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

//let sql = "SELECT AVG(marks.mark) FROM marks WHERE subject_id = 10;";

//let sql = "SELECT COUNT(*) FROM escenariotrabajoreto2.students;";

//let sql = "SELECT student_id, AVG(mark) FROM marks GROUP BY student_id;";

let param =[];

// let sql = "SELECT first_name, last_name, subjects.title FROM students\
//             JOIN subject_teacher ON (students.group_id = subject_teacher.group_id)\
//             JOIN subjects ON ( subject_teacher.subject_id = subjects.subject_id)";

// let sql = "SELECT first_name, last_name, subjects.title FROM teachers\
//             JOIN subject_teacher ON ( teachers.teacher_id = subject_teacher.id)\
//             JOIN subjects ON ( subjects.subject_id = subject_teacher.subject_id)";

// let sql = "SELECT COUNT(*), subjects.title, teachers.first_name, teachers.last_name FROM students\
//             JOIN subject_teacher ON ( students.group_id = subject_teacher.group_id)\
//             JOIN subjects ON ( subject_teacher.subject_id = subjects.subject_id)\
//             JOIN teachers ON ( subject_teacher.teacher_id = teachers.teacher_id)\
//             GROUP BY subjects.title ";


// let sql = "SELECT piezas.nombre_pieza, expositor.ubicacion_expositor, estado.fecha_fin_estado, duenos.nombre_dueno, duenos.apellidos_dueno, duenos.email_dueno\
//             FROM piezas, estado, expositor, duenos\
//             WHERE piezas.id_estado = estado.id_estado AND\
//             piezas.id_expositor = expositor.id_expositor AND\
//             piezas.id_dueno = duenos.id_dueno AND\
//             estado.tipo_estado = 'Prestamo'; ";

let sql = "SELECT COUNT(tipo_coleccion), tipo_coleccion\
            FROM piezas, coleccion\
            WHERE piezas.id_coleccion = coleccion.id_coleccion\
            GROUP BY  tipo_coleccion\
            ORDER BY COUNT(tipo_coleccion) DESC;";

connection.query(sql,param,function(err,result){
    if (err){

    }else{
        console.log("Selección Correcta");
        console.log(result);
    }
});