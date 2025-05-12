// Récupération des éléments HTML5
const sections = document.querySelectorAll("section");
const lastName = document.querySelector("#name");
const email = document.querySelector("#email");
const textarea = document.querySelector("#message");
const submitBtn = document.querySelector("button");

// Création de l'objet options permettant de contrôler les circonstances selon lesquelles la fonction callback de l'observateur est invoquée
let options = {
  root: null, // l'élément qui est utilisé comme zone d'affichage au moment d'évaluer la visibilité de la cible. sa valeur par défaut (null) est la zone d'affichage (le viewport) du navigateur.
  rootMargin: "-25% 0px", // La marge autour de la racine. Cet ensemble de valeur sert à agrandir ou à réduire chaque coté du cadre délimitant l'élément racine avant d'évaluer les intersections.
  threshold: 0, // Indique à quel pourcentage de la visibilité de la cible la fonction callback de la cible doit être exécuté
};

// Déclaration de la fonction callback handleIntersect qui va permettre l'apparition des cartes
const handleIntersect = (entries) => {
  console.log(entries);
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
    }
  });
};

// L'API Intersection Observer permet d'intégrer une fonction callback qui est exécutée quand un élément qu'on souhaite surveiller entre ou sort du viewport (zone d'affichage)
const observer = new IntersectionObserver(handleIntersect, options);

// Elément cible à observer
sections.forEach((section) => {
  observer.observe(section);
});

// Regex

const regexName = /^[A-Z][A-Za-z\é\è\ê\ô\-]+$/;
const regexEmail = /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/;

/**
 * Déclaration de la fonction lastNameValidation pour la validation du champ nom
 *  @param {String} lastName
 */
const lastNameValidation = (lastName) => {
  // Ecoute de l'événement "change" sur l'input lastName
  lastName.addEventListener("change", (e) => {
    // Suppression du comportement par défaut
    e.preventDefault();
    // condition if... else
    // La méthode match() permet d'obtenir le tableau des correspondances entre la chaîne courante et une expression rationnelle.
    if (lastName.value.match(regexName)) {
      lastName.style.border = "2px solid #0fbd3a";
      return true;
    } else {
      lastName.style.border = "2px solid #ff0000";
      return false;
    }
  });
};
// Appel de la fonction lastNameValidation
lastNameValidation(lastName);

/**
 * Déclaration de la fonction emailValidation pour la validation du champ email
 * @param {String} email
 */
const emailValidation = (email) => {
  // Ecoute de l'événement "change" sur l'input email
  email.addEventListener("change", (e) => {
    // Suppression du comportement par défaut
    e.preventDefault();
    if (email.value.match(regexEmail)) {
      email.style.border = "2px solid #0fbd3a";
      return true;
    } else {
      email.style.border = "2px solid #ff0000";
      return false;
    }
  });
};
// Appel de la fonction emailValidation
emailValidation(email);

/**
 * Déclaration de la fonction textareaValidation pour la validation du textarea
 * @param {String} textarea
 */
const textareaValidation = (textarea) => {
  textarea.addEventListener("input", (e) => {
    // Suppression du comportement par défaut
    e.preventDefault();
    if (textarea.value == "") {
      textarea.style.border = "2px solid #ff0000";
      return false;
    } else {
      textarea.style.border = " 2px solid #0fbd3a";
      return true;
    }
  });
};

// Appel de la fonction textareaValidation
textareaValidation(textarea);

// Déclaration de la fonction sendData permettant d'envoyer les données
const sendData = () => {
  // Ecoute de l'événement "click" sur le bouton "Envoyer !"
  submitBtn.addEventListener("click", (e) => {
    // Suppression du comportement par défaut
    e.preventDefault();
    if (
      !lastName.value.match(regexName) ||
      !email.value.match(regexEmail) ||
      textarea.value == ""
    ) {
      alert(
        "Veuillez remplir correctement tous les champs du formulaire correctement !"
      );
    } else {
      const contact = {
        lastName: lastName.value,
        email: email.value,
        textarea: textarea.value,
      };
      console.log(contact);
      alert("Votre message a bien été envoyé !");
      // Rechargement de la page
      window.location.reload();
      lastName.value = "";
      email.value = "";
      textarea.value = "";
      window.scrollTo(0, 0);
    }
  });
};
// Appel de la fonction sendData()
sendData();
