const btnPlay = document.getElementById('btn-play');
const modalScore = document.getElementById('modal-score');
const modal = document.getElementById('modal');

function showModal() {
  if (modal.classList.length == 1) {
    modalScore.innerHTML = 'Score ' + localStorage.getItem('score')
  } else {
    window.requestAnimationFrame(showModal)
  }
}
showModal();

btnPlay.addEventListener('click', () => {
  modal.classList.add('not-active');
  // Verificar si realmente deseas recargar la página
  window.localStorage.setItem('score', 0)
  // window.location.reload()
});
btnPlay.addEventListener('touchstart', () => {
  modal.classList.add('not-active');
  // Verificar si realmente deseas recargar la página
  window.localStorage.setItem('score', 0)
  // window.location.reload()
});