<?php
session_start();
require 'database.php';
header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['estFavori' => false]);
    exit;
}

$userId = $_SESSION['user_id'];
$imdbId = $_GET['imdb_id'] ?? '';

if (!$imdbId) {
    echo json_encode(['estFavori' => false]);
    exit;
}

// Trouver l’œuvre par imdb_id
$stmt = $db->prepare("SELECT id FROM Oeuvre WHERE imdb_id = ?");
$stmt->execute([$imdbId]);
$oeuvre = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$oeuvre) {
    echo json_encode(['estFavori' => false]);
    exit;
}

// Vérifie dans Favori
$stmt = $db->prepare("SELECT 1 FROM Favori WHERE utilisateur_id = ? AND oeuvre_id = ?");
$stmt->execute([$userId, $oeuvre['id']]);
$estFavori = (bool) $stmt->fetchColumn();

echo json_encode(['estFavori' => $estFavori]);
