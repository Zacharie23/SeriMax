<?php
session_start();
require_once 'database.php';

if (!isset($_SESSION['user_id'])) {
    // Rediriger vers connexion ou afficher un message
    header('Location: login.php');
    exit;
}

$user_id = $_SESSION['user_id'];

try {
    $stmt = $pdo->prepare("
        SELECT media_id 
        FROM favoris 
        WHERE user_id = ?
    ");
    $stmt->execute([$user_id]);
    $favoris = $stmt->fetchAll(PDO::FETCH_COLUMN);

} catch (Exception $e) {
    die("Erreur lors de la récupération des favoris");
}
?>

<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8" />
    <title>Mes Favoris</title>
</head>

<body>
    <h1>Mes Favoris</h1>
    <?php if (!empty($favoris)): ?>
        <ul>
            <?php foreach ($favoris as $media_id): ?>
                <?php
                $json = file_get_contents("https://www.omdbapi.com/?apikey=47fd8d36&i=" . urlencode($media_id));
                $data = json_decode($json, true);
                $titre = $data['Title'] ?? 'Titre inconnu';
                $poster = $data['Poster'] ?? '';
                ?>
                <li>
                    <strong><?= htmlspecialchars($titre) ?></strong>
                    (<?= htmlspecialchars($media_id) ?>)
                    <?php if ($poster && $poster != 'N/A'): ?>
                        <br><img src="<?= htmlspecialchars($poster) ?>" alt="Affiche" style="height:100px;">
                    <?php endif; ?>
                </li>
            <?php endforeach; ?>
        </ul>
    <?php else: ?>
        <p>Vous n'avez pas encore de favoris.</p>
    <?php endif; ?>

</body>

</html>