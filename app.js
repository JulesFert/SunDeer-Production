let app = {

    burger2 : null,
    nav : null,
    body : null,

init: function() {
        console.log('Initialisation');

        // je vide le cache
        app.emptyCache();

        // j'initialise la navbar dynamique
        app.navbar();

        // je met en place l'écouteur d'évènement pour la navbar burger
        // const burger = document.querySelector("#burger");
        // burger.addEventListener("click", app.handleClickBurger);

        // écouteur d'évênement sur chacun des liens de la navbar pour l'enlever quand on clique
        const links = document.querySelectorAll('.navbar-link')
        for ( i=0; i < links.length; i++) {
            links[i].addEventListener('click', app.handleClickLink)
        }

        const linksBurger = document.querySelectorAll('.burger-link')
        for ( i=0; i < linksBurger.length; i++) {
            linksBurger[i].addEventListener('click', app.handleClickLinkBurger)
        }

        // Sélection des éléments avec la classe 'burger' et 'overlay'
        app.burger2 = document.querySelector('.burger');
        app.nav = document.querySelector('nav');
        app.body = document.body;

        // Ajout d'un écouteur d'événements pour le clic sur 'burger' ou 'overlay'
        app.burger2.addEventListener('click', app.toggleMenu);

        // Ajout d'un écouteur d'évènement sur le bouton du formulaire
        if (document.querySelector('form')) {
            document.querySelector('form').addEventListener('submit', app.handleSubmit);
        }

        // pour le pop up à l'envoit du formulaire
        if(document.getElementById('myForm')) {
            const form = document.getElementById('myForm');
            form.addEventListener('submit', app.handleSubmit);
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
            console.log('navbar apparait')
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
    navbarBurger.classList.remove('show-burger');
},

handleClickLinkBurger : function() {
    app.toggleMenu();
},

// Fonction de gestionnaire d'événement pour le clic sur 'burger' ou 'overlay'
toggleMenu : function() {
  // Ajoute ou supprime la classe 'clicked' sur 'burger'
  app.burger2.classList.toggle('clicked');
  // Ajoute ou supprime la classe 'show' sur 'overlay' et 'nav'
  app.nav.classList.toggle('show');
  // Ajoute ou supprime la classe 'overflow' sur 'body'
  app.body.classList.toggle('overflow');
},

handleSubmit : function(event) {
    console.log('form bien submit !');
    alert("Votre message a été transmit avec succès !");
},

emptyCache: function() {

    self.addEventListener('activate', function(event) {
        event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
            cacheNames.map(function(cacheName) {
                return caches.delete(cacheName);
            })
            )
        })
        )
    })
  
}

};

app.init();