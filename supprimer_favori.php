<?php
session_start();

if (!isset($_SESSION['utilisateur_id'])) {
    echo "Vous devez être connecté pour retirer un favori.";
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

    // Trouver l'ID de l'œuvre correspondante
    $stmt = $db->prepare("SELECT id FROM Oeuvre WHERE imdb_id = ?");
    $stmt->execute([$imdbID]);
    $oeuvre = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$oeuvre) {
        echo "Œuvre introuvable dans la base.";
        exit;
    }

    $oeuvre_id = $oeuvre['id'];

    // Supprimer le favori
    $delete = $db->prepare("DELETE FROM Favori WHERE utilisateur_id = ? AND oeuvre_id = ?");
    $delete->execute([$utilisateur_id, $oeuvre_id]);

    echo "Œuvre retirée des favoris avec succès.";

} catch (PDOException $e) {
    echo "Erreur base de données : " . $e->getMessage();
}
