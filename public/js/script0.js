//Zmienne dla okienek modalnych

let id_arkusza_m = "Nie znany";
var fingerprint = "";
//var Stan_Arkusza = "";
let Stan_Arkusza = "Nie ustawiono";
let uzyt = 'ADL';
let lok = 'HU';
let lok2 = '100';

//Bazowe ustawienia dla AXIOS
const axiosInstance = axios.create({
    // Other custom settings
    baseURL: 'http://192.168.88.50/'
})

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

// Funkcja przekazująca ajax do zapisania ustawień arkusza w bazie
function Arkusz_Test($LOGIN, $MAGAZYN, $WYR, $FINGERPRINT) {
    axios.post('/spis/public/index.php/arkusz/test', {
            Login: $LOGIN,
            Magazyn: $MAGAZYN,
            Wyr: $WYR,
            FingerP: $FINGERPRINT
        })
        .then((response) => {

            const { LAZ, LAO } = response.data;
            console.log('Odpowiedz w funkcji Arkusz_Test');
            if (LAZ == 0 && LAO == 0) {
                console.log('Dwa 0 to oznacza ARKUSZ NOWY');
                const Stan = 'NOWY';
                Stan_Arkusza = Stan;
            };
            if (LAZ == 0 && LAO == 1) {
                console.log('0 i 1 to oznacza ARKUSZ ISTNIEJE');
                const Stan = 'ISTNIEJE';
                Stan_Arkusza = Stan;
            };
            if (LAZ == 1 && LAO == 0) {
                console.log('1 i 0 to oznacza ARKUSZ ZAMKNIETY');
                const Stan = 'ZAMKNIETY';
                Stan_Arkusza = Stan;
            };
            //console.log(Login);
            //console.log(FingerP);
            Wyswietl(response);

        })
        .catch((error) => {
            // handle error
            console.log(error);
        });
}
$("#przycisk10").click(() => {
    alert(Stan_Arkusza);
});

function Wyswietl(res) {
    console.log(res);
    alert(Stan_Arkusza);
};

function getG1() {
    //alert(Stan_Arkusza);
    // var uzyt = $("#Uzytkownik").val();
    // var lok = $("#Lokacja").val();
    // var lok2 = $("#Lokacja2").val().toUpperCase();
    //Przycisk();
    //alert(stan);
    // Arkusz_Test(uzyt, lok, lok2, fingerprint);
    //alert(Stan_Arkusza);
    // if (Stan_Arkusza == 'NOWY') {
    //     alert('Nowy');
    // };
    if (!(uzyt == "Login z Enov'y" || lok == "Wybierz magazyn" || lok2 == "")) {
        Arkusz_Test(uzyt, lok, lok2, fingerprint);
        //alert(fingerprint);
        alert(Stan_Arkusza);
        // if (Stan_Arkusza == 'ZAMKNIETY') {
        //     alert('Zamkniete');
        // };
        //Pobierz_ID_Arkusza(uzyt, lok, lok2, fingerprint);
        var tekst = ("Login: " + uzyt + ", Lokacja: " + lok + ", Położenie: " + lok2 + ", Stan: " + Stan_Arkusza);
        //$("#przycisk4").removeClass("disabled");
        //$("#przycisk5").addClass("disabled");
        $("#ustawienia").html(tekst);
        $("#przycisk6").click();
        $("#Uzytkownik").val("Login z Enov'y");
        $("#Lokacja").val('Wybierz magazyn');
        $("#Lokacja2").val('');
    } else {
        alert("Proszę uzupełnic wszystkie pola !");
    };
};

// Funkcje wykonywane po załadowaniu dokumentu
$(document).ready(function() {

    //let Jaki_Arkusz = 'ARK01';
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
    $("#staticBackdrop3").on('shown.bs.modal', function() {
        $(this).find('#Ilosc_poprawiana').focus();
    });
    // WYWOŁANIE OKIENKA Z PARAMETRAMI ARKUSZA 
    $("#przycisk5").click();


})
document.getElementById('przycisk3').addEventListener('click', getG1);