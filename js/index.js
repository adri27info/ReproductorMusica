const opcionesCanciones = document.getElementsByClassName("opcionesCancion");
const volumen = document.getElementById("volumen");
let audio;

volumen.addEventListener("click", cambiarVolumen);

function comprobarOpcionPulsada() {
  for (let index = 0; index < opcionesCanciones.length; index++) {
    opcionesCanciones[index].childNodes.forEach((element) => {
      if (element.id !== "" && element.id !== undefined) {
        if (element.id.includes("play") || element.id.includes("stop")) {
          element.addEventListener("click", accionCancion);
        }
      }
    });
  }
}

function accionCancion(evento) {
  let cadenaPlay = "",
    cadenaStop = "";
  if (evento.target.id.includes("play_")) {
    cadenaPlay = evento.target.id.replace("play_", "");
  } else if (evento.target.id.includes("stop_")) {
    cadenaStop = evento.target.id.replace("stop_", "");
  }
  if (cadenaPlay !== "") {
    reproducirCancion(cadenaPlay);
  } else if (cadenaStop !== "") {
    pararCancion(cadenaStop);
  }
}

function crearCancion(cancion) {
  audio = new Audio("audios/" + cancion + ".mp3");
  audio.play();
}

function reproducirCancion(nombreCancion) {
  let cancion = nombreCancion;
  if (audio === undefined) {
    crearCancion(cancion);
  } else if (audio !== undefined) {
    if (audio.src.includes(nombreCancion)) {
      if (audio.paused) {
        audio.play();
      }
    } else {
      audio.pause();
      audio = undefined;
      crearCancion(cancion);
    }
  }
}

function pararCancion(cadenaStop) {
  if (audio !== undefined) {
    if (audio.src.includes(cadenaStop)) {
      audio.pause();
    }
  }
}

function cambiarVolumen() {
  if (audio !== undefined) {
    let vol = this.value;
    audio.volume = vol;
  }
}

comprobarOpcionPulsada();
