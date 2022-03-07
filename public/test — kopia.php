<?php
$id = '20948';
$dbhost = 'localhost';
$dbuser = 'root';
$dbpass = '';
$dbname = 'artykuly';
$mysql_connect_str = "mysql:host=$dbhost;dbname=$dbname";
$dbConnection = new PDO($mysql_connect_str,$dbuser,$dbpass, array (PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES UTF8"));
$dbConnection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$sql ="SELECT kreskowe.zapis AS IDENTYFIKATOR, kreskowe.Kod AS KOD, jednostki.Kod AS JEDNOSTKA, kreskowe.TypKodu AS TYPK, kreskowe.PodTypKodu AS PTYPK, towary.Kod AS ZAPAS, towary.Nazwa AS NAZWA, towary.CenaZakupuKartotekowaValue AS CENAZ, towary.CenaZakupuKartotekowaSymbol AS CENAJ FROM kreskowe, jednostki, towary WHERE  kreskowe.KodJednostki=jednostki.ID AND kreskowe.Zapis=towary.ID AND kreskowe.Kod LIKE '%$id%' LIMIT 100";

//$sql ="SELECT kreskowe.Kod AS KOD, jednostki.Kod AS JEDNOSTKA, kreskowe.TypKodu AS TYPK, kreskowe.PodTypKodu AS PTYPK, towary.Kod AS ZAPAS, towary.Nazwa AS NAZWA, towary.CenaZakupuKartotekowaValue AS CENAZ, towary.CenaZakupuKartotekowaSymbol AS CENAJ FROM kreskowe, jednostki, towary WHERE  kreskowe.KodJednostki=jednostki.ID AND kreskowe.Zapis=towary.ID LIMIT 100";
try {    
$stmt = $dbConnection->query($sql);
while ($row = $stmt->fetch(PDO::FETCH_ASSOC))
{
    //$ile_znakow = strlen($row['NAZWA']);
    //echo $row['NAZWA'].', liczba znaków :'.$ile_znakow.'<br>';
    // var_dump ($row);
    // echo '<br>';
    echo json_encode($row);
    // echo '<br>';
    // echo '<br>';
    // echo json_encode('jacek : 2');
    // echo '<br>';
    // echo '<br>';
    // echo '<br>';
    // echo '<br>';

};

}
 catch(PDOException $e){
        //$NewResponse = $response->withJson('{"error": {"text": '.$e->getMessage().'}', 200);
        //return $NewResponse;
        echo '{"error": {"text": '.$e->getMessage().'}';
    }




?>