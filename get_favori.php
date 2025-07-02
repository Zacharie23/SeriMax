<?php
session_start();
header('Content-Type: application/json');

// Si non connecté, renvoyer tableau vide
if (!isset($_SESSION['user_id'])) {
    echo json_encode([]);
    exit;
}

require 'database.php'; // adapter le chemin et connexion à ta BDD

$userId = $_SESSION['user_id'];

$stmt = $db->prepare("
  SELECT O.id AS oeuvre_id, O.imdb_id, O.titre, O.annee, O.type
  FROM Favori F
  JOIN Oeuvre O ON F.oeuvre_id = O.id
  WHERE F.utilisateur_id = ?
");
$stmt->execute([$userId]);
$favoris = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($favoris);
?>
