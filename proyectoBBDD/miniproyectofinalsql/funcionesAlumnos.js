class alumno{

    constructor(first_name,last_name,group_id,ano_ingreso,student_id){
        this.first_name = first_name;
        this.last_name = last_name;
        this.group_id = group_id;
        this.ano_ingreso = ano_ingreso;
        this.student_id = student_id;
    }
}

// Funcion que muestra un alumno, si el campo Id Alumno está relleno.
// Muestra todos los alumnos si el campo Id Alumno está vacio.
async function mostrarAlumnos(){

    let url;
    let param ={
        headers:{
            "content-type": "application/json; charset=UTF-8"
        },
        method:"GET"
    }

    if(document.getElementById("student_id").value == "" || 
    document.getElementById("student_id").value == ""){
        //Si el campo Id Alumno está vacio, mostramos la lista de todos los alumnos.
        url = `http://localhost:3000/alumnos`;
    }else{
        //En caso de que el campo Id Alumno contenga un valor, mostramos el alumno.
        url = `http://localhost:3000/alumnos/?id=${document.getElementById("student_id").value}`;
    }

    try {
        let data = await fetch(url,param);
        let result = await data.json();

        if (result.error == true){
            //Sacamos un mesnaje en un toast indicando que hubo un error.
            console.log("Error Consulta");
            mostrarToast("Ha ocurrido un error en la consulta");
        }else{
            //Mostramos el resultado de la consulta.
            let r1 = result.resultado;
            console.log(r1);
            mostrarAlumnosfront(r1);
        }

    } catch (error) {
        console.log(error);
    }

}

function mostrarAlumnosfront(alumnos){
  let contenido = "";
  
  document.getElementById("cuerpoTablaAlumnos").innerHTML ="";
  console.log("Longitud alumnos: " + alumnos.length);

  for(let i=0; i < alumnos.length; i++){
      contenido += "<tr> "+
                    "<th scope='row'>"+ alumnos[i].student_id +"</th>" + 
                    "<td>" + alumnos[i].first_name + "</td> " + 
                    "<td>" + alumnos[i].last_name + "</td> " +
                    "<td>" + alumnos[i].group_id + "</td> " +
                    "<td>" + alumnos[i].ano_ingreso + "</td> " + 
                    "</tr> ";
  }

  document.getElementById("cuerpoTablaAlumnos").innerHTML = contenido;

}

async function crearAlumno(){
    
    let nombre = document.getElementById("first_name").value;
    let apellidos = document.getElementById("last_name").value;
    let grupo = document.getElementById("group_id").value;
    let ano = document.getElementById("ano_ingreso").value;

    let alumnoNuevo = null;
    let url;
    //Comprobamos que ningún campo esté vacio.
    if(nombre == ""){
        console.log("Por favor ingrese un nombre válido");
        mostrarToast("Por favor ingrese un nombre válido");
    }else{
        if(apellidos == ""){
            console.log("Por favor ingrese un apellido válido");
            mostrarToast("Por favor ingrese un apellido válido");
        }else{
            if(grupo ==""){
                console.log("Por favor ingrese un grupo válido");
                mostrarToast("Por favor ingrese un grupo válido");
                
            }else{
                if(ano == ""){
                    console.log("Por favor ingrese un año valido");
                    mostrarToast("Por favor ingrese un año válido");
                    
                }else{
                    
                    alumnoNuevo = new alumno(nombre,apellidos,grupo,ano);
                   
                }
            }
        }
    }

    console.log("Alumno Nuevo es: ");
    console.log(alumnoNuevo);

    //Si todos los datos están correctos...
    if(alumnoNuevo != null){
        url = `http://localhost:3000/alumnos`;

        let param = {
            headers: {"Content-type": "application/json; charset=UTF-8"},
                body: JSON.stringify(alumnoNuevo),
                method: "POST"
        }

        try {
            let data = await fetch(url,param);
            let result = await data.json();

            if (result.error == false){
                console.log("Alumno insertado correctamente");
                console.log(result.resultado);
                //mesnaje toast alumno insertado
                mostrarToast("Alumno con ID: "+ result.resultado +" ingresado correctamente.");

                document.getElementById("student_id").value = result.resultado;
                document.getElementById("first_name").value = "";
                document.getElementById("last_name").value = "";
                document.getElementById("group_id").value = "";
                document.getElementById("ano_ingreso").value = "";
            }else{
                //Sacamos un mesnaje de error.
                console.log("Error al consultar la bbdd2");
                mostrarToast("No se ha podido insertar el alumno");
            }
        } catch (error) {
            
        }
    }else{
        console.log("Los datos del alumno no son correctos, inténtelo de nuevo.");
    }
}

