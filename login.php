<?php
// login.php
require 'database.php'; // Connexion à la BDD
session_start(); // méthode pour les sessions

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $username = trim($_POST['username'] ?? ''); // récupérer l’username
    $password = $_POST['password'] ?? '';        // récupérer le mdp

    if (!empty($username) && !empty($password)) {
        // préparer la requête
        $stmt = $db->prepare("SELECT * FROM Utilisateur WHERE identifiant = ?");
        $stmt->execute([$username]); // exécuter
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && password_verify($password, $user['mot_de_passe'])) {
            // stocker le $user['id']
            $_SESSION['user_id'] = $user['id'];
            // stocker le $user['username']
            $_SESSION['username'] = $user['identifiant'];
            // Redirection vers accueil
            header('Location: index.php');
            exit();
        } else {
            $error = "Erreur identifiant / mot de passe";
        }
    } else {
        $error = "Tous les champs sont requis";
    }
}
?>

<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <title>Connexion - SeriMax</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <header>
        <img src="Image/Vrai logo Serimax.png" alt="logo-SeriMax" />
        <h1>Connexion à SeriMax</h1>
    </header>

    <main>
        <?php if (!empty($error))
            echo "<p style='color:red;'>$error</p>"; ?>

        <form method="POST" action="login.php">
            <label for="username">Nom d'utilisateur</label>
            <input type="text" id="username" name="username" required>

            <label for="password">Mot de passe</label>
            <input type="password" id="password" name="password" required>

            <button type="submit">Se connecter</button>
        </form>

        <p>Pas encore de compte ? <a href="register.php">Inscrivez-vous</a></p>
    </main>
</body>

</html>