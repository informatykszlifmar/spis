<?php

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
function getDB(){
    
    $dbConnection = Polacz_z_baza();
    $sql ="SELECT Kod,Ilosc,ID_Arkusza,Stamp FROM spis";
    $fp = fopen('INV.csv', 'w');
    if ($fp === false) {
        echo 'Błąd'; // Wyświetla "Błąd" kiedy nie odnajdzie pliku
       } else { 
    //Próba wyszukania produktu w bazie
    try{
        fwrite($fp,"Towar:Kod;Ilosc;NumerArkusza;NumerWArkuszu".PHP_EOL);
        $stmt = $dbConnection->query($sql);
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC))
        {
            $kod = $row['Kod'];
            $ilosc = $row['Ilosc'];
            $nrark = $row['ID_Arkusza'];
            $time = $row['Stamp'];
            $timestamp = strtotime($time);
            $tekst = $kod.";".$ilosc.";".$nrark.";".$timestamp.";".PHP_EOL;
            fwrite($fp,$tekst);
        };
        fclose($fp);
        //print_r ($fechAll);
        //return $NewResponse;
        //echo (json_encode($fechAll));
    } catch(PDOException $e){
        //$NewResponse = $response->withJson('{"error": {"text": '.$e->getMessage().'}', 200);
        //return $NewResponse;
        echo '{"error": {"text": '.$e->getMessage().'}';
    }
    }
    Rozlacz_z_baza($stmt);
};

// $fp = fopen('INV.sql', 'r');
// $fp2 = fopen('INV-2.sql', 'w');
// if ($fp === false) {
//         echo 'Błąd'; // Wyświetla "Błąd" kiedy nie odnajdzie pliku
// } else {
//         fseek ($fp,202);
//         while (!feof($fp)) {
//         $tekst = fgets($fp);
//         $tekst1 = str_replace("(","('", $tekst);
//         $tekst1A = substr($tekst1,0,9);
//         $tekst2 = substr($tekst1,9);
//         $tekst3 = $tekst1A."'".$tekst2;
//         //echo $tekst."<br>".$tekst3."<br><br>";
//         fwrite($fp2,$tekst3);
//         }
// fclose($fp);
// fclose($fp2);
// }
getDB();
echo "Zakończyłem <br>";
echo '<a href="INV.csv">Pobierz</a>';




?>