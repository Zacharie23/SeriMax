<?php
if (session_status() === PHP_SESSION_NONE) {
  session_start();
}

// Connexion à la base SQLite
try {
  $db = new PDO('sqlite:Database/bdd.db');
  $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (Exception $e) {
  die('Erreur de connexion : ' . $e->getMessage());
}

$utilisateur_id = $_SESSION['user_id'] ?? null;
$favoris = [];

if ($utilisateur_id) {
  $stmt = $db->prepare(
    "SELECT O.imdb_id 
       FROM Favori F 
       JOIN Oeuvre O ON F.oeuvre_id = O.id 
       WHERE F.utilisateur_id = ?"
  );
  $stmt->execute([$utilisateur_id]);
  $favoris = $stmt->fetchAll(PDO::FETCH_COLUMN);
}
?>
<!DOCTYPE html>
<html lang="fr">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>SeriMax</title>
  <link rel="stylesheet" href="style.css" />
  <script>
    const favorisUtilisateur = <?= json_encode($favoris, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_AMP | JSON_HEX_QUOT); ?>;
  </script>
</head>

<body>
  <header>
    <img src="Image/Vrai logo Serimax.png" alt="logo SeriMax" />

    <nav>
      <ul>
        <li><a href="#" id="Accueil">Accueil</a></li>
        <li><a href="#" id="Series">Séries</a></li>
        <li><a href="#" id="Films">Films</a></li>
        <li><a href="register.php" id="MonCompte">Mon Compte</a></li>
      </ul>

      <?php if ($utilisateur_id): ?>
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
      <input type="text" id="recherche" placeholder="Rechercher des films, séries..." />
    </div>

    <h1>Bienvenue sur SeriMax, ta nouvelle plateforme pour regarder toutes tes séries préférées</h1>
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

  <footer>Notre application disponible sur App Store et Play Store</footer>

  <script>
    const userIsLoggedIn = <?= $utilisateur_id ? 'true' : 'false'; ?>;
  </script>

  <script src="script.js"></script>

  <script>
    const favorisUtilisateur = <?php echo json_encode($favoris); ?> || [];
    const userIsLoggedIn = <?php echo json_encode($isLoggedIn); ?> || false;
  </script>

</body>

</html>