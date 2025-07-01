let pageActuelle = 1;
const itemsParPage = 10;
let currentData = [];
let recherche = "";

const dataSeries = [
  {
    titre: "Prison Break",
    description: "Un frère arrive en prison pour sauver son frère",
  },
  {
    titre: "Breaking Bad",
    description: "Un prof de chimie devient criminel",
  },
  {
    titre: "Alice in Borderland",
    description:
      "Arisu et ses amis se précipitent dans les toilettes publiques pour se cacher de la police. Lorsqu'ils en ressortent, les rues de Tokyo sont vides.",
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
    titre: "Stranger Things",
    description:
      "En 1983, à Hawkins dans l'Indiana, Will Byers disparaît de son domicile. Ses amis se lancent alors dans une recherche semée d'embûches pour le retrouver. Pendant leur quête, les garçons rencontrent une étrange jeune fille en fuite.",
  },
  {
    titre: "Scontrole Z",
    description:
      "Après qu'un pirate informatique ait commencé à exposer les secrets des élèves du Collège national devant toute l'école, la distante et observatrice Sofia se lance dans la découverte de son identité.",
  },
  {
    titre: "The I-Land",
    description:
      "Dix inconnus se réveillent sur une île déserte dangereuse sans aucun souvenir de qui ils sont ni comment ils sont arrivés, et découvrent bientôt sur l'île que tout n'est pas comme il semble.",
  },
  {
    titre: "The Walking Dead",
    description:
      "Après une apocalypse ayant transformé la quasi-totalité de la population en zombies, un groupe mené par Rick Grimes tente de survivre. Ensemble, ils vont devoir faire face à ce nouveau monde.",
  },
  {
    titre: "Manifest",
    description:
      "Lorsque le vol Montego 828 atterrit à New York, ses passagers apprennent qu'ils ont fait un bond de 5 ans dans le futur, et que tous les croyaient morts.",
  },
  {
    titre: "Narcos",
    description:
      "Inspirée de l'histoire du narcotrafiquant Pablo Escobar, cette série raconte la guerre sanglante des cartels en Colombie.",
  },
];

const dataFilms = [
  {
    titre: "Ready Player One",
    description:
      "Dans un monde dévasté, un jeune gamer talentueux se lance dans une compétition planétaire. L'enjeu ? L'héritage d'un trésor et d'un immense univers de réalité virtuelle.",
  },
  {
    titre: "Captain America",
    description:
      "Steve Rogers participe à un projet de recherche top secret qui le transforme en Captain America.",
  },
  {
    titre: "Adam à travers le temps",
    description:
      "Après un atterrissage forcé en 2022, le pilote de chasse et voyageur dans le temps Adam Reed fait équipe avec une version de lui-même âgée de 12 ans pour sauver le futur.",
  },
  {
    titre: "Passengers",
    description:
      "Alors que 5 000 passagers endormis voyagent vers une nouvelle planète, deux d'entre eux sont tirés de leur sommeil artificiel 90 ans trop tôt. Ils doivent maintenant affronter un danger pour tout le monde à bord.",
  },
  {
    titre: "Iron Man",
    description:
      "L'homme d'affaires Tony Stark décide de défendre le monde sous le nom d'Iron Man.",
  },
  {
    titre: "Oxygène",
    description:
      "Enfermée dans une unité cryogénique, Liz tente désespérément de se souvenir de son identité et de s'échapper avant d'être à court d'oxygène.",
  },
];

// Initialisation de la page d'accueil avec mélange films + séries
function afficheAccueil() {
  const catalogue = document.getElementById("catalogue");
  catalogue.style.display = "block";

  // Mélange films + séries
  const tousLesContenus = [...dataSeries, ...dataFilms];
  tousLesContenus.sort(() => Math.random() - 0.5);

  currentData = tousLesContenus;
  pageActuelle = 1;
  afficheCatalogue(tousLesContenus);
}

// Affiche le catalogue avec pagination
function afficheCatalogue(series) {
  const catalogue = document.getElementById("catalogue");
  catalogue.innerHTML = "";

  const debut = (pageActuelle - 1) * itemsParPage;
  const fin = debut + itemsParPage;
  const pageItems = series.slice(debut, fin);

  pageItems.forEach((contenu) => {
    const card = document.createElement("div");
    card.classList.add("serie-card");

    const titre = document.createElement("h3");
    titre.textContent = contenu.titre || contenu.Title || "Titre inconnu";

    const description = document.createElement("p");
    description.textContent = contenu.description || contenu.Plot || "Pas de description.";

    // Bouton voir détails
    const buttonVoir = document.createElement("button");
    buttonVoir.textContent = "Voir";

    // Bouton favori
    const btnFavori = document.createElement("button");
    btnFavori.classList.add("btn-favori");

    // Ici, favorisUtilisateur doit être un tableau injecté côté PHP, sinon []
    const estFavori = typeof favorisUtilisateur !== "undefined" && favorisUtilisateur.includes(contenu.imdbID || contenu.imdb_id || "");
    btnFavori.textContent = estFavori ? "❤️" : "🤍";
    btnFavori.dataset.imdbid = contenu.imdbID || contenu.imdb_id || "";

    btnFavori.addEventListener("click", () => {
      const imdbID = btnFavori.dataset.imdbid;
      fetch("toggle_favori.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: "imdbID=" + encodeURIComponent(imdbID),
      })
        .then((res) => res.text())
        .then((response) => {
          btnFavori.textContent = btnFavori.textContent === "🤍" ? "❤️" : "🤍";
          alert(response);
        })
        .catch(console.error);
    });

    card.appendChild(titre);
    card.appendChild(description);
    card.appendChild(buttonVoir);
    card.appendChild(btnFavori);

    catalogue.appendChild(card);

    buttonVoir.addEventListener("click", () => {
      if (contenu.imdbID) {
        fetch(`https://www.omdbapi.com/?apikey=47fd8d36&i=${contenu.imdbID}`)
          .then((res) => res.json())
          .then((details) => ouvrirModal(details));
      } else {
        ouvrirModal(contenu);
      }
    });
  });

  affichePagination(series.length);
}

