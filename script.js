// Reproducir/pausar audio
const audio = document.getElementById("audio");
const btnPlay = document.getElementById("btnPlay");
let isPlaying = false;

btnPlay.addEventListener("click", () => {
  if (isPlaying) {
    audio.pause();
    btnPlay.innerHTML = '<i class="fas fa-play"></i>';
  } else {
    audio.play();
    btnPlay.innerHTML = '<i class="fas fa-pause"></i>';
  }
  isPlaying = !isPlaying;
});

// Contador regresivo
const fechaBoda = new Date("2025-12-13T16:00:00").getTime();
const diasSpan = document.getElementById("dias");
const horasSpan = document.getElementById("horas");
const minutosSpan = document.getElementById("minutos");
const segundosSpan = document.getElementById("segundos");

function actualizarContador() {
  const ahora = new Date().getTime();
  const diferencia = fechaBoda - ahora;

  if (diferencia <= 0) {
    diasSpan.textContent = horasSpan.textContent = minutosSpan.textContent = segundosSpan.textContent = "0";
    return;
  }

  const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

  diasSpan.textContent = dias;
  horasSpan.textContent = horas;
  minutosSpan.textContent = minutos;
  segundosSpan.textContent = segundos;
}

actualizarContador();
setInterval(actualizarContador, 1000);

// Partículas fondo
particlesJS("particles-js", {
  particles: {
    number: { value: 25 },
    color: { value: "#a3c9a8" },
    shape: { type: "circle" },
    opacity: { value: 0.3 },
    size: { value: 4 },
    move: { enable: true, speed: 1 }
  },
  interactivity: {
    events: {
      onhover: { enable: false },
      onclick: { enable: false },
      resize: true
    }
  },
  retina_detect: true
});
