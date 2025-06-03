let pageActuelle = 1;
const itemsParPage = 10;

document.getElementById("Series").addEventListener("click", function (rech) {
  rech.preventDefault(); // empecher le rechargement de la page
  currentData = data; // afficher seulement les series
  document.getElementById("catalogue").style.display = "block";
  afficheCatalogue(currentData);
});

//series présentent dans l'apllication
const data = [
  {
    titre: "Prison Break",
    description: "Un frère arrive ne prison pour sauver son frère",
  },
  {
    titre: "Breaking Bad",
    description: "Un prof de chimie devient criminel",
  },
  {
    titre: "Alice in Borderland",
    description:
      "Arisu et ses amis se précipitent dans les toilettes publiques pour se cacher de la police. Lorsqu'ils en ressortent, les rues de tokyo sont vides ",
  },
  {
    titre: "Outer Banks",
    description:
      "Un adolescent demande à ses trois meilleurs amis de partir à la recherche d'un trésor légendaire lié à la disparition de son père. Cependant, cette aventure s'avère être un danger pour toutes les personnes impliquées.",
  },
  {
    titre: "Biohackers",
    description:
      "Mia est étudiante en médecine. Elle découvre l'utilisation de la technologie de pointe du bio-piratage au sein de son université. Lorsqu'une découverte révolutionnaire tombe entre de mauvaises mains, Mia doit décider de quel côté elle souhaite être.",
  },
  {
    titre: "Stranger things",
    description:
      "En 1983, à Hawkins dans l'Indiana, Will Byers disparaît de son domicile. Ses amis se lancent alors dans une recherche semée d'embûches pour le retrouver. Pendant leur quête de réponses, les garçons rencontrent une étrange jeune fille en fuite.",
  },
  {
    titre: "Scontrole Z",
    description:
      "Après qu'un pirate informatique ait commencé à exposer les secrets des élèves du Collège national devant toute l'école, la distante et observatrice Sofia se lance dans la découverte de son identité.",
  },
  {
    titre: "The I-land",
    description:
      "Dix inconnus se réveillent sur une île déserte dangereuse sans aucun souvenir de qui ils sont ni comment ils sont arrivés, et découvrent bientôt sur l'île que tout n'est pas comme il semble.",
  },
  {
    titre: "The walking dead",
    description:
      "Après une apocalypse ayant transformé la quasi-totalité de la population en zombies, un groupe d'hommes et de femmes mené par l'officier Rick Grimes tente de survivre. Ensemble, ils vont devoir tant bien que mal faire face à ce nouveau monde.",
  },
  {
    titre: "manifest",
    description:
      "Lorsque le vol Montego 828 atterrit à New-York, ses 191 passagers apprennent qu'ils viennent de faire un bond de 5 ans dans le futur, et que tous les croyaient morts ou perdus à jamais.",
  },
  {
    titre: "Narcos",
    description:
      "Inspirée de l'histoire du célèbre narcotrafiquant de Medellín Pablo Escobar, cette série raconte la guerre sanglante des cartels en Colombie.",
  },
];

function afficheCatalogue(series) {
  const catalogue = document.getElementById("catalogue");
  catalogue.innerHTML = ""; //vider le contenue

  //Calculer l'index de début et de fin selon la page actuelle
  const debut = (pageActuelle - 1) * itemsParPage;
  const fin = debut + itemsParPage;

  const pageItems = series.slice(debut, fin); // Découper le tableau pour ne garder que les items de la page actuelle

  pageItems.forEach((contenue) => {
    //Parcourir le tableau
    const card = document.createElement("div"); // création des éléments pour l'affiche
    card.classList.add("serie-card");
    const titre = document.createElement("h3");
    const description = document.createElement("p");
    const button = document.createElement("button");

    titre.textContent = contenue.titre; //remplie les élements créés ci-dessus
    description.textContent = contenue.description;
    button.textContent = "Voir";

    card.appendChild(titre); //Ajout des éléments à l'affiche
    card.appendChild(description);
    card.appendChild(button);

    catalogue.appendChild(card);

    button.addEventListener("click", () => ouvrirModal(contenue));
  });

  affichePagination(series.length);
}

