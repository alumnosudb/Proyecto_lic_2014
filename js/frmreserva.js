//carga de funcion inicial en evento load del navegador
if(window.addEventListener){
  window.addEventListener('load', inicial, false);
}else{
  window.attachEvent('onload', inicial);
}

//funcion inicial
function inicial(){
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
}

function radiocheck(radioboton){
  var cajatarjeta = document.getElementById('numtarj');
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
      re  = /^[a-z]{1,}([\- \_])?\d*.[a-z]{1,}[-_]?\d*@(gmail|hotmail|yahoo|).(com|es|net)$/m
      if(re.test(document.getElementById('txtemail').value)){
        return true;
      }
      break;
      
      case 'txtnumtarj':
      re = new RegExp('^\d{4}-\d{4}-\d{4}-\d{4}$', 'm')
      if(re.test(document.getElementById('txtnumtarj').value)){
        return true;
      }
      break;
  }
  
  return false;
}

function correccionDatos(valor1, valor2){
    //valor1 = email, valor2 = numtarj
  var i=0;
 
    if(valor1 == false){
      with(document.getElementById('correomessage')){
        textContent = " * Correo electronico invalido!!";
        style.color = 'red';
      }
    }else if(valor2 == false){
      textContent = " * Número de Tarjeta no existe o es invalida!!";
        style.color = 'red';
    }else{
      
    }
    
 
}