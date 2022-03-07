<?php
//use \Slim\Http\Response as Response;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Selective\BasePath\BasePathMiddleware;
use Slim\Factory\AppFactory;

require_once __DIR__ . '/../vendor/autoload.php';

$app = AppFactory::create();

// Add Slim routing middleware
$app->addRoutingMiddleware();

// Set the base path to run the app in a subdirectory.
// This path is used in urlFor().
$app->add(new BasePathMiddleware($app));

$app->addErrorMiddleware(true, true, true);

// Define app routes
$app->get('/', function (Request $request, Response $response) {
    $response->getBody()->write('<a href="/spis/hello/world">Try /spis/hello/world</a>');
    return $response;
})->setName('root');

$app->get('/hello/{name}', function (Request $request, Response $response, $args) {
    $name = $args['name'];
    $response->getBody()->write("Hello, $name");
    return $response;
});
$app->get('/test/{id}', function (Request $request, Response $response, $args) {
    $id = $args['id'];
    // $response->getBody()->write("Hello, $name");
    // return $response;
    $data = array('name' => 'Rob', 'age' => 40, 'id' => $id);
    $payload = json_encode($data);

    $response->getBody()->write($payload);
    return $response
          ->withHeader('Content-Type', 'application/json')
          ->withStatus(201);


});
//Zwraca wyszukane produkty w formie json.
$app->get('/zapas/{id}', function (Request $request, Response $response, $args){
    $id = $args['id'];
     //$id = $request->getAttribute('id'); //wysukiwany produkt
    //Połączenie do bazy danych 
    $ile_znakow = strlen($id);
    $dbConnection = Polacz_z_baza();
    if ($id == 0){
        $sql ="SELECT kreskowe.zapis AS IDENTYFIKATOR, kreskowe.Kod AS KOD, jednostki.Kod AS JEDNOSTKA, kreskowe.TypKodu AS TYPK, kreskowe.PodTypKodu AS PTYPK, towary.Kod AS ZAPAS, towary.Nazwa AS NAZWA, towary.CenaZakupuKartotekowaValue AS CENAZ, towary.CenaZakupuKartotekowaSymbol AS CENAJ FROM kreskowe, jednostki, towary WHERE  kreskowe.KodJednostki=jednostki.ID AND kreskowe.Zapis=towary.ID AND kreskowe.Kod LIMIT 5";
    }else {
        $sql ="SELECT kreskowe.zapis AS IDENTYFIKATOR, kreskowe.Kod AS KOD, jednostki.Kod AS JEDNOSTKA, kreskowe.TypKodu AS TYPK, kreskowe.PodTypKodu AS PTYPK, towary.Kod AS ZAPAS, towary.Nazwa AS NAZWA, towary.CenaZakupuKartotekowaValue AS CENAZ, towary.CenaZakupuKartotekowaSymbol AS CENAJ FROM kreskowe, jednostki, towary WHERE  kreskowe.KodJednostki=jednostki.ID AND kreskowe.Zapis=towary.ID AND kreskowe.Kod LIKE '%$id%' LIMIT 25";
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
        $payload = json_encode($fechAll);

    $response->getBody()->write($payload);
    return $response
          ->withHeader('Content-Type', 'application/json')
          ->withStatus(200);

        //return $NewResponse;
        //echo (json_encode($fechAll));
    } catch(PDOException $e){
        //$NewResponse = $response->withJson('{"error": {"text": '.$e->getMessage().'}', 200);
        //return $NewResponse;
        echo '{"error": {"text": '.$e->getMessage().'}';
    }
    Rozlacz_z_baza($stmt);
});
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

// Run app
$app->run();