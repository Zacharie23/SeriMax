<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>SeriMax</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <header>
      <?php
      echo "Aujourd'hui, nous sommes le " . date ('d/m/Y') . "."
      ?>
      <img src="Image/Vrai logo Serimax.png" alt="logo-SeriMax-1024x329" />
      <nav>
        <ul>
          <li><a href="#" id="Accueil">Accueil</a></li>
          <li><a href="#" id="Series">Series</a></li>
          <li><a href="#" id="Films">Films</a></li>
          <li><a href="#" id="Mon Compte">Mon Compte</a></li>
        </ul>
      </nav>
      <div class="rech">
        <input
          type="text"
          id="recherche"
          placeholder="Rechercher des films,series..."
        />
      </div>
      <h1>
        Bienvenue sur SeriMax, ta nouvelle plateforme pour regarder toutes tes
        séries préférées
      </h1>
      <h2>Slogan</h2>
    </header>

    <main>
      <div id="filtres">
        <select id="filtreType">
          <option value="all">Tous</option>
          <option value="movie">Films</option>
          <option value="series">Séries</option>
        </select>

        <input
          type="number"
          id="filtreAnnee"
          placeholder="Année (ex: 2022)"
          min="1900"
          max="2099"
        />
      </div>

      <div id="catalogue"></div>
      <div id="pagination"></div>
      <div id="modal" class="modal"></div>
    </main>

    <footer>Notre application disponible sur appstore et playstore</footer>

    <script src="script.js"></script>
  </body>
</html>
