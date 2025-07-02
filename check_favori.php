<?php
session_start();
header('Content-Type: application/json');

if (!isset($_GET['imdb_id'])) {
    echo json_encode(['estFavori'=>false]);
    exit;
}

require 'database.php';
$imdbId = $_GET['imdb_id'];
$userId = $_SESSION['user_id'] ?? 0;

$stmt = $db->prepare("
 SELECT 1
 FROM Favori F
 JOIN Oeuvre O ON F.oeuvre_id = O.id
 WHERE F.utilisateur_id = ? AND O.imdb_id = ?
");
$stmt->execute([$userId,$imdbId]);
echo json_encode(['estFavori'=>(bool)$stmt->fetchColumn()]);
?>