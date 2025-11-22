// Fonction appelée quand on clique sur l'icône hamburger
function toggleMenu() {

    // On récupère l'icône (les 3 barres)
    const icon = document.querySelector('.hamburger-icon');

    // On récupère le conteneur du menu déroulant
    const menu = document.querySelector('.menu-links');

    // Ajoute/enlève la classe "open" → anime les barres en X
    icon.classList.toggle('open');

    // Ajoute/enlève "open" → ouvre et ferme le menu
    menu.classList.toggle('open');
}