async function actualizarAlumno(){
    let alumnoNuevo =new alumno(document.getElementById("first_name").value,
                        document.getElementById("last_name").value,
                        document.getElementById("group_id").value,
                        document.getElementById("ano_ingreso").value,
                        document.getElementById("student_id").value);
    
    console.log(alumnoNuevo);
    let url = `http://localhost:3000/alumnos`;

    let param ={
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify(alumnoNuevo),
        method: "PUT"
    }

    try {
        let data = await fetch(url,param);
        let result = await data.json();
        
        if(result.error == false){
            console.log("Alumno modificado correctamente");
            console.log(result);
            mostrarToast("Alumno modificado correctamente");
            
        }
    } catch (error) {
        console.log(error);
    }
}

async function eliminarAlumno(){
    let id = document.getElementById("student_id").value;
    let url = `http://localhost:3000/alumnos`;
    let alumnoaEliminar;
    if(id != ""){

        alumnoaEliminar = { "student_id": id};

        let param = {
            headers:{"content-type": "application/json; charset=UTF-8"},
            body: JSON.stringify(alumnoaEliminar),
            method: "DELETE"
        }

        try {
            let data = await fetch(url,param);
            let result = await data.json();

            if (result.error == false){
                console.log("Alumno eliminado correctamente");
                console.log(result.resultado);
                mostrarToast("Alumno con id:"+ id +" eliminado correctamente");
                document.getElementById("student_id").value = "";
                
            }else{
                //Sacamos mensaje de error
                console.log("Error al eliminar alumno");
                mostrarToast("Error al eliminar el alumno"+ result.mensaje);
            }

        } catch (error) {
            console.log(error);
        }

    }else{
        console.log("Por favor introduzca el alumno a eliminar.");
        mostrarToast("Por favor introduzca el alumno a eliminar");
        
    }
}

async function mostrarNotas(){

    let url;
    let param ={
        headers:{
            "content-type": "application/json; charset=UTF-8"
        },
        method:"GET"
    }

   

    if(document.getElementById("student_id").value == "" || 
    document.getElementById("student_id").value == ""){
        //Si el campo Id Alumno está vacio, mostramos la lista de todos los alumnos.
        url = `http://localhost:3000/notas`;
    }else{
        //En caso de que el campo Id Alumno contenga un valor, mostramos las notas del alumno.
        url = `http://localhost:3000/notas/?id=${document.getElementById("student_id").value}`;
    }

    try {
        let data = await fetch(url,param);
        let result = await data.json();

        if (result.error == true){
            //Sacamos un mesnaje en un toast indicando que hubo un error.
            console.log("Error Consulta Notas");
            mostrarToast("Error al consultar las notas:" + result.mensaje);
        }else{
            //Mostramos el resultado de la consulta.
            let r1 = result.resultado;
            console.log("Sacamos el resultado");
            console.log(r1);
            mostrarNotasFront(r1);
        }

    } catch (error) {
        console.log(error);
    }

}

