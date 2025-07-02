<?php
session_start();
header('Content-Type: application/json');

if (!isset($_SESSION['utilisateur_id'])) {
    echo json_encode(['success' => false, 'message' => 'Vous devez être connecté pour retirer un favori.']);
    exit;
}

if (!isset($_POST['oeuvre_id'])) {
    echo json_encode(['success' => false, 'message' => "ID de l'œuvre manquant."]);
    exit;
}

$utilisateur_id = $_SESSION['utilisateur_id'];
$oeuvre_id = $_POST['oeuvre_id'];

try {
    $db = new PDO('sqlite:database.sqlite');
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Supprimer le favori
    $delete = $db->prepare("DELETE FROM Favori WHERE utilisateur_id = ? AND oeuvre_id = ?");
    $success = $delete->execute([$utilisateur_id, $oeuvre_id]);

    echo json_encode(['success' => $success]);

} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Erreur base de données : ' . $e->getMessage()]);
}
