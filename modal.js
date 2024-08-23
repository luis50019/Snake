const btnPlay = document.getElementById('btn-play');
const modalScore = document.getElementById('modal-score');

function showModal() {
  const modal = document.getElementById('modal');
  if (modal.classList.length == 1) {
    modalScore.innerHTML = 'Score ' + localStorage.getItem('score')
  } else {
    window.requestAnimationFrame(showModal)
  }
}
showModal();

btnPlay.addEventListener('click', () => {
  setTimeout(() => {
    modal.classList.add('not-active');
    // Verificar si realmente deseas recargar la página
    window.snake = [
      { "y": 12, "x": 1 },
      { "y": 13, "x": 1 },
      { "y": 14, "x": 1 }
    ];
    window.localStorage.setItem('game', "refresh")

  }, 200);
});
