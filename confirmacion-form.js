// Inicializar particles.js para esta página también
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

const rsvpForm = document.getElementById('rsvpForm');
const formMessage = document.getElementById('formMessage');
// *** ¡IMPORTANTE! PEGA AQUÍ LA URL DE TU APLICACIÓN WEB DE GOOGLE APPS SCRIPT ***
const googleAppsScriptURL = 'https://script.google.com/macros/s/AKfycbxGWBzAWmR3rBB5_TGXw7-s-U-sBFf-OLQoQXRpLa5jyywzoeTEgJHdxtnacuRuW1aZjA/exec'; 

rsvpForm.addEventListener('submit', function(e) {
  e.preventDefault(); // Previene el envío del formulario por defecto

  const formData = new FormData(this);
  const data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });

  // Agrega automáticamente la fecha de confirmación si no está ya en el formulario
  // (Aunque el script de Google Apps Sheet también lo agrega, esto es un buen respaldo)
  if (!data['FechaConfirmacion']) {
      data['FechaConfirmacion'] = new Date().toLocaleDateString('es-ES'); // Formato DD/MM/YYYY
  }

  formMessage.style.display = 'block';
  formMessage.style.backgroundColor = '#f0f8ff'; // Azul claro para procesando
  formMessage.style.color = '#333';
  formMessage.textContent = 'Enviando confirmación...';

  fetch(googleAppsScriptURL, {
    method: 'POST',
    mode: 'no-cors', // Necesario para Google Apps Script ya que no envía encabezados CORS
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => {
    // Debido a 'no-cors', no podemos leer directamente la respuesta del servidor.
    // Asumimos el éxito si no hay error de red.
    // La data será procesada por el script de Google Apps.
    console.log('Envío de formulario iniciado, revisa tu Google Sheet para los datos.');
    formMessage.style.backgroundColor = '#d4edda'; // Verde claro para éxito
    formMessage.style.color = '#155724';
    formMessage.textContent = '¡Confirmación enviada con éxito! ¡Gracias!';
    rsvpForm.reset(); // Limpia el formulario
    // Opcional: Deshabilita el botón para evitar múltiples envíos
    this.querySelector('button[type="submit"]').disabled = true;
  })
  .catch(error => {
    console.error('Error al enviar el formulario:', error);
    formMessage.style.backgroundColor = '#f8d7da'; // Rojo claro para error
    formMessage.style.color = '#721c24';
    formMessage.textContent = 'Error al enviar la confirmación. Por favor, inténtalo de nuevo.';
  });
});

// Manejo del campo "Acompañantes" basado en la selección de "Asistiré"
const asistireRadios = document.querySelectorAll('input[name="Asistire"]');
const acompanantesInput = document.getElementById('acompanantes');

asistireRadios.forEach(radio => {
    radio.addEventListener('change', function() {
        if (this.value === 'No') {
            acompanantesInput.value = '0';
            acompanantesInput.setAttribute('readonly', 'readonly'); // Hacerlo de solo lectura
        } else {
            acompanantesInput.removeAttribute('readonly'); // Habilitar edición
            acompanantesInput.value = '1'; // Por defecto a 1 si el usuario selecciona 'Sí'
        }
    });
});

// Establece el estado inicial para acompañantes en caso de que "No" esté pre-seleccionado (poco probable en este formulario)
if (document.querySelector('input[name="Asistire"][value="No"]:checked')) {
    acompanantesInput.value = '0';
    acompanantesInput.setAttribute('readonly', 'readonly');
}