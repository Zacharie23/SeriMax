<?php
require 'database.php';  // Connexion PDO à ta base

/*
// a décommenter pour tester la création d'un utilisateur au
// chargement de la page, la requête est à adapter selon votre base
try {
    $stmt = $db->prepare("INSERT INTO Utilisateur (identifiant, email, mot_de_passe) VALUES (?, ?, ?)");
    $success = $stmt->execute(['testuser', 'test@example.com', password_hash('testpass', PASSWORD_DEFAULT)]);
    if ($success) {
        echo "Utilisateur ajouté avec succès (test statique).";
    } else {
        echo "Échec de l'insertion test.";
    }
} catch (PDOException $e) {
    echo "Erreur PDO (test) : " . $e->getMessage();
}
*/

if ($_SERVER["REQUEST_METHOD"] === "POST") {
  // Récupère les données du formulaire et enlève les espaces inutiles
  $identifiant = trim($_POST['username'] ?? '');
  $email = trim($_POST['email'] ?? '');
  $password = $_POST['password'] ?? '';

  // Vérifie que tous les champs sont remplis
  if (!empty($identifiant) && !empty($email) && !empty($password)) {
    // Hache le mot de passe de façon sécurisée
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    try {
      // Prépare la requête d'insertion avec des placeholders et bons noms de colonnes
      $stmt = $db->prepare("INSERT INTO Utilisateur (identifiant, email, mot_de_passe) VALUES (?, ?, ?)");

      // Execute la requête avec les données du formulaire
      $success = $stmt->execute([$identifiant, $email, $hashedPassword]);

      if ($success) {
        echo "Utilisateur inscrit avec succès.";
      } else {
        $errorInfo = $stmt->errorInfo();
        echo "Erreur lors de l'inscription : " . implode(" | ", $errorInfo);
      }
    } catch (PDOException $e) {
      echo "Erreur PDO : " . $e->getMessage();
    }
  } else {
    echo "Tous les champs sont requis.";
  }
}
?>

<!DOCTYPE html>
<html lang="fr">

<head>
  <meta charset="UTF-8">
  <title>Inscription - SeriMax</title>
  <link rel="stylesheet" href="style.css">
</head>

<body>
  <header>
    <img src="Image/Vrai logo Serimax.png" alt="logo-SeriMax" />
    <h1>Créer un compte SeriMax</h1>
  </header>

  <main>
    <form class="formulaire-inscription" method="POST" action="register.php">
      <label for="username">Nom d'utilisateur</label>
      <input type="text" id="username" name="username" required>

      <label for="email">Adresse email</label>
      <input type="email" id="email" name="email" required>

      <label for="password">Mot de passe</label>
      <input type="password" id="password" name="password" required>

      <button type="submit">S'inscrire</button>
    </form>
  </main>

  <footer>
    Déjà inscrit ? <a href="login.php">Connexion</a>
  </footer>
</body>

</html>