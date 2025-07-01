<?php
session_start();

if (!isset($_SESSION['utilisateur_id'])) {
    echo "Vous devez être connecté pour ajouter un favori.";
    exit;
}

if (!isset($_POST['imdbID'])) {
    echo "Identifiant IMDb manquant.";
    exit;
}

$utilisateur_id = $_SESSION['utilisateur_id'];
$imdbID = $_POST['imdbID'];

try {
    $db = new PDO('sqlite:database.sqlite');
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Chercher l'ID de l'œuvre correspondant à l'imdbID
    $stmt = $db->prepare("SELECT id FROM Oeuvre WHERE imdb_id = ?");
    $stmt->execute([$imdbID]);
    $oeuvre = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$oeuvre) {
        echo "Œuvre introuvable dans la base.";
        exit;
    }

    $oeuvre_id = $oeuvre['id'];

    // Vérifier si le favori existe déjà
    $verif = $db->prepare("SELECT COUNT(*) FROM Favori WHERE utilisateur_id = ? AND oeuvre_id = ?");
    $verif->execute([$utilisateur_id, $oeuvre_id]);

    if ($verif->fetchColumn() > 0) {
        echo "Cette œuvre est déjà dans vos favoris.";
    } else {
        // Ajouter le favori
        $insert = $db->prepare("INSERT INTO Favori (utilisateur_id, oeuvre_id) VALUES (?, ?)");
        $insert->execute([$utilisateur_id, $oeuvre_id]);

        echo "Œuvre ajoutée aux favoris avec succès.";
    }

} catch (PDOException $e) {
    echo "Erreur base de données : " . $e->getMessage();
}
