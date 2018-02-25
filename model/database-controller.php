<?php

function getDb() {
    try {
        //Connexion à la base de données.
        $dsn = 'mysql:host=mysql-enhanced-rpg.alwaysdata.net;dbname=enhanced-rpg_bd';
        $db = new PDO($dsn, '153880', '1234');
        // Codage de caractères.
        $db->exec('SET CHARACTER SET utf8');
        // Gestion des erreurs sous forme d'exceptions.
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        return $db;
    }
    catch(Exception $e)
    {
        //Affichage de l'erreur
        die('Erreur : '.$e->getMessage());
    }
}