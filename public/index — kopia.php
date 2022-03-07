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
//Zwraca wyszukane produkty w formie json.
$app->get('/zapas/{id}', function (Request $request, Response $response){
    
    $id = $request->getAttribute('id'); //wysukiwany produkt
    //Połączenie do bazy danych 
    $ile_znakow = strlen($id);
    $dbConnection = Polacz_z_baza();
    $sql ="SELECT kreskowe.zapis AS IDENTYFIKATOR, kreskowe.Kod AS KOD, jednostki.Kod AS JEDNOSTKA, kreskowe.TypKodu AS TYPK, kreskowe.PodTypKodu AS PTYPK, towary.Kod AS ZAPAS, towary.Nazwa AS NAZWA, towary.CenaZakupuKartotekowaValue AS CENAZ, towary.CenaZakupuKartotekowaSymbol AS CENAJ FROM kreskowe, jednostki, towary WHERE  kreskowe.KodJednostki=jednostki.ID AND kreskowe.Zapis=towary.ID AND kreskowe.Kod LIKE '%$id%' LIMIT 25";
    //Próba wyszukania produktu w bazie
    try{
        $fechAll =[];
        $stmt = $dbConnection->query($sql);
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC))
        {
            $identyfikator = $row['IDENTYFIKATOR'];
            $kod = $row['KOD'];
            $jednostka = $row['JEDNOSTKA'];
            $typk = $row['TYPK'];
            $ptypk = $row['PTYPK'];
            $zapas = $row['ZAPAS'];
            $nazwa = $row['NAZWA'];
            $cenaz = $row['CENAZ'];
            $cenaj = $row['CENAJ'];
            //Jeżeli kod kreskowy istnieje należy go wyszukać
            if ($kod === $zapas){
                $sql = "SELECT Kod FROM kreskowe WHERE Zapis = $identyfikator AND PodTypKodu =1";
                $kod_kr = $dbConnection->query($sql);
                while ($kod_kreskowy = $kod_kr->fetch())
                {
                    if ($kod_kreskowy == ''){
                        $kod='BRAK';
                    }else{
                        $kod = $kod_kreskowy['Kod'];
                    };

            
                };
            };
            $fechAll[]= array('KOD'=>$kod,'JEDNOSTKA'=>$jednostka,'TYPK'=>$typk,'PTYPK'=>$ptypk,'ZAPAS'=>$zapas,'NAZWA'=>$nazwa,'CENAZ'=>$cenaz,'CENAJ'=>$cenaj);
        };
        $NewResponse = $response->withJson($fechAll, 200);
        return $NewResponse;
        //echo (json_encode($fechAll));
    } catch(PDOException $e){
        //$NewResponse = $response->withJson('{"error": {"text": '.$e->getMessage().'}', 200);
        //return $NewResponse;
        echo '{"error": {"text": '.$e->getMessage().'}';
    }
    Rozlacz_z_baza($stmt);
});
//Zwraca wyszukane produkty w formie json.
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
// Zamyka arkusz o podanym ID_Arkusza
$app->post('/arkusz/close', function (Request $request, Response $response){
    $id_arkusza = $request->getParam('ID_Arkusza');
    $odpowiedz = Zamknij_Arkusz($id_arkusza);
    return $odpowiedz;
});
// Dodaje pozycje do tabeli spis z podanym ID_Arkusza
$app->post('/spis/add', function (Request $request, Response $response){
    $id_www = $request->getParam('ID_WWW');
    $kod = $request->getParam('Kod');
    $ilosc = $request->getParam('Ilosc');
    $id_arkusza = $request->getParam('ID_Arkusza');
    $ean = $request->getParam('EAN');
    Dodaj_pozycje($id_www,$kod,$ilosc,$id_arkusza,$ean);
    //echo "Nie wiadomo o co chodzi";
});

$app->run();



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

