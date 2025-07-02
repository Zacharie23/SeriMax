# SeriMax

Présentation rapide

- Nom :SeriMax
- objectif de l’application : Plateforme web permettant de rechercher, consulter et enregistrer des films et séries en favoris grâce à l’API OMDb.
- Fonctionnalités principales : Recherche de films et séries via l’API OMDb

                                Filtrage par type (film/série) et année

                                Affichage des résultats avec détails

                                Connexion / inscription d’utilisateur

                                Ajout / suppression de favoris (films et séries)

                                Consultation de la liste des favoris

- Technologies utilisées et version : HTML5, CSS3, JavaScript, PHP8, SQLite, OMDb API
- Arborescence du projet :
  SeriMax/
  ├── index.php
  ├── script.js
  ├── style.css
  ├── register.php
  ├── login.php
  ├── logout.php
  ├── mes_favoris.php
  ├── toggle_favori.php
  ├── Database/
  │ └── bdd.db
  ├── Image/
  │ └── Vrai logo Serimax.png
  ├── README.md
  └── .env

Installation

- Prérequis : que faut-il installer ? Que faut-il générer ? PHP, Serveur local : php -S 127.0.0.1:8080, Une clé API OMDb
- Instructions pour lancer le projet en local : utiliser la commande : php -S localhost:8080 pour lancer le serveur et aller sur le navigateur web et mettre http://localhost:8080/index.php
- Instructions pour faire le .env :
  Base de données
- Schéma de la base de données
  Flux de données
- Exemple d’un appel à OMDB (via PHP)
$imdbId = $_POST['imdb_id'] ?? '';
$titre = $_POST['titre'] ?? '';
$annee = $_POST['annee'] ?? '';
$type = $_POST['type'] ?? '';
$affiche = $_POST['affiche'] ?? '';

fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=47fd8d36&i`)

- Exemple d’un appel avec la base de données (via PHP)
  $stmt = $db->prepare("SELECT id FROM Oeuvre WHERE imdb_id = ?");
$stmt->execute([$imdbId]);
  $oeuvre = (int) $stmt->fetch(PDO::FETCH_COLUMN);

if (!$oeuvre) {
    $ins = $db->prepare("INSERT INTO Oeuvre (imdb_id, titre, annee, type, affiche) VALUES (?,?,?,?,?)");
    $ins->execute([$imdbId, $titre, $annee, $type, $affiche]);
$oeuvre = (int) $db->lastInsertId();
}
$stmt = $db->prepare("SELECT 1 FROM Favori WHERE utilisateur_id=? AND oeuvre_id=?");
$stmt->execute([$userId, $oeuvre]);
$estFavori = (bool) $stmt->fetchColumn();

if ($estFavori) {
    $db->prepare("DELETE FROM Favori WHERE utilisateur_id=? AND oeuvre_id=?")
        ->execute([$userId, $oeuvre]);
} else {
    $db->prepare("INSERT INTO Favori(utilisateur_id, oeuvre_id) VALUES (?, ?)")
        ->execute([$userId, $oeuvre]);
}

5 / 7
B1 CSI : Maintenance corrective et évolutive 2024-2025
Évolutivité

- Ce qui pourrait être amélioré / ajouté dans votre solution