function mostrarNotasFront(notas){
    let contenido = "";

    
    document.getElementById("cuerpoTablaAlumnos").innerHTML ="";
  
    for(let i=0; i < notas.length; i++){
        contenido += "<tr> "+
                      "<th scope='row'>"+ notas[i].mark_id +"</th>" + 
                      "<td>" + notas[i].student_id + "</td> " + 
                      "<td>" + notas[i].subject_id + "</td> " +
                      "<td>" + notas[i].date + "</td> " +
                      "<td>" + notas[i].mark + "</td> " + 
                      "</tr> ";
    }
  
    document.getElementById("cuerpoTablaAlumnos").innerHTML = contenido;
  
  }

  async function crearNotas(){
    
    let idAlumno = document.getElementById("student_id").value;
    let idAsignatura = document.getElementById("subject_id").value;
    let fecha = document.getElementById("date").value;
    let nota = document.getElementById("mark").value;

    let notaNueva = null;
    let url;
    //Comprobamos que ningún campo esté vacio.
    if(idAlumno == ""){
        console.log("Por favor ingrese un Id de alumno");
        mostrarToast("Por favor ingrese un Id de alumno");
    }else{
        if(idAsignatura == ""){
            console.log("Por favor ingrese un id asignatura valido");
            mostrarToast("Por favor ingrese un id de asignatura valido");
        }else{
            if(fecha ==""){
                console.log("Por favor ingrese una fecha válida");
                mostrarToast("Por favor ingrese una fecha válida");
            }else{
                if(nota == ""){
                    console.log("Por favor ingrese una nota válida");
                    mostrarToast("Por favor ingrese una nota válida");
                }else{
                    
                    notaNueva = {
                        "student_id": idAlumno,
                        "subject_id": idAsignatura,
                        "date": fecha,
                        "mark": nota
                    };
                    
                }
            }
        }
    }

    console.log("La nueva nota es: ");
    console.log(notaNueva);

    //Si todos los datos están correctos...
    if(notaNueva != null){
        url = `http://localhost:3000/notas`;

        let param = {
            headers: {"Content-type": "application/json; charset=UTF-8"},
                body: JSON.stringify(notaNueva),
                method: "POST"
        }

        try {
            let data = await fetch(url,param);
            let result = await data.json();

            if (result.error == false){
                console.log("Nueva nota insertada");
                console.log(result.resultado);
                document.getElementById("mark_id").value = result.resultado;
                document.getElementById("student_id").value = "";
                document.getElementById("subject_id").value = "";
                document.getElementById("date").value = "";
                document.getElementById("mark").value = "";
                mostrarToast("Nueva nota con ID" + result.resultado + " insertadad");
            }else{
                //Sacamos un mesnaje de error.
                console.log("Error al consultar la nota en la BBDD");
                mostrarToast("Error al consultar la bbdd"+ result.mensaje)
            }
        } catch (error) {
            console.log(error);
        }
    }else{
        console.log("Los datos de la nota no son correctos, inténtelo de nuevo.");
    }
}

async function actualizarNota(){
    let notaNueva = {
        "student_id": document.getElementById("student_id").value,
        "subject_id": document.getElementById("subject_id").value,
        "date": document.getElementById("date").value,
        "mark": document.getElementById("mark").value,
        "mark_id": document.getElementById("mark_id").value
    }
    
    console.log(notaNueva);
    let url = `http://localhost:3000/notas`;

    let param ={
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify(notaNueva),
        method: "PUT"
    }

    try {
        let data = await fetch(url,param);
        let result = await data.json();
        
        if(result.error == false){
            console.log("Nota modificada correctamente");
            console.log(result.resultado);
            mostrarToast("Nota modificada correctamente.")
        }else{
            console.log("Error al modificar la nota");
            console.log(result.resultado);
            mostrarToast("Error al modificar la nota" + result.mensaje)
        }
    } catch (error) {
        console.log(error);
    }
}

async function eliminarNota(){
    let id = document.getElementById("mark_id").value;
    let url = `http://localhost:3000/notas`;
    let notaEliminar;
    if(id != ""){

        notaEliminar = { "mark_id": id};

        let param = {
            headers:{"content-type": "application/json; charset=UTF-8"},
            body: JSON.stringify(notaEliminar),
            method: "DELETE"
        }

        try {
            let data = await fetch(url,param);
            let result = await data.json();

            if (result.error == false){
                console.log("Nota eliminada correctamente");
                console.log(result.resultado);
                mostrarToast("Nota eliminado correctamente");
            }else{
                //Sacamos mensaje de error
                console.log("Error al eliminar la nota");
                mostrarToast("Error al eliminar la nota" + result.mensaje)
            }

        } catch (error) {
            console.log(error);
        }

    }else{
        console.log("Por favor introduzca el id de la nota a eliminar.");
        mostrarToast("Por favor introduzca el id de la nota a eliminar.");
    }
}

async function mostrarNotaMedia(){
    let id = document.getElementById("student_id").value;

    if(id != ""){

        let url = `http://localhost:3000/media/?id=${document.getElementById("student_id").value}`;
        let param ={
        headers:{
            "content-type": "application/json; charset=UTF-8"
        },
        method:"GET"
    }

    try {
        let data = await fetch(url,param);
        let result = await data.json();

        if (result.error == true){
            //Sacamos un mesnaje en un toast indicando que hubo un error.
            console.log("Error Consulta");
            mostrarToast("Error en la consulta"+ result.mensaje);
        }else{
            //Mostramos el resultado de la consulta.
            let r1 = result.resultado;
            console.log(r1);
            mostrarNotaMediaFront(r1);
        }

    } catch (error) {
        console.log(error);
    }

    }else{
        console.log("Por favor introduzca un Id para consultar");
        mostrarToast("Por favor introduzca un ID para consultar");
    }
}