function Utworz_Arkusz ($Param1,$Param2,$Param3,$Param4){
    //Przypisanie zmiennym parametrów przekazanych do funkcji
    $fingerp = $Param4;
    $wyr = $Param3;
    $magazyn = $Param2;
    $login = $Param1;
    $czy_istnieje = Czy_Istnieje($login,$magazyn,$wyr,$fingerp);
    if ($czy_istnieje == 0){
            //Istnieje
            $zwrotka [] = null;
            $zwrotka = Pobierz_ID_Arkusza($login,$magazyn,$wyr,$fingerp);
            $zwrotka["IS_EXIST"] = "1";
        //print_r($zwrotka);
        return json_encode($zwrotka);

            //return 0;

    }else {
        //nie istnieje
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
        return json_encode($zwrotka);
    };

};
function Zamknij_Arkusz($Param1)
{//Przypisanie zmiennym parametrów przekazanych do funkcji
    $id_ark = $Param1;
    //Połączenie z mySQL
    $dbh1 = Polacz_z_baza();
    //Zapytanie sprawdzające istnienie rekordu
    $sql = "UPDATE `arkusz` SET Otwarty = 0 WHERE ID_Arkusza = :ID_ARK";
    //Przygotowanie zapytania
    $stmt = $dbh1->prepare($sql); 
    //Wypełnienie zapytania zmiennymi przekazanymi do funkcji
    $stmt->bindValue(':ID_ARK', $id_ark);
    //Wykonanie zapytania
    try{ 
        $stmt->execute(); 
    } 
    catch(PDOException $exception){ 
        Print_r ($exception); //Wyswietlam natychmiast błąd
        return 0;
        //return $exception; 
    } ;
    return 1;

};
function Pobierz_FP_Arkusza($Param1,$Param2,$Param3)
{   //Przypisanie zmiennym parametrów przekazanych do funkcji
    $wyr = $Param3;
    $magazyn = $Param2;
    $login = $Param1;
    //Połączenie z mySQL
    $dbh1 = Polacz_z_baza();
    //Zapytanie sprawdzające istnienie rekordu
    $sql = "SELECT Tag  FROM `arkusz` WHERE Login = :LOGIN AND Magazyn = :MAGAZYN AND Wyr = :WYR";
    //Przygotowanie zapytania
    $stmt = $dbh1->prepare($sql);
    //Wypełnienie zapytania zmiennymi przekazanymi do funkcji
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
function Dodaj_pozycje($Param1,$Param2,$Param3,$Param4,$Param5)
{//Przypisanie zmiennym parametrów przekazanych do funkcji
    $id_www = $Param1;
    $kod = $Param2;
    $ilosc = $Param3;
    $id_ark = $Param4;
    $ean = $Param5;
    //Połączenie z mySQL
    $dbh1 = Polacz_z_baza();
    //Zapytanie sprawdzające istnienie rekordu
    $sql = "INSERT INTO `spis` (ID_WWW,Kod,Ilosc,ID_Arkusza,EAN) VALUES (:id_www,:kod,:ilosc,:id_arkusza,:ean)";

    try{
        //Przygotowanie zapytania
        $stmt = $dbh1->prepare($sql); 
        $stmt->bindParam(':id_www',$id_www);
        $stmt->bindParam(':kod',$kod);
        $stmt->bindParam(':ilosc',$ilosc);
        $stmt->bindParam(':id_arkusza',$id_ark);
        $stmt->bindParam(':ean',$ean);
        $stmt->execute();
        //$row = $stmt->fetch(PDO::FETCH_ASSOC);
        //echo '{"Nota": {"text": "Dodano pozycję spisu"}';

    } catch(PDOException $e){
        echo '{"BŁĄD": {"text": '.$e->getMessage().'}';
    }



    // //Przygotowanie zapytania
    // $stmt = $dbh1->prepare($sql); 
    // //Wypełnienie zapytania zmiennymi przekazanymi do funkcji
    // $stmt->bindValue(':ID_ARK', $id_ark);
    // //Wykonanie zapytania
    // try{ 
    //     $stmt->execute(); 
    // } 
    // catch(PDOException $exception){ 
    //     Print_r ($exception); //Wyswietlam natychmiast błąd
    //     return 0;
    //     //return $exception; 
    // } ;
    // return 1;

};
?>
