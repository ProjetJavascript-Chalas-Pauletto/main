<?php



function getConnection()
{
    //Our MySQL user account.
    define('MYSQL_USER', '153880');
//Our MySQL password.
    define('MYSQL_PASSWORD', '1234');
//The server that MySQL is located on.
    define('MYSQL_HOST', 'mysql-enhanced-rpg.alwaysdata.net');
//The name of our database.
    define('MYSQL_DATABASE', 'enhanced-rpg_bd');
    /**
     * PDO options / configuration details.
     * I'm going to set the error mode to "Exceptions".
     * I'm also going to turn off emulated prepared statements.
     */
    $pdoOptions = array(
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_EMULATE_PREPARES => false
    );
    /**
     * Connect to MySQL and instantiate the PDO object.
     */
    try {
        $pdo = new PDO(
            "mysql:host=" . MYSQL_HOST . ";dbname=" . MYSQL_DATABASE, //DSN
            MYSQL_USER, //Username
            MYSQL_PASSWORD, //Password
            $pdoOptions //Options
        );
        $pdo->exec('SET CHARACTER SET utf8');
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $pdo;
    } catch (PDOException $e) {
// Affichage de l'erreur.
        die('Erreur : ' . $e->getMessage());
    }
}
?>