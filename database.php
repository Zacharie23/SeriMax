<?php
try {
    $db = new PDO('sqlite:C:\Users\Chamard\Documents\Projet\SeriMax\SeriMax\Database\NewScript.db');
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Erreur de connexion : " . $e->getMessage();
    exit;
}
