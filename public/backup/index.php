<?php
header("Access-Control-Allow-Origin: *");
header ("Content-Type: application/json");
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require '../vendor/autoload.php';

$app = new \Slim\App;

// $app->options('/{routes:.+}', function ($request, $response, $args) {
//     return $response;
// });

// $app->add(function ($req, $res, $next) {
//     $response = $next($req, $res);
//     return $response
//             ->withHeader('Access-Control-Allow-Origin', 'http://axios2.test:81')
//             ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
//             ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
// });



$app->get('/test/{name}', function (Request $request, Response $response, array $args) {
    $name = $args['name'];
    $response->getBody()->write("Hello, $name");

    return $response;
});
//Tworzy wpis w tabeli Arkusz oraz zwraca ID_Arkusza
$app->post('/arkusz/open', function (Request $request, Response $response){
            $login = $request->getParam('Login');
            $magazyn = $request->getParam('Magazyn');
            $wyr = $request->getParam('Wyr');
            $fingerp = $request->getParam('FingerP');

            $odpowiedz = Utworz_Arkusz($login,$magazyn,$wyr,$fingerp);

            $NewResponse = $response->withJson($odpowiedz, 200);
    return $NewResponse;
    //return $odpowiedz;
});

$app->run();

function Utworz_Arkusz ($Param1,$Param2,$Param3,$Param4){
    //Przypisanie zmiennym parametrów przekazanych do funkcji
    $fingerp = $Param4;
    $wyr = $Param3;
    $magazyn = $Param2;
    $login = $Param1;
    $czy_istnieje = Czy_Istnieje($login,$magazyn,$wyr,$fingerp); // Sprawdzenie czy rekord już istnieje
    if ($czy_istnieje == 0){
            //Istnieje
            $zwrotka [] = null;
            $zwrotka = Pobierz_ID_Arkusza($login,$magazyn,$wyr,$fingerp);
            $zwrotka["IS_EXIST"] = "1";
        //print_r($zwrotka);
        return json_encode($zwrotka);  // Zwracamy zatem ID_Arkusz oraz informację że istnieje

            //return 0;

    }else {
        //nie istnieje więc tworzymy rekord 
        //Połączenie z mySQL
        $dbh1 = Polacz_z_baza();
        //Zapytanie dopisujące dane nowego arkusza
        $sql = "INSERT INTO `arkusz` (Login,Magazyn,Wyr,Tag) VALUES (:LOGIN,:MAGAZYN,:WYR,:FINGERP)";
        //Przygotowanie zapytania
        $stmt = $dbh1->prepare($sql); 
        //Wypełnienie zapytania zmiennymi przekazanymi do funkcji
        $stmt->bindValue(':FINGERP', $fingerp);
        $stmt->bindValue(':WYR', $wyr);
        $stmt->bindValue(':MAGAZYN', $magazyn);
        $stmt->bindValue(':LOGIN', $login);
        //Wykonanie zapytania
        try{ 
            $stmt->execute(); 
        } 
        catch(PDOException $exception){ 
            Print_r ($exception); //Wyswietlam natychmiast błąd
            //return $exception; 
        };
        $zwrotka [] = null;
        $zwrotka = Pobierz_ID_Arkusza($login,$magazyn,$wyr,$fingerp);
        $zwrotka["IS_EXIST"] = "0";
        return json_encode($zwrotka);  // Zwracamy ID_Arkusz oraz informacje że właśnie go utorzyliśmy
    };

};
function Czy_Istnieje ($Param1,$Param2,$Param3,$Param4)
{   //Przypisanie zmiennym parametrów przekazanych do funkcji
    $fingerp = $Param4;
    $wyr = $Param3;
    $magazyn = $Param2;
    $login = $Param1;
    //Połączenie z mySQL
    $dbh1 = Polacz_z_baza();
    //Zapytanie sprawdzające istnienie rekordu
    $sql = "SELECT COUNT(*) AS num FROM `arkusz` WHERE Wyr = :WYR AND Magazyn = :MAGAZYN AND Login = :LOGIN AND Tag = :FINGERP";
    //Przygotowanie zapytania
    $stmt = $dbh1->prepare($sql);
    //Wypełnienie zapytania zmiennymi przekazanymi do funkcji
    $stmt->bindValue(':FINGERP', $fingerp);
    $stmt->bindValue(':WYR', $wyr);
    $stmt->bindValue(':MAGAZYN', $magazyn);
    $stmt->bindValue(':LOGIN', $login);
    //Wykonanie zapytania
        try{ 
            $stmt->execute(); 
            } 
            catch(PDOException $exception){ 
                Print_r ($exception); //Wyswietlam natychmiast błąd
                //return $exception; 
        };
    //Wyniki zapytania zwrócone do zmiennej $row
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    //Jeśli rekord istnieje funkcja zwróci 0, jeśli nie istnieje zwróci 1
        if($row['num'] > 0){
            //echo 'Row exists!';
            return 0; //istnieje
            } else{
                //echo 'Row does not exist!';
                return 1; //nie istnieje
        }

};
function Pobierz_ID_Arkusza($Param1,$Param2,$Param3,$Param4)
{   //Przypisanie zmiennym parametrów przekazanych do funkcji
    $fingerp = $Param4;
    $wyr = $Param3;
    $magazyn = $Param2;
    $login = $Param1;
    //Połączenie z mySQL
    $dbh1 = Polacz_z_baza();
    //Zapytanie sprawdzające istnienie rekordu
    $sql = "SELECT ID_Arkusza  FROM `arkusz` WHERE Login = :LOGIN AND Magazyn = :MAGAZYN AND Wyr = :WYR AND Tag = :FINGERP";
    //Przygotowanie zapytania
    $stmt = $dbh1->prepare($sql);
    //Wypełnienie zapytania zmiennymi przekazanymi do funkcji
    $stmt->bindValue(':FINGERP', $fingerp);
    $stmt->bindValue(':WYR', $wyr);
    $stmt->bindValue(':MAGAZYN', $magazyn);
    $stmt->bindValue(':LOGIN', $login);
    //Wykonanie zapytania
    try{ 
        $stmt->execute(); 
        //Wyniki zapytania zwrócone do zmiennej $row 
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        //echo ('Jacek');
        return $row;
        //return (json_encode($row));
        //var_dump ($row);
    } 
    catch(PDOException $exception){ 
        Print_r ($exception); //Wyswietlam natychmiast błąd
        //return $exception; 
    };

};
//Funkcja zapewniająca połączenie z MySQL
function Polacz_z_baza ()
{
    //Parametry połączenia do bazy danych
    $dbhost = 'localhost';
    $dbuser = 'root';
    $dbpass = '';
    $dbname = 'artykuly';
    $mysql_connect_str = "mysql:host=$dbhost;dbname=$dbname";
    $dbh = new PDO($mysql_connect_str,$dbuser,$dbpass, array (PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES UTF8"));
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); 
    return $dbh;
};

Function Rozlacz_z_baza ($Param){
    $Param = null;
};


