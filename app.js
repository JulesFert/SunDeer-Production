let app = {

    burger2 : null,
    nav : null,
    body : null,
    isFiltered: null,

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

        app.audio();
        app.compos();
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

audio: function() {
    // Récupérer toutes les images
    const images = document.querySelectorAll('.img__container figure');

    // Récupérer l'élément audio
    const audio = document.getElementsByClassName('audio');
    const audioArray = Array.from(audio);

    // Variable pour suivre l'état de l'audio
    let isAudioPlaying = false;

    // Ajouter un écouteur d'événements à chaque image
    images.forEach((image, index) => {
        image.addEventListener('click', () => {
            // Vérifier si l'audio est en cours de lecture
            if (isAudioPlaying) {
                // Si l'audio est en cours de lecture, mettre en pause
                audioArray[index].pause();
                isAudioPlaying = false;
                console.log('on met en pause')
                const lastChild = image.lastElementChild
                lastChild.classList.remove('yellow')
            } else {
                // Définir le fichier audio à jouer en fonction de l'image cliquée
                if (image.id === 'figure1') {
                    audioArray[index].play();
                    isAudioPlaying = true;
                } else if (image.id === 'figure2') {
                    audioArray[index].play();
                    isAudioPlaying = true;
                }
                
                // Lancer la lecture de l'audio
                audioArray[index].play();
                isAudioPlaying = true;

                const lastChild = image.lastElementChild
                lastChild.classList.add('yellow')
            }
        });
    });
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
  
},

compos: function() {

    // je récupère tous les boutons et des figures
    const navButtons = document.querySelectorAll('.nav-button');
    const figures = document.querySelectorAll('.figure');

    // pour tous les boutons
    navButtons.forEach(button => {
        // j'ajoute un listener
        button.addEventListener('click', function () {
            // je récupère le filtre du bouton courant
            const filter = button.dataset.filter

            // on remet tous les boutons en normal
            navButtons.forEach(btn => {
                btn.style.fontWeight = 'normal'
                btn.style.color = ''
            });
           
            // si on réappuie sur le meme bouton déjà activé
            if (app.isFiltered === filter) {
                // tous les figure se réaffichent
                figures.forEach(figure => {
                    figure.style.display = 'flex'
                });
                // et on remet le filtre à zéro
                app.isFiltered = null;
            } else {

            // sinon, on masque toutes les figures...
            figures.forEach(figure => {
                figure.style.display = 'none'
            });

            // ...et on affiche les figures correspondant au filtre
            const filteredFigures = document.querySelectorAll('.' + filter)
            filteredFigures.forEach(figure => {
                figure.style.display = 'flex'
            });

            // on a filtré, on enregistre la valeur du filtre 
            app.isFiltered = filter

            // on met le bouton concerné en gras pour indiquer le filtre actif
            button.style.fontWeight = 'bold'
            button.style.color = '#FFCA0A'
            }


        });
    });

},

};

app.init();
