// Récupération des éléments HTML5
const sections = document.querySelectorAll("section");

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
