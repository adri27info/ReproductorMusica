const opcionesCanciones = document.getElementsByClassName("opcionesCancion");
const volumen = document.getElementById("volumen");
let audio;

volumen.addEventListener("click", cambiarVolumen);

function comprobarOpcionPulsada() {
  asignarVolumenDefecto();
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

  evento.target.id.includes("play_")
    ? (cadenaPlay = evento.target.id.replace("play_", ""))
    : (cadenaStop = evento.target.id.replace("stop_", ""));

  if (cadenaPlay !== "") {
    reproducirCancion(cadenaPlay);
  } else if (cadenaStop !== "") {
    pararCancion(cadenaStop);
  }
}

function ocultarIconos(cancion, condicion = true) {
  if (condicion) {
    document.getElementById("pause_" + cancion).classList.remove("ocultar");
    document.getElementById("play_" + cancion).classList.add("ocultar");
  } else {
    document.getElementById("pause_" + cancion).classList.add("ocultar");
    document.getElementById("play_" + cancion).classList.remove("ocultar");
  }
}

function crearCancion(cancion) {
  ocultarIconos(cancion);
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
        ocultarIconos(nombreCancion);
        audio.play();
      }
    } else {
      let cadena = audio.src.split("/");
      cadena = cadena[cadena.length - 1].replace(".mp3", "");
      ocultarIconos(cadena, false);
      audio.pause();
      audio = undefined;
      crearCancion(cancion);
    }
  }
}

function pararCancion(nombreCancion) {
  if (audio !== undefined) {
    if (audio.src.includes(nombreCancion)) {
      ocultarIconos(nombreCancion, false);
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

function asignarVolumenDefecto() {
  volumen.value = 0.5;
}

comprobarOpcionPulsada();