function mostrarNotaMediaFront(notas){
    let contenido = "<th scope='col'>Nota Media</th>" +
    "<th scope='col'>Nombre</th>" +
    "<th scope='col'>Apellidos</th>";

    document.getElementById("cabeceraTabla").innerHTML = contenido;

    contenido = "";

    console.log("Entraaaaa")
    document.getElementById("cuerpoTablaAlumnos").innerHTML ="";
    console.log("Longitud notas: " + notas.length);
  
    for(let i=0; i < notas.length; i++){
        contenido += "<tr> "+
                      "<th scope='row'>"+ notas[i].mark +"</th>" + 
                      "<td>" + notas[i].first_name + "</td> " + 
                      "<td>" + notas[i].last_name + "</td> " +
                      "</tr> ";
    }
  
    document.getElementById("cuerpoTablaAlumnos").innerHTML = contenido;
}


async function mostrarApuntadas(){
    let id = document.getElementById("student_id").value;
    let url;
    if(id != ""){

        url = `http://localhost:3000/apuntadas/?id=${document.getElementById("student_id").value}`;
    }else{
        url = `http://localhost:3000/apuntadas`;
    }
        let param ={
        headers:{
            "content-type": "application/json; charset=UTF-8"
        },
        method:"GET"
    }

    try {
        let data = await fetch(url,param);
        let result = await data.json();

        if (result.error == true){
            //Sacamos un mesnaje en un toast indicando que hubo un error.
            console.log("Error Consulta");
            mostrarToast("Error en la consulta: " + result.mensaje);
        }else{
            //Mostramos el resultado de la consulta.
            let r1 = result.resultado;
            console.log(r1);
            mostrarApuntdasFront(r1);
        }

    } catch (error) {
        console.log(error);
    }

    
}

function mostrarApuntdasFront(apuntadas){
    let contenido = "<th scope='col'>Nombre</th>" +
    "<th scope='col'>Apellidos</th>" +
    "<th scope='col'>Asignatura</th>";

    document.getElementById("cabeceraTabla").innerHTML = contenido;

    contenido = "";
    document.getElementById("cuerpoTablaAlumnos").innerHTML ="";
    console.log("Longitud apuntadas: " + apuntadas.length);
  
    for(let i=0; i < apuntadas.length; i++){
        contenido += "<tr> "+
                      "<th scope='row'>"+ apuntadas[i].first_name +"</th>" + 
                      "<td>" + apuntadas[i].last_name + "</td> " + 
                      "<td>" + apuntadas[i].title + "</td> " +
                      "</tr> ";
    }
  
    document.getElementById("cuerpoTablaAlumnos").innerHTML = contenido;
}

async function mostrarImpartidas(){
    let id = document.getElementById("teacher_id").value;
    let url;
    if(id != ""){

        url = `http://localhost:3000/impartidas/?id=${document.getElementById("teacher_id").value}`;
    }else{
        url = `http://localhost:3000/impartidas`;
    }
        let param ={
        headers:{
            "content-type": "application/json; charset=UTF-8"
        },
        method:"GET"
    }

    try {
        let data = await fetch(url,param);
        let result = await data.json();

        if (result.error == true){
            //Sacamos un mesnaje en un toast indicando que hubo un error.
            console.log("Error Consulta");
            mostrarToast("Error ne la consulta: "+ result.mensaje);
        }else{
            //Mostramos el resultado de la consulta.
            let r1 = result.resultado;
            console.log(r1);
            mostrarImpartidasFront(r1);
        }

    } catch (error) {
        console.log(error);
    }

    
}

