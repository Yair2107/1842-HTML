export function valida(input){
   //esta funcion se manda llamar cada que el usuario sale del input que estaba rellenando
    const tipoDeInput=input.dataset.tipo;
    if (validadores[tipoDeInput]) {
      validadores[tipoDeInput](input);
      }

    if(input.validity.valid){
      input.parentElement.classList.remove("input-container--invalid");
      input.parentElement.querySelector(".input-message-error").innerHTML= "";
    }else{
      input.parentElement.classList.add("input-container--invalid");
      input.parentElement.querySelector(".input-message-error").innerHTML= 
        mostrarMensajeDeError(tipoDeInput, input);


    }
    
}


const tipoDeErrores =[
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",


];


const mensajesDeError = {

  nombre: {
    valueMissing: "El campo nombre no puede estar vacio",
  },

  email:{

    valueMissing: "El campo correo no puede estar vacio",
    typeMismatch: "El correo no es valido",

  },

  password:{

    valueMissing: "El campo constraseha no puede estar vacio",
    patternMismatch: 
     "Al menos 6 caracteres, maximo 12, una letra mayuscula, una minuscula y no puede contener caracteres especiales",

  },

  nacimiento:{

    valueMissing: "Este campo no puede estar vacio",
    customError: "Debes tener 18 a;os de edad",

  },

  numero:{


    valueMissing:"Este campo no puede estar vacio",
    patternMismatch:"El formato requerido es de XXXXXXXXX 10 numeros"
  },


  direccion:{


    valueMissing:"Este campo no puede estar vacio",
    patternMismatch:"La direccion debe de contener entre 10 a 40 caracteres"
  },

  ciudad:{


    valueMissing:"Este campo no puede estar vacio",
    patternMismatch:"La direccion debe de contener entre 10 a 40 caracteres"
  },

  estado:{


    valueMissing:"Este campo no puede estar vacio",
    patternMismatch:"La direccion debe de contener entre 10 a 40 caracteres"
  },

};
    



/*
dataset se obtiene la coleccion de todos los datas y el .tipo es para delimitar data-tipo="nacimiento"

*/

const validadores = {

    nacimiento: (input) => validarNacimiento (input),


};

function mostrarMensajeDeError (tipoDeInput, input){

    let mensaje="";

    tipoDeErrores.forEach((error) =>{
        if(input.validity[error]){
            console.log(tipoDeInput, error);
            console.log(input.validity[error]);
            console.log(mensajesDeError[tipoDeInput][error]);
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    });

    return mensaje;

}

/*function mostrarMensajeDeError(tipoDeInput, input) {
    let mensaje = "";
    tipoDeErrores.forEach((error) => {
      if (input.validity[error]) {
      
        console.log(tipoDeInput, error);
        console.log(input.validity[error]);
        console.log(mensajesDeError[tipoDeInput][error]);
        mensaje = mensajesDeError[tipoDeInput][error];
      }
    });
    return mensaje;
  }
*/

function validarNacimiento(input){

    const fechaCliente= new Date (input.value); //fechaCliente es igual a el dato ingreado en input value
    let mensaje= "";
    if (!mayorDeEdad(fechaCliente)){

        mensaje="Debes tener 18 a;os de edad";


    };

    input.setCustomValidity(mensaje);


}

function mayorDeEdad(fecha){

    const fechaActual= new Date(); //fecha actual la crea automaticamente
    const diferenciaFechas=  new Date(
        fecha.getUTCFullYear() + 18, 
        fecha.getUTCMonth(),
        fecha.getUTCDate()
        );

    return diferenciaFechas <= fechaActual;


}