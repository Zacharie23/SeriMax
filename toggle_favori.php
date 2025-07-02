<?php
session_start();
header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'Vous devez être connecté']);
    exit;
}

$userId = $_SESSION['user_id'];
$imdbId = $_POST['imdb_id'] ?? '';
$titre = $_POST['titre'] ?? '';
$annee = $_POST['annee'] ?? '';
$type = $_POST['type'] ?? '';
$affiche = $_POST['affiche'] ?? '';

if (!$imdbId || !$titre) {
    echo json_encode(['success' => false, 'message' => 'Données incomplètes']);
    exit;
}

require 'database.php';      // $db

/* 1. Insère l’œuvre si absente */
$stmt = $db->prepare("SELECT id FROM Oeuvre WHERE imdb_id = ?");
$stmt->execute([$imdbId]);
$oeuvre = (int)$stmt->fetch(PDO::FETCH_COLUMN);

if (!$oeuvre) {
    $ins = $db->prepare("
        INSERT INTO Oeuvre (imdb_id,titre,annee,type,affiche)
        VALUES (?,?,?,?,?)");
    $ins->execute([$imdbId, $titre, $annee, $type, $affiche]);
    $oeuvre = (int)$db->lastInsertId();
}

/* 2. Ajoute ou retire des favoris */
$stmt = $db->prepare("SELECT 1 FROM Favori WHERE utilisateur_id=? AND oeuvre_id=?");
$stmt->execute([$userId, $oeuvre]);
$estFavori = (bool) $stmt->fetchColumn();

if ($estFavori) {
    $db->prepare("DELETE FROM Favori WHERE utilisateur_id=? AND oeuvre_id=?")
        ->execute([$userId, $oeuvre]);
    echo json_encode(['success' => true, 'action' => 'supprimé', 'message' => 'Retiré des favoris']);
    exit;
} else {
    $db->prepare("INSERT INTO Favori(utilisateur_id,oeuvre_id) VALUES (?,?)")
        ->execute([$userId, $oeuvre]);
    echo json_encode(['success' => true, 'action' => 'ajouté', 'message' => 'Ajouté aux favoris']);
    exit;
}
?>