function mostrarImpartidasFront(impartidas){
    let contenido = "<th scope='col'>Nombre</th>" +
    "<th scope='col'>Apellidos</th>" +
    "<th scope='col'>Asignatura</th>";

    document.getElementById("cabeceraTabla").innerHTML = contenido;

    contenido = "";
    document.getElementById("cuerpoTablaAlumnos").innerHTML ="";
    console.log("Longitud impartidas: " + impartidas.length);
  
    for(let i=0; i < impartidas.length; i++){
        contenido += "<tr> "+
                      "<th scope='row'>"+ impartidas[i].title +"</th>" + 
                      "<td>" + impartidas[i].first_name + "</td> " + 
                      "<td>" + impartidas[i].last_name + "</td> " +
                      "</tr> ";
    }
  
    document.getElementById("cuerpoTablaAlumnos").innerHTML = contenido;
}

function cargarWebAlumnos(){

    document.getElementById("introduccion").innerHTML ="";
    
    document.getElementById("formu").innerHTML = "<form id='formulario' class='row g-3 col-md-12'>"  +
    "<div class='col-md-4'>"  +
    "<label for='inputEmail4' class='form-label'>Id Alumno</label>"  +
    "<input type='text' class='form-control' id='student_id'>"  +
    "</div>"  +
    "<div class='col-md-8'>"  +
      "<label for='inputPassword4' class='form-label'>Nombre</label>"  +
      "<input type='text' class='form-control' id='first_name'>"  +
      "</div>"  +
    "<div class='col-md-12'>"  +
    "<label for='inputAddress' class='form-label'>Apellidos</label>"  +
      "<input type='text' class='form-control' id='last_name'>"  +
      "</div>"  +
    "<div class='col-md-6'>"  +
    "<label for='inputAddress2' class='form-label'>Grupo</label>"  +
      "<input type='text' class='form-control' id='group_id'>"  +
      "</div>"  +
    "<div class='col-md-6'>"  +
    "<label for='inputCity' class='form-label'>Año Ingreso</label>"  +
      "<input type='text' class='form-control' id='ano_ingreso'>"  +
      "</div>"  +
    
    "<div class='col-md-6'>"  +
    "<button id='botonMostrar' type='button' class='btn btn-primary botonMostrar' onclick='mostrarAlumnos()'>Mostrar</button>"  +
      "</div>"  +
    "<div class='col-md-6'>"  +
    "<button id='botonCrear' type='button' class='btn btn-primary botonCrear' onclick='crearAlumno()'>Crear</button>"  +
        "</div>"  +
    "<div class='col-md-6'>"  +
    "<button id='botonActualizar' type='button' class='btn btn-primary botonActualizar' onclick='actualizarAlumno()'>Actualizar</button>"  +
    "</div>"  +
   "<div class='col-md-6'>"  +
        "<button id='botonEliminar' type='button' class='btn btn-primary botonEliminar' onclick='eliminarAlumno()'>Eliminar</button>"  +
    "</div>"  +
  "</form>";

  document.getElementById("tablaAlumnos").innerHTML = "<table class='table'>" +
                                            "<thead>" +
                                                "<tr>" +
                                                "<th scope='col'>Id</th>" +
                                                "<th scope='col'>Nombre</th>" +
                                                "<th scope='col'>Apellidos</th>" +
                                                "<th scope='col'>Grupo</th>" +
                                                "<th scope='col'>Año Ingreso</th>" +
                                                "</tr>" +
                                            "</thead>" +
                                            "<tbody id='cuerpoTablaAlumnos'>" +
                                            
                                            "</tbody>" +
                                            "</table>";

}

