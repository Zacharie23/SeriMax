<?php
session_start();
require_once 'config-bdd.php'; // inclure la connexion PDO
header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'Vous devez être connecté']);
    exit;
}

$userId = $_SESSION['user_id'];
$imdbId = filter_input(INPUT_POST, 'imdb_id', FILTER_SANITIZE_STRING);
$titre = filter_input(INPUT_POST, 'titre', FILTER_SANITIZE_STRING);
$annee = filter_input(INPUT_POST, 'annee', FILTER_SANITIZE_NUMBER_INT);
$type = filter_input(INPUT_POST, 'type', FILTER_SANITIZE_STRING);
$affiche = filter_input(INPUT_POST, 'affiche', FILTER_SANITIZE_URL);

if (!$imdbId || !$titre || !$annee || !$type) {
    echo json_encode(['success' => false, 'message' => 'Données incomplètes']);
    exit;
}

// Vérifier si l'œuvre existe déjà (par imdb_id)
$stmt = $pdo->prepare("SELECT id FROM Oeuvre WHERE imdb_id = ?");
$stmt->execute([$imdbId]);
$oeuvre = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$oeuvre) {
    // Insérer l'œuvre
    $stmt = $pdo->prepare("INSERT INTO Oeuvre (imdb_id, titre, annee, type, affiche) VALUES (?, ?, ?, ?, ?)");
    $stmt->execute([$imdbId, $titre, $annee, $type, $affiche]);
    $oeuvreId = $pdo->lastInsertId();
} else {
    $oeuvreId = $oeuvre['id'];
}

// Vérifier si déjà favori
$stmt = $pdo->prepare("SELECT 1 FROM Favori WHERE utilisateur_id = ? AND oeuvre_id = ?");
$stmt->execute([$userId, $oeuvreId]);
$estFavori = $stmt->fetchColumn();

if ($estFavori) {
    // Supprimer des favoris
    $stmt = $pdo->prepare("DELETE FROM Favori WHERE utilisateur_id = ? AND oeuvre_id = ?");
    $stmt->execute([$userId, $oeuvreId]);
    echo json_encode(['success' => true, 'action' => 'supprimé', 'message' => 'Retiré des favoris']);
} else {
    // Ajouter aux favoris
    $stmt = $pdo->prepare("INSERT INTO Favori (utilisateur_id, oeuvre_id) VALUES (?, ?)");
    $stmt->execute([$userId, $oeuvreId]);
    echo json_encode(['success' => true, 'action' => 'ajouté', 'message' => 'Ajouté aux favoris']);
}
