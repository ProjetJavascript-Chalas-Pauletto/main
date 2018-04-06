<?php
session_start();

require('../model/login-check.php');

$stmt = new stdClass();
$stmt->result = true; // How is it going ?
$stmt->message = ""; // Error displaying
$stmt->easterEgg = false;

// Récupération des données nécessaires à la connexion
$username = $_POST['username'];
$password = $_POST['password'];

if (isset($username) && $username != "" && isset($password) && $password != "") {

    if(strtolower($username) == "samuel"){
        $stmt->easterEgg = true;

    }else{

        $result = getUserData($username);

        if($result->rowCount() != 0) { //Si un compte correspond à l'adresse.
            $row = $result->fetch(); //Gestion d'erreur ?
            $username = $row['USERNAME'];
            $id = $row['ID'];
            //$avatar = $row['AVATAR'];

            if (md5($password) == $row['PASSWORD']) {
                // Mot de passe correct
                // Vérification du champ 'actif' de la BDD
                // Récupération de la valeur du champ actif pour le compte associé
                $result = getActiveAcount($username);

                $row = $result->fetch();
                $active = $row['ACTIVE']; // 0 si non activé ou 1 si active

                // Il ne nous reste plus qu'à tester la valeur du champ 'active' pour
                // autoriser ou non le membre à se connecter
                if ($active == '1') // Si $active est égal à 1, on autorise la connexion
                {
                    session_start();
                    $_SESSION['id'] = $id;
                    $_SESSION['username'] = $username;
                    //$_SESSION['avatar'] = $avatar;

                    $stmt->message = 'User now connected : ' . $username;

                } else // Sinon la connexion est refusé...
                {
                    $stmt->message = 'Account not activated ' . $username;
                    $stmt->result = false;
                    //on previent que ce compte n'est pas activé
                }
            }
            else{ //Mot de passe incorrect
                $stmt->message = 'Mot de passe incorrect';
                $stmt->result = false;
            }
        }
        else{ //Aucun compte associé à l'adresse.
            $stmt->message = 'Aucun compte associé';
            $stmt->result = false;
        }

    }

} else
{
    $stmt->message = "Erreur de données.";
    $stmt->result = false;
}

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');

echo json_encode($stmt);