function cargarWebNotas(){

    document.getElementById("introduccion").innerHTML = "";

    document.getElementById("formu").innerHTML = "<form id='formulario' class='row g-3 col-md-12'>" +
    "<div class='col-md-4'>" +
      "<label for='inputEmail4' class='form-label'>Id Nota</label>" +
      "<input type='text' class='form-control' id='mark_id'>" +
    "</div>" +
    "<div class='col-md-8'>" +
      "<label for='inputPassword4' class='form-label'>Id Alumno</label>" +
      "<input type='text' class='form-control' id='student_id'>" +
    "</div>" +
    "<div class='col-md-12'>" +
      "<label for='inputAddress' class='form-label'>Id Asignatura</label>" +
      "<input type='text' class='form-control' id='subject_id'>" +
    "</div>" +
    "<div class='col-md-6'>" +
      "<label for='inputAddress2' class='form-label'>Fecha Nota</label>" +
      "<input type='text' class='form-control' id='date'>" +
    "</div>" +
    "<div class='col-md-6'>" +
      "<label for='inputCity' class='form-label'>Nota</label>" +
      "<input type='text' class='form-control' id='mark'>" +
    "</div>" +
    
    "<div class='col-md-6'>" +
      "<button id='botonMostrar' type='button' class='btn btn-primary botonMostrar' onclick='mostrarNotas()'>Mostrar</button>" +
    "</div>" +
    "<div class='col-md-6'>" +
        "<button id='botonCrear' type='button' class='btn btn-primary botonCrear' onclick='crearNotas()'>Crear</button>" +
    "</div>" +
    "<div class='col-md-6'>" +
        "<button id='botonActualizar' type='button' class='btn btn-primary botonActualizar' onclick='actualizarNota()'>Actualizar</button>" +
    "</div>" +
    "<div class='col-md-6'>" +
        "<button id='botonEliminar' type='button' class='btn btn-primary botonEliminar' onclick='eliminarNota()'>Eliminar</button>" +
    "</div>" +
  "</form>";

  document.getElementById("tablaAlumnos").innerHTML = "<table class='table'>"+
                                                        "<thead>"+
                                                            "<tr>"+
                                                            "<th scope='col'>Id</th>"+
                                                            "<th scope='col'>Id Alumno</th>"+
                                                            "<th scope='col'>Id Asignatura</th>"+
                                                            "<th scope='col'>Fecha</th>"+
                                                            "<th scope='col'>Nota</th>"+
                                                            "</tr>"+
                                                        "</thead>"+
                                                        "<tbody id='cuerpoTablaAlumnos'>"+
                                                            
                                                        "</tbody>"+
                                                        "</table>";
}


function cargarWebAdicional(){
    document.getElementById("introduccion").innerHTML = "";

    document.getElementById("formu").innerHTML = "<form id='formulario' class='row g-3 col-md-12'>"+
                                                    "<div class='col-md-4'>"+
                                                    "<label for='inputEmail4' class='form-label'>Id Alumno</label>"+
                                                    "<input type='text' class='form-control' id='student_id'>"+
                                                    "</div>"+
                                                    "<div class='col-md-8'>"+
                                                    "<label for='inputPassword4' class='form-label'>Id Profesor</label>"+
                                                    "<input type='text' class='form-control' id='teacher_id'>"+
                                                    "</div>"+
                                                    
                                                    "<div class='col-md-6'>"+
                                                    "<button id='botonMostrar' type='button' class='btn btn-primary botonMostrar' onclick='mostrarNotaMedia()'>Mostrar Nota Media</button>"+
                                                    "</div>"+
                                                    "<div class='col-md-6'>"+
                                                        "<button id='botonCrear' type='button' class='btn btn-primary botonCrear' onclick='mostrarApuntadas()'>Mostar Asig Apuntadas</button>"+
                                                    "</div>"+
                                                    "<div class='col-md-6'>"+
                                                        "<button id='botonActualizar' type='button' class='btn btn-primary botonActualizar' onclick='mostrarImpartidas()'>Mostrar Asig Impartidas</button>"+
                                                    "</div>"+
                                                "</form>";

  document.getElementById("tablaAlumnos").innerHTML = "<table class='table'>"+
                                                        "<thead>"+
                                                            "<tr id='cabeceraTabla'>"+
                                                            
                                                            "</tr>"+
                                                        "</thead>"+
                                                        "<tbody id='cuerpoTablaAlumnos'>"+
                                                        "</tbody>"+
                                                        "</table>";
}

function cargarWebIntro(){
    document.getElementById("introduccion").innerHTML ="<h2> Presentamos nuestra base de datos de Alumnos</h2>"+
    "<p>Podrás consultar, los alumnos matriculados en nuestro curso, los profesores que imparten las asignaturas, así como las notas obtenidas por los alumnos</p>";
    document.getElementById("formu").innerHTML = "";
    document.getElementById("tablaAlumnos").innerHTML = "";
}

var toastTrigger = document.getElementById('liveToastBtn')
var toastLiveExample = document.getElementById('liveToast')

if (toastTrigger) {
  toastTrigger.addEventListener('click', function () {
    var toast = new bootstrap.Toast(toastLiveExample)

    toast.show()
  })
}

function mostrarToast(mensaje){
    document.getElementById("toastMensaje").innerHTML = mensaje;
                var toast = new bootstrap.Toast(toastLiveExample)
                toast.show();
}
