let app = {


init: function() {
        console.log('Initialisation');
        // j'initialise la navbar dynamique
        app.navbar();

        // je met en place l'écouteur d'évènement pour la navbar burger
        const burger = document.querySelector("#burger");
        burger.addEventListener("click", app.handleClickBurger);

        // écouteur d'évênement sur chacun des liens de la navbar pour l'enlever quand on clique
        const links = document.querySelectorAll('.navbar-link')
        for ( i=0; i < links.length; i++) {
            links[i].addEventListener('click', app.handleClickLink)
        }
    },

navbar : function() {
    console.log('navbar ok')
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
}, 

handleClickBurger : function() {

    console.log('burger cliqué');

    const navbarBurger = document.querySelector('#navbar');
    if (navbarBurger.classList.contains('show-burger')) {
        navbarBurger.classList.remove('show-burger')
    } else {
        navbarBurger.classList.add('show-burger')
    }
},

handleClickLink : function () {
    console.log('la navbar doit se retirer')
    const navbarBurger = document.querySelector('#navbar');
    navbarBurger.classList.remove('show-burger')
}

};

app.init();