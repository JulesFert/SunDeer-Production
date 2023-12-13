let prevScrollpos = window.scrollY;

if (prevScrollpos === 0) {
  document.querySelector('#navbar').classList.add('hidden'); 
}

window.onscroll = function() {

  let currentScrollPos = window.scrollY;

  if (prevScrollpos > currentScrollPos) {
    // Scroll vers le haut
    document.querySelector('#navbar').classList.remove('hidden');
  } else {
    // Scroll vers le bas
    document.querySelector('#navbar').classList.remove('hidden'); 
  }

  prevScrollpos = currentScrollPos;

  if (prevScrollpos === 0) {
    document.querySelector('#navbar').classList.add('hidden'); 
  }
};