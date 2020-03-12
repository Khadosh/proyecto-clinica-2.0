  var db = firebase.firestore();

  //Agrega medicos y especialidades
  function guardar(){
      var nombre= document.getElementById('nombre').value;
      var apellido= document.getElementById('apellido').value;
      var especialidad= document.getElementById('especialidad').value;
      
    db.collection("admin").add({
        nombre: nombre,
        apellido: apellido,
        especialidad: especialidad,
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        document.getElementById('nombre').value = "";
        document.getElementById('apellido').value= "";
        document.getElementById('especialidad').value= "";
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
    
  }
  
  //Lee documentos
  var tabla= document.getElementById('tabla');
  db.collection("admin").onSnapshot((querySnapshot) => {
      tabla.innerHTML = '';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().nombre}`);
        tabla.innerHTML +=`
        <tr>
      <th scope="row">${doc.id}</th>
      <td>${doc.data().nombre}</td>
      <td>${doc.data().apellido}</td>
      <td>${doc.data().especialidad}</td>
      <td><button class= "btn btn-danger"onclick="eliminar('${doc.id}')">Eliminar</button></td>
      <td><button class= "btn btn-warning"onclick="editar('${doc.id}', '${doc.data().nombre}','${doc.data().apellido}','${doc.data().especialidad}')">Editar</button></td>

      </tr>
        `
    });
});
//Borra datos
function eliminar(id, nombre, apellido, especialidad){
    db.collection("admin").doc(id).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}
//Editar datos

function editar(id, nombre, apellido, especialidad){

    document.getElementById('nombre').value = nombre;
    document.getElementById('apellido').value = apellido;
    document.getElementById('especialidad').value = especialidad;
    var boton = document.getElementById('boton');
    boton.innerHTML ='Editar';

    boton.onclick = function(){
        var washingtonRef = db.collection("admin").doc(id);

        // Set the "capital" field of the city 'DC'

        var nombre =  document.getElementById('nombre').value;
        var apellido =  document.getElementById('apellido').value;
        var especialidad =  document.getElementById('especialidad').value

        return washingtonRef.update({
                nombre: nombre,
                apellido: apellido,
                especialidad: especialidad,
        })
        .then(function() {
            console.log("Document successfully updated!");
            boton.innerHTML ='Guardar';
            boton.onclick=function(){
                guardar();
            }
            document.getElementById('nombre').value = "";
            document.getElementById('apellido').value= "";
            document.getElementById('especialidad').value= "";

        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
    }

}