// Pagination
function affichePagination(tailleTotale) {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  const totalPages = Math.ceil(tailleTotale / itemsParPage);

  const btnPrev = document.createElement("button");
  btnPrev.textContent = "Précédent";
  btnPrev.disabled = pageActuelle === 1;
  btnPrev.addEventListener("click", () => {
    if (pageActuelle > 1) {
      pageActuelle--;
      afficheCatalogue(currentData);
    }
  });
  pagination.appendChild(btnPrev);

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    if (i === pageActuelle) {
      btn.style.backgroundColor = "#a84dff";
      btn.style.color = "#1a1026";
      btn.style.fontWeight = "bold";
    }
    btn.addEventListener("click", () => {
      pageActuelle = i;
      afficheCatalogue(currentData);
    });
    pagination.appendChild(btn);
  }

  const btnNext = document.createElement("button");
  btnNext.textContent = "Suivant";
  btnNext.disabled = pageActuelle === totalPages;
  btnNext.addEventListener("click", () => {
    if (pageActuelle < totalPages) {
      pageActuelle++;
      afficheCatalogue(currentData);
    }
  });
  pagination.appendChild(btnNext);
}

// Modale détails
function ouvrirModal(contenu) {
  const modal = document.getElementById("modal");

  const favoriBtnHTML = contenu.imdbID
    ? `<button id="favori-btn" data-imdbid="${contenu.imdbID}">Ajouter aux favoris</button>`
    : "";

  modal.innerHTML = `
    <div class="modal-content">
      <h2>${contenu.Title || contenu.titre}</h2>
      <p><strong>Année :</strong> ${contenu.Year || ""}</p>
      <p><strong>Durée :</strong> ${contenu.Runtime || "?"}</p>
      <p><strong>Genre :</strong> ${contenu.Genre || "?"}</p>
      <p><strong>Acteurs :</strong> ${contenu.Actors || "?"}</p>
      <p><strong>Synopsis :</strong> ${contenu.Plot || contenu.description || "Aucune description"}</p>
      ${favoriBtnHTML}
      <button id="fermer">Fermer</button>
    </div>
  `;

  modal.style.display = "flex";

  const favButton = document.getElementById("favori-btn");
  if (favButton) {
    if (typeof userIsLoggedIn !== "undefined" && userIsLoggedIn) {
      favButton.style.display = "inline-block";
      favButton.addEventListener("click", () => {
        const imdbID = favButton.dataset.imdbid;
        fetch("ajouter_favori.php", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: "imdbID=" + encodeURIComponent(imdbID),
        })
          .then((response) => response.text())
          .then((resultat) => alert(resultat))
          .catch((error) => console.error("Erreur :", error));
      });
    } else {
      favButton.style.display = "none";
    }
  }

  document.getElementById("fermer").addEventListener("click", fermerModal);
}

function fermerModal() {
  const modal = document.getElementById("modal");
  modal.style.display = "none";
  modal.innerHTML = "";
}

// Ferme modale si clic hors contenu
window.addEventListener("click", (e) => {
  const modal = document.getElementById("modal");
  if (e.target === modal) {
    fermerModal();
  }
});

// Recherche dans catalogue local (films ou séries)
const champRecherche = document.getElementById("recherche");

champRecherche.addEventListener("input", () => {
  pageActuelle = 1;
  lancerRecherche(champRecherche.value);
});

function lancerRecherche(texteRecherche) {
  if (texteRecherche.length < 3) return;

  const type = document.getElementById("filtreType").value;
  const annee = document.getElementById("filtreAnnee").value;

  let url = `https://www.omdbapi.com/?apikey=47fd8d36&s=${encodeURIComponent(texteRecherche)}&page=${pageActuelle}`;

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
        document.getElementById("catalogue").innerHTML = "<p>Aucun résultat trouvé</p>";
        document.getElementById("pagination").innerHTML = "";
      }
    })
    .catch((err) => console.error("Erreur API :", err));
}

// Gestion des clics menu
document.getElementById("Accueil").addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("modal").style.display = "none";
  document.getElementById("modal").innerHTML = "";
  champRecherche.value = "";
  afficheAccueil();
});

document.getElementById("Series").addEventListener("click", (e) => {
  e.preventDefault();
  currentData = dataSeries;
  pageActuelle = 1;
  afficheCatalogue(dataSeries);
});

document.getElementById("Films").addEventListener("click", (e) => {
  e.preventDefault();
  currentData = dataFilms;
  pageActuelle = 1;
  afficheCatalogue(dataFilms);
});

// Initialisation
afficheAccueil();
