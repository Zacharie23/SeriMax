<?php
session_start();
require_once 'database.php';

// Vérifier que l'utilisateur est connecté
if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Utilisateur non connecté']);
    exit;
}

$user_id = $_SESSION['user_id'];
// Récupérer l'id du film/série (exemple via POST)
$media_id = isset($_POST['media_id']) ? intval($_POST['media_id']) : 0;

if ($media_id <= 0) {
    http_response_code(400);
    echo json_encode(['error' => 'ID média invalide']);
    exit;
}

try {
    // Vérifier si le favori existe déjà
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM favoris WHERE user_id = ? AND media_id = ?");
    $stmt->execute([$user_id, $media_id]);
    $exists = $stmt->fetchColumn();

    if ($exists) {
        // Supprimer le favori
        $stmt = $pdo->prepare("DELETE FROM favoris WHERE user_id = ? AND media_id = ?");
        $stmt->execute([$user_id, $media_id]);
        $action = 'removed';
    } else {
        // Ajouter le favori
        $stmt = $pdo->prepare("INSERT INTO favoris (user_id, media_id) VALUES (?, ?)");
        $stmt->execute([$user_id, $media_id]);
        $action = 'added';
    }

    echo json_encode(['success' => true, 'action' => $action]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Erreur serveur']);
}
?>
