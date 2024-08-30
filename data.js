//Datos para actulizar el record de juego
const URL_BASE = 'https://api-gamesnake.onrender.com/gameSnake'

// get ranking player
export const getPlayers = () => {
  return fetch(URL_BASE, {
    method: 'GET'
  })
    .then(data => data.json())
    .then(res => res)
    .catch(error => console.error('Error:', error)); // Opcional: manejar errores
};

// Create new player
export const updateRecord = (data) => {
  return fetch(URL_BASE, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(data => data.json())
    .then(res=> res)
    .catch(e => console.log(e))
}

//inicio de sesion simple
export const signUp = (data) => {
  return fetch(`${URL_BASE}/register`, {
    method: 'POST',  // Cambiado a POST para enviar datos
    headers: {
      'Content-Type': 'application/json'  // Asegúrate de que el tipo de contenido está correctamente capitalizado
    },
    body: JSON.stringify(data)  // Convertimos los datos a JSON
  })
    .then(data => data.json())
    .then(res => res)
    .catch(error => console.error('Error en signUp:', error));  // Manejamos el error correctamente
};
