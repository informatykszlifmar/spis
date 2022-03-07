<?php
//Zwraca wyszukane produkty w formie json.
function Wyszukaj ($id){
    
    //$id = $request->getAttribute('id'); //wysukiwany produkt
    //Połączenie do bazy danych 
    $ile_znakow = strlen($id);
    echo "$ile_znakow <br>";
    $dbConnection = Polacz_z_baza();

    

    if ($id == 0){
        $sql ="SELECT kreskowe.zapis AS IDENTYFIKATOR, kreskowe.Kod AS KOD, jednostki.Kod AS JEDNOSTKA, kreskowe.TypKodu AS TYPK, kreskowe.PodTypKodu AS PTYPK, towary.Kod AS ZAPAS, towary.Nazwa AS NAZWA, towary.CenaZakupuKartotekowaValue AS CENAZ, towary.CenaZakupuKartotekowaSymbol AS CENAJ FROM kreskowe, jednostki, towary WHERE  kreskowe.KodJednostki=jednostki.ID AND kreskowe.Zapis=towary.ID AND kreskowe.Kod LIMIT 8";
    }else {
        switch ($ile_znakow) // sprawdzamy zmienną $a
            {
            case 13:
            //echo "Wartość zmiennej a to 1";
            $sql ="SELECT kreskowe.zapis AS IDENTYFIKATOR, kreskowe.Kod AS KOD, jednostki.Kod AS JEDNOSTKA, kreskowe.TypKodu AS TYPK, kreskowe.PodTypKodu AS PTYPK, towary.Kod AS ZAPAS, towary.Nazwa AS NAZWA, towary.CenaZakupuKartotekowaValue AS CENAZ, towary.CenaZakupuKartotekowaSymbol AS CENAJ FROM kreskowe, jednostki, towary WHERE  kreskowe.KodJednostki=jednostki.ID AND kreskowe.Zapis=towary.ID AND kreskowe.Kod LIKE '%$id%' LIMIT 8";
            break;


            default:
            echo "Żadna z powyższych";
            break;
            };

        
    };
    
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
            $fechAll[]= array('IDENTYFIKATOR'=>$identyfikator,'KOD'=>$kod,'JEDNOSTKA'=>$jednostka,'TYPK'=>$typk,'PTYPK'=>$ptypk,'ZAPAS'=>$zapas,'NAZWA'=>$nazwa,'CENAZ'=>$cenaz,'CENAJ'=>$cenaj);
        };
        // $NewResponse = $response->withJson($fechAll, 200);
        print_r ($fechAll);
        //echo (json_encode($fechAll));
    } catch(PDOException $e){
        //$NewResponse = $response->withJson('{"error": {"text": '.$e->getMessage().'}', 200);
        //return $NewResponse;
        echo '{"error": {"text": '.$e->getMessage().'}';
    }
    Rozlacz_z_baza($stmt);
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
Wyszukaj('5035048657201');
// 0014238	szt	5902062071705	Szczotka ściern. tarcz z trzpi100mm 62H714	0		9,66	PLN		TOPEX
// 0014519	szt	4054596194007	Gąbka dwustronna żłóta-waflowa 150mm 50879	3	szt	78,87	PLN		3M
// 0014689	szt	4046719375905	Półmaska 6200 część twarzowa 6300  6100	32	szt	45,2	PLN	3M	
// 0015328	kg	5907704418344	Wkręt 4,5*60 KDH	0		7,99	PLN		
// 0016665	para	5907558434453	Trzewiki rob. ocieplane S3 SRC stal. podnos. 82-14	2	para	101,4	PLN		TOPEX
// 0017291	szt	5035048657201	Ładowarka XR FV 18V DCB118-QW	0		205,75	PLN		DEWALT
// 0017405	szt		Rower elektr. Hecht Prime white	0		2131,97	PLN		HECHT
// 0017438	szt		Wirnik wiertar. PRCr 500W G85030	0		23,57	PLN		
// 0017723	kpl		Szczotki 31603392T	0		6,61	PLN		
// 0017960	rol		Pianka F20 0,8*0,4*700m polietylowa 280m2	22	rol	70	PLN		

?>