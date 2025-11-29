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
// Initialise EmailJS avec ta clé publique
emailjs.init("GwAf5fbpGNqltZH4S");

document.addEventListener("DOMContentLoaded", function () {

    // Récupération du formulaire et du paragraphe pour les messages de statut
    const form = document.getElementById("contact-form");
    const status = document.getElementById("status");

    // Anti-spam : empêche d'envoyer un nouveau message avant 30 secondes
    let canSend = true;

    form.addEventListener("submit", function (e) {
        e.preventDefault(); // Empêche le rechargement de la page à l'envoi

        // Vérifie si le cooldown est actif
        if (!canSend) {
            status.textContent = "Veuillez patienter avant de renvoyer un message.";
            status.style.color = "red";
            // Efface le message après 3 secondes
            setTimeout(() => status.textContent = "", 3000);
            return;
        }

        // Active le cooldown de 30 secondes
        canSend = false;
        setTimeout(() => canSend = true, 30000);

        // Récupère les valeurs du formulaire
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        // Vérifie que le formulaire est correctement rempli
        if (name.length < 2 || message.length < 5) {
            status.textContent = "Veuillez remplir correctement le formulaire.";
            status.style.color = "red";
            setTimeout(() => status.textContent = "", 3000);
            return;
        }

        // Met la première lettre du nom en majuscule
        const nameCapitalized = name.charAt(0).toUpperCase() + name.slice(1);

        // Envoi du message vers TON email
        emailjs.sendForm("service_4wcvn3f", "template_j2w1hla", form)
            .then(() => {

                // Envoi du mail de confirmation au visiteur
                emailjs.send("service_4wcvn3f", "template_fsyhxki", {
                    name: nameCapitalized, // Nom du visiteur
                    email: email          // Email du visiteur
                });

                // Affiche le message de succès
                status.textContent = "Message envoyé !";
                status.style.color = "green";
                form.reset(); // Réinitialise le formulaire

                // Efface le message après 3 secondes
                setTimeout(() => status.textContent = "", 3000);

            })
            .catch(() => {
                // Affiche un message d'erreur si l'envoi échoue
                status.textContent = "Erreur lors de l'envoi.";
                status.style.color = "red";
                setTimeout(() => status.textContent = "", 3000);
            });
    });
});
