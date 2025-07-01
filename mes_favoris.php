<?php
session_start();
if (!isset($_SESSION['user_id'])) {
    header('Location: login.php');
    exit;
}

$db = new SQLite3('database.sqlite');
$user_id = $_SESSION['user_id'];
$stmt = $db->prepare("SELECT * FROM favoris WHERE user_id = ?");
$stmt->bindValue(1, $user_id);
$result = $stmt->execute();
?>

<h2>Mes Favoris</h2>
<div class="favoris-container">
    <?php while ($row = $result->fetchArray()): ?>
        <div class="favori">
            <img src="<?= $row['poster'] ?>" alt="<?= $row['title'] ?>" width="150">
            <p><?= $row['title'] ?> (<?= $row['year'] ?>)</p>
        </div>
    <?php endwhile; ?>
</div>