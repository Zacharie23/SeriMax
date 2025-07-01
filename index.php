<?php
session_start();
require 'database.php';
?>

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
    <?php echo "Connexion réussie à la base de données."; ?>

    <img src="Image/Vrai logo Serimax.png" alt="logo-SeriMax-1024x329" />

    <nav>
      <ul>
        <li><a href="#" id="Accueil">Accueil</a></li>
        <li><a href="#" id="Series">Series</a></li>
        <li><a href="#" id="Films">Films</a></li>
        <li><a href="register.php" id="MonCompte">Mon Compte</a></li>
      </ul>

      <?php if (isset($_SESSION['user_id'])): ?>
        <div class="session-bar">
          <p>Connecté en tant que <strong><a
                href="mes_favoris.php"><?= htmlspecialchars($_SESSION['username']) ?></a></strong></p>
          <form method="POST" action="logout.php">
            <button type="submit" name="logout">Se déconnecter</button>
          </form>
        </div>
      <?php else: ?>
        <a href="login.php" class="session-bar">Se connecter</a>
      <?php endif; ?>
    </nav>

    <div class="rech">
      <input type="text" id="recherche" placeholder="Rechercher des films,series..." />
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

      <input type="number" id="filtreAnnee" placeholder="Année (ex: 2022)" min="1900" max="2099" />
    </div>

    <div id="catalogue"></div>
    <div id="pagination"></div>
    <div id="modal" class="modal"></div>
  </main>

  <footer>Notre application disponible sur appstore et playstore</footer>

  <script>
    const userIsLoggedIn = <?= isset($_SESSION['user_id']) ? 'true' : 'false' ?>;
  </script>


  <script src="script.js"></script>
</body>

</html>