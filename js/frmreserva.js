var datos = new Array();
var estructura = { "nombre": "Arquimides Rogel Gonzalez", "email": "arquimides.rogel@hotmail.com", "fechaReg": "10/09/2011", "depart": "San Salvador", "resta": "La GranVia" };
var contador = 0;

//carga de funcion inicial en evento load del navegador
if(window.addEventListener){
  window.addEventListener('load', inicial, false);
}else{
  window.attachEvent('onload', inicial);
}

/*lectura de datos guardados en la base txt para almacenamiento local*/
var DBtexto = new XMLHttpRequest();
var archivo = "BDatos.txt";

DBtexto.onreadystatechange = function () {
   if (DBtexto.readyState === 4 && DBtexto.status === 200) {
      var DataBase = JSON.parse(DBtexto.responseText);
      setData(DataBase);
   }
}
DBtexto.open("GET", archivo, true);
DBtexto.send();
/********************************************************************************************************************/

//funcion inicial
function inicial() {

  var ctrlradio = document.getElementsByName('cctarjeta');
  var botonenviar = document.getElementById('btnenviar');
  var email, numtarj;
  
  for(i = 0; i < ctrlradio.length; i++){
      if(ctrlradio[i].addEventListener){
          ctrlradio[i].addEventListener('click', function (){ radiocheck(this);}, false);
      }else{
          ctrlradio.attacEvent('onclick', function (){ radiocheck(this);});
      }//fin if-else addEventListener
  }//fin for i
  
  //evento click de boton enviar
  if(botonenviar.addEventListener){
    botonenviar.addEventListener('click', function (){
      email = validacion(document.getElementById('txtemail').id);
      numtarj = validacion(document.getElementById('txtnumtarj').id);
      
      //llamado a funcion
            correccionDatos(email,numtarj);
    },false);
  }else{
    botonenviar.attachEvent('onclick', function(){
      email = validacion(document.getElementById('txtemail').id);
      numtarj = validacion(document.getElementById('txtnumtarj').id);
      
      //llamado a funcion
      correccionDatos(email,numtarj);
    });
  }
   // mostramos fecha actual correspondiente para Mozilla,IE11/10/09/08...
  var actualFecha = new Date();
  document.getElementById("fecha").value = actualFecha.toLocaleDateString();

   //verificamos si existen datos guardados en el LocalStorage
  if (typeof (localStorage.length)) {
     contador = (localStorage.length / 5);
  }
}

function setData(paramArray) {
   //alert(paramArray);
   var salidaTexo = "";
   var i;

   for (i = 0; i < paramArray.length; i++) {
      if (typeof (localStorage) == undefined) {
         alert("para tener una mejor experiencia en navegacion le sugerimos que descargue Google Chrome");
      } else {
         localStorage.setItem("nombre" + i, paramArray[i].nombre);
         localStorage.setItem("email" + i, paramArray[i].email);
         localStorage.setItem("fechaReg" + i, paramArray[i].fechaReg);
         localStorage.setItem("depart" + i, paramArray[i].depart);
         localStorage.setItem("restau" + i, paramArray[i].restau);
      }
   }
}

function radiocheck(radioboton){
  var cajatarjeta = document.getElementById('txtnumtarj');
  switch(radioboton.value){
      case 'tcmaster':
      cajatarjeta.setAttribute('placeholder', ' Master Card');
      break;
      case 'tcvisa':
      cajatarjeta.setAttribute('placeholder', ' Visa');
      break;
      case 'tcamerican':
      cajatarjeta.setAttribute('placeholder', ' American Express');
  }//fin switch radioboton
}//fin funcion radiocheck

function validacion(identificador){
  switch(identificador){
      case 'txtemail':
      re  = /^[a-z]{1,}([\- \_])?\d*.[a-z]{1,}[-_]?\d*@(gmail|hotmail|yahoo|).(com|es|net)$/m;
      if(re.test(document.getElementById('txtemail').value)){
        return true;
      }
      break;
      case 'txtnumtarj':
      re = /^\d{4}-\d{4}-\d{4}-\d{4}$/m;
      if(re.test(document.getElementById('txtnumtarj').value)){
        return true;
      }
      break;
  }
  return false;
}

function correccionDatos(valor1, valor2){
   //valor1 = email, valor2 = numtarj
   var txtNombre = document.getElementById("txtnombre");
   var correo = document.getElementById('txtemail');
   var tarjeta = document.getElementById('txtnumtarj');
   var fecha = document.getElementById("fecha");

   //banderas de verificacion de datos correctos
   var bandera1, bandera2 = "";

    if(valor1  === false || valor1 === undefined){
      with(document.getElementById('correomessage')){
        textContent = ' * Correo Electronico invalido!!';
        style.color = 'red';
      }//fin with correomassage
      correo.style.borderColor = 'red';
      correo.value = '';
    } else {
       document.getElementById("correomessage").textContent = "";
       correo.style.borderColor = "black";
       bandera1 = "ok";
    }
    
    if(valor2 === false ||valor2 === undefined){
      with(document.getElementById('numeroTarjeta')){
        textContent = ' * Numero de Tarjeta Invalido!!';
        style.color = 'red';
      }//fin with numeroTarjeta
      tarjeta.style.borderColor = 'red';
      tarjeta.value = '';
    } else {
       document.getElementById("numeroTarjeta").textContent = "";
       tarjeta.style.borderColor = "black";
       bandera2 = "ok";
    }

   //guardado de datos en matriz 
    if( bandera1 == "ok" && bandera2 == "ok"){
       datos[contador] = txtNombre.value;
       console.log(datos[contador]);
       contador++;

       if (typeof (localStorage)==undefined) {
          alert("LocalStorage no soportado, Actualiza tu navegador!!");
       } else {
          var restaurante = document.getElementById("depart").options[document.frmReservacion.selectDepart.selectedIndex].value;
          var departamento = document.getElementById("restaurante").options[document.frmReservacion.selectRest.selectedIndex].value;
          
         
          localStorage.setItem("nombre" + contador, txtNombre.value);
          localStorage.setItem("email" + contador, correo.value);
          localStorage.setItem("fechaReg" + contador, fecha.value);
          localStorage.setItem("depart" + contador, restaurante);
          localStorage.setItem("restau" + contador, departamento);
          
          txtNombre.value = "";
          correo.value = "";
          tarjeta.value = "";
      
       }
    }
 
}//fin function correccionDatos
