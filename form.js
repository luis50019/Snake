const form = document.getElementById('form-player');
const input_player = document.getElementById('input-player');
const input_password = document.getElementById('input-password')
const container_form = document.getElementById('container-register');
const player_error = document.getElementById('error-player')
const password_error = document.getElementById('error-pasword')
const regex = /^[A-Za-z0-9]+$/
const player_correct = false;

form.addEventListener('submit',(e)=>{
  e.preventDefault();
  //validamos el userName
  if(e.target[0].value.length <= 3 || e.target[0].value.length >= 10){
    player_error.innerHTML = 'de 3 a 10 caracteres';
    return
  }
  if(!regex.test(e.target[0].value)){
    player_error.innerHTML ="No smbolos especiales";
    return
  }
  //validamos la contraseña
  if(e.target[1].value.length<3 || e.target[1].value.length > 10){
    password_error.innerHTML = "de 3 a 10 caracteres";
    return
  }
  window.localStorage.setItem('game',true)
  window.localStorage.setItem('user',e.target[0].value)
  container_form.classList.add('not-active');
})
