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
  catalogue.innerHTML = "";

  const debut = (pageActuelle - 1) * itemsParPage;
  const fin = debut + itemsParPage;

  const pageItems = series.slice(debut, fin);

  pageItems.forEach((contenu) => {
    const card = document.createElement("div");
    card.classList.add("serie-card");

    const image = document.createElement("img");
    image.src =
      contenu.Poster !== "N/A" ? contenu.Poster : "Image/no-image.png";
    image.alt = contenu.Title;

    const titre = document.createElement("h3");
    titre.textContent = contenu.Title || contenu.titre;

    const description = document.createElement("p");
    description.textContent = contenu.Year
      ? `Année : ${contenu.Year}`
      : contenu.description || "";

    const type = document.createElement("p");
    type.textContent = contenu.Type ? `Type : ${contenu.Type}` : "";

    const button = document.createElement("button");
    button.textContent = "Voir";

    card.appendChild(image);
    card.appendChild(titre);
    card.appendChild(description);
    card.appendChild(type);
    card.appendChild(button);

    catalogue.appendChild(card);

    // Si l’élément vient de l’API, on a un imdbID
    button.addEventListener("click", () => {
      if (contenu.imdbID) {
        fetch(`https://www.omdbapi.com/?apikey=47fd8d36&i=${contenu.imdbID}`)
          .then((res) => res.json())
          .then((details) => ouvrirModal(details));
      } else {
        ouvrirModal(contenu); // données locales (films ou séries en dur)
      }
    });
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

function ouvrirModal(contenu) {
  const modal = document.getElementById("modal");

  const html = `
    <div class="modal-content">
      <h2>${contenu.Title || contenu.titre}</h2>
      <p><strong>Année :</strong> ${contenu.Year || ""}</p>
      <p><strong>Durée :</strong> ${contenu.Runtime || "?"}</p>
      <p><strong>Genre :</strong> ${contenu.Genre || "?"}</p>
      <p><strong>Acteurs :</strong> ${contenu.Actors || "?"}</p>
      <p><strong>Synopsis :</strong> ${
        contenu.Plot || contenu.description || "Aucune description"
      }</p>
      <button id="fermer">Fermer</button>
    </div>
  `;

  modal.innerHTML = html;
  modal.style.display = "flex";

  document.getElementById("fermer").addEventListener("click", fermerModal);
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
  recherche = champRecherche.value.toLowerCase();

  console.log(cleAPI);
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
champRecherche.addEventListener("input", () => {
  pageActuelle = 1;
  lancerRecherche(champRecherche.value);
});

function lancerRecherche(recherche) {
  if (recherche.length < 3) return;

  const type = document.getElementById("filtreType").value;
  const annee = document.getElementById("filtreAnnee").value;

  let url = `https://www.omdbapi.com/?apikey=47fd8d36&s=${recherche}&page=${pageActuelle}`;

  if (type !== "all") {
    url += `&type=${type}`;
  }

  if (annee) {
    url += `&y=${annee}`;
  }

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data.Response === "True") {
        currentData = data.Search;
        afficheCatalogue(currentData);
      } else {
        document.getElementById("catalogue").innerHTML =
          "<p>Aucun résultat trouvé</p>";
        document.getElementById("pagination").innerHTML = "";
      }
    })
    .catch((err) => {
      console.error("Erreur API :", err);
    });
}

document.getElementById("Films").addEventListener("click", function (rech) {
  rech.preventDefault();
  recherche = e;
  currentData = dataFilms;
  document.getElementById("catalogue").style.display = "block";
  afficheCatalogue(dataFilms);
});

let recherche = "";
const cleAPI = `https://www.omdbapi.com/?apikey=47fd8d36&s&t=${recherche}`;

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

document.getElementById("filtreType").addEventListener("change", () => {
  pageActuelle = 1;
  lancerRecherche(champRecherche.value);
});

document.getElementById("filtreAnnee").addEventListener("input", () => {
  pageActuelle = 1;
  lancerRecherche(champRecherche.value);
});
