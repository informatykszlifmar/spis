//Zmienne dla okienek modalnych
var kodzik1 = "";
var kodzik2 = "";
var kodzik3 = "";
var kodzik4 = "";
var kodzik5 = "";
var kodzik6 = "";
var kodzik7 = "";
var id_arkusza = "JK";
var fingerprint = "";

// Przycisk zapisz w okienku ustawień TU WPISZ SPRAWDZANIE CO WPISAŁ URZYTKOWNIK
$('#przycisk3').click(function() {
    var uzyt = $("#Uzytkownik").val();
    var lok = $("#Lokacja").val();
    var lok2 = $("#Lokacja2").val().toUpperCase();
    if (uzyt == "Login z Enov'y" || lok == "Wybierz magazyn" || lok2 == "") {
        alert("Proszę uzupełnic wszystkie pola !");

    } else {
        var tekst = "Login: " + uzyt + ", Lokacja: " + lok + ", Położenie: " + lok2 + ", UID: " + fingerprint;
        Zapisz_ustawienia(uzyt, lok, lok2, fingerprint);
        //console.log('Zmienna dwa: ' + dwa);
        //alert(dwa);
        $("#ustawienia").html(tekst);
        $("#przycisk6").click();
    };

    //alert(tekst);
});

// Funkcja przekazująca ajax do zapisania ustawień arkusza w bazie
function Zapisz_ustawienia($LOGIN, $MAGAZYN, $WYR, $FINGERPRINT) {
    // Make a request for a user with a given ID
    //alert('Query:' + query);
    axios.post('index.php/arkusz/open', {
            Login: $LOGIN,
            Magazyn: $MAGAZYN,
            Wyr: $WYR,
            FingerP: $FINGERPRINT
        })
        .then((response) => {

            Set_Id_Arkusza(response);
            //console.log('Zmienna $id_arkusza : ' + $id_arkusza2);
            //console.log(response);
        })
        .catch((error) => {
            // handle error
            console.log(error);
        });
};

function Set_Id_Arkusza(obj) {
    let sia = JSON.parse(obj.data);
    id_arkusza = sia.ID_Arkusza;
};

// Funkcje wykonywane po załadowaniu dokumentu
$(document).ready(function() {
    //load_data_zapas();
    $("#search_text").val('');
    $("#search_text").focus();
    // PRAWDOPODOBNIE OBSŁUGA PRZYCISKÓW KTÓRE WYŚWIETLAJA OKIENKA MODALNE
    $("#staticBackdrop1").on('shown.bs.modal', function() {
        $(this).find('#KodKreskowy').focus();
    });
    $("#staticBackdrop0").on('shown.bs.modal', function() {
        $(this).find('#Ilosc_spisana').focus();
    });
    // WYWOŁANIE OKIENKA Z PARAMETRAMI ARKUSZA 
    $("#przycisk5").click();

    // Pobiera biblioteke do fingerprint
    const fpPromise =
        import ('https://openfpcdn.io/fingerprintjs/v3')
        .then(FingerprintJS => FingerprintJS.load())

    // Generuje unikalny identyfikator przegladarki.
    fpPromise
        .then(fp => fp.get())
        .then(result => {
            // This is the visitor identifier:
            const visitorId = result.visitorId
            fingerprint = visitorId;
            console.log('Generowanie UID -> visitorId:' + visitorId)
            $('#przycisk3').removeClass("disabled");
        })
});