function affichePagination(tailleTotale) {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = ""; // vide les anciens boutons

  const totalPages = Math.ceil(tailleTotale / itemsParPage);

  // Bouton Précédent
  const btnPrev = document.createElement("button");
  btnPrev.textContent = "Précédent";
  btnPrev.disabled = pageActuelle === 1; // désactivé si on est sur la 1ère page
  btnPrev.addEventListener("click", () => {
    if (pageActuelle > 1) {
      pageActuelle--;
      afficheCatalogue(currentData);
    }
  });
  pagination.appendChild(btnPrev);

  // Boutons numérotés
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    if (i === pageActuelle) {
      btn.style.backgroundColor = "#a84dff"; // surbrillance page active
      btn.style.color = "#1a1026";
      btn.style.fontWeight = "bold";
    }
    btn.addEventListener("click", () => {
      pageActuelle = i;
      afficheCatalogue(currentData);
    });
    pagination.appendChild(btn);
  }

  // Bouton Suivant
  const btnNext = document.createElement("button");
  btnNext.textContent = "Suivant";
  btnNext.disabled = pageActuelle === totalPages; // désactivé si dernière page
  btnNext.addEventListener("click", () => {
    if (pageActuelle < totalPages) {
      pageActuelle++;
      afficheCatalogue(currentData);
    }
  });
  pagination.appendChild(btnNext);
}

function ouvrirModal(contenue) {
  const modal = document.getElementById("modal");

  modal.innerHTML = `
  <div class="modal-content">
  <h2>${contenue.titre}</h2>
  <p>${contenue.description}</p>
  <button id="fermer">Fermer</button>
  </div>
  `;

  modal.style.display = "block"; // afficher l modale

  document.getElementById("fermer").addEventListener("click", fermerModal); // AJout du bouton fermer
}

function fermerModal() {
  const modal = document.getElementById("modal");
  modal.style.display = "none";
  modal.innerHTML = "";
}

window.addEventListener("click", (e) => {
  const modal = document.getElementById("modal");
  if (e.target === modal) {
    fermerModal();
  }
});

const champRecherche = document.getElementById("recherche");

function filtrerCatalogue() {
  pageActuelle = 1;
  const texte = champRecherche.value.toLowerCase();
  const resultatsFiltres = currentData.filter(function (item) {
    return item.titre.toLowerCase().includes(texte);
  });

  currentData = resultatsFiltres;

  if (resultatsFiltres.length === 0) {
    document.getElementById("catalogue").innerHTML =
      "<p>Aucun résultat trouvé</p>";
  } else {
    afficheCatalogue(resultatsFiltres);
  }
}
champRecherche.addEventListener("input", filtrerCatalogue);

document.getElementById("Films").addEventListener("click", function (rech) {
  rech.preventDefault();
  currentData = dataFilms;
  document.getElementById("catalogue").style.display = "block";
  afficheCatalogue(dataFilms);
});

const dataFilms = [
  {
    titre: "Ready Player One",
    description:
      "Dans un monde dévasté, un jeune gamer talentueux se lance dans une compétition planétaire. L'enjeu ? L'héritage d'un trésor et d'un immense univers de réalité virtuelle  ",
  },
  {
    titre: "Captain America",
    description:
      "Steve Rogers participe à un projet de recherche top secret qui le transforme en Captaine America",
  },
  {
    titre: "Adam à travers le temps",
    description:
      "Après un atterissage forcé en 2022, le pilote de chasse et voyageur dans le temps Adam Reed fait équipe avec une version de lui-meme agée de 12 ans pour sauver le futur",
  },
  {
    titre: "Passengers",
    description:
      "Alors que 5.000 passagers endormis pour longtemps voyagent dans l'espace vers une nouvelle planète, deux d'entre eux sont accidentellement tirés de leur sommeil artificiel 90 ans trop tôt. Jim et Aurora doivent désormais accepter l'idée de passer le reste de leur existence à bord du vaisseau spatial. Alors qu'ils éprouvent peu à peu une indéniable attirance, ils découvrent que le vaisseau court un grave danger. La vie des milliers de passagers endormis est entre leurs mains.",
  },
  {
    titre: "Iron Man",
    description:
      "L'homme d'affaires Tony Stark décide de défendre le monde sous le nom de Iron Man",
  },
  {
    titre: "Oxygène",
    description:
      "Enfermée dans une unité cryogénique, Liz tente désesperément de se souvenir de son identité et de s'échapper avant d'étre à court d'oxygène",
  },
];

let currentData = data;

function afficheAccueil() {
  const catalogue = document.getElementById("catalogue");
  catalogue.style.display = "block";

  const tousLesContenus = [...data, ...dataFilms]; //mélanger series + films sur la page d'accueil

  tousLesContenus.sort(() => Math.random() - 0.5);

  currentData = tousLesContenus;
  afficheCatalogue(tousLesContenus);
}

document.getElementById("Accueil").addEventListener("click", function (rech) {
  rech.preventDefault();
  document.getElementById("modal").style.display = "none"; // Cache la modale si elle est ouverte
  document.getElementById("modal").innerHTML = "";
  champRecherche.value = "";
  afficheAccueil();
});

window.addEventListener("DOMContentLoaded", function () {
  afficheAccueil();
});
