//Zmienne dla okienek modalnych
var kodzik1 = null;
var kodzik2 = null;
var kodzik3 = null;
var kodzik4 = null;
var kodzik5 = null;
var kodzik6 = null;
var kodzik7 = null;
var kodzik8 = null;
var fingerprint = null;

//Bazowe ustawienia dla AXIOS
var axiosInstance = axios.create({
        // Other custom settings
        baseURL: 'http://jag.szlifmar.pl/spis/'
    })
    //przycisk7 -> Zacznij
$('#przycisk7').click(function() {
    uzy = $("#Uzytkownik").val();
    lo = $("#Lokacja").val();
    lo2 = $("#Lokacja2").val();
    //alert(Stan_Arkusza);
    //console.log($("#Uzytkownik").val());
    var tekst = ("Login: " + uzyt + ", Lokacja: " + lok + ", Położenie: " + lok2 + ", Stan: " + Stan_Arkusza);
    $("#ustawienia").html(tekst);
    if (Stan_Arkusza == 'NOWY') {
        //alert('NOWY');
        Arkusz_Create(uzy, lo, lo2, fingerprint);
        $("#przycisk4").removeClass("disabled"); //Przycisk USTAWIENIA
        $("#przycisk7").addClass("disabled"); //Przycisk WYŚLIJ AEKUSZ
        $("#przycisk5").addClass("disabled"); //Przycisk WYŚLIJ AEKUSZ
    };
    if (Stan_Arkusza == 'ISTNIEJE') {
        //alert('ISTNIEJE');
        Pobierz_ID_Arkusza(uzy, lo, lo2, fingerprint);
        //console.log('#przycisk7');

        //console.log('#przycisk7 id_arkusza_m: ' + id_arkusza_m);
        setTimeout(function() {
            console.log('after#przycisk7 id_arkusza_m: ' + id_arkusza_m);
        }, 1000);
        load_backup(id_arkusza_m);
        $("#przycisk4").removeClass("disabled"); //Przycisk USTAWIENIA
        $("#przycisk7").removeClass("disabled"); //Przycisk WYŚLIJ AEKUSZ
        $("#przycisk5").addClass("disabled"); //Przycisk WYŚLIJ AEKUSZ
    };
    if (Stan_Arkusza == 'ZAMKNIETY') {
        alert('Arkusz jest ZAMKNIETY');
        //$("#przycisk4").removeClass("disabled"); //Przycisk USTAWIENIA
        $("#przycisk5").removeClass("disabled"); //Przycisk USTAWIENIA
        $("#przycisk7").addClass("disabled"); //Przycisk WYŚLIJ AEKUSZ
        $("#przycisk4").addClass("disabled"); //Przycisk WYŚLIJ AEKUSZ
    };
});

function losowa() {
    alert(Math.floor(Math.random() * 100 + 1));

}
// Funkcja testująca czy arkusz o podanych parametrach istnieje.
function Arkusz_Test($LOGIN, $MAGAZYN, $WYR, $FINGERPRINT) {
    axios.post('/spis/public/arkusz/test', {
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
            //Wyswietl(response);

        })
        .catch((error) => {
            // handle error
            console.log(error);
        });
}
const printIdArkusza = () => {
    address.then((a) => {
        console.log(a);
    });
};

function Pobierz_ID_Arkusza($LOGIN, $MAGAZYN, $WYR, $FINGERPRINT) {
    // Make a request for a user with a given ID
    let $log = $LOGIN;
    let $mag = $MAGAZYN;
    let $w = $WYR;
    let $fp = $FINGERPRINT;
    axios.post('/spis/public/arkusz/id', {
            Login: $LOGIN,
            Magazyn: $MAGAZYN,
            Wyr: $WYR,
            FingerP: $FINGERPRINT
        })
        .then((response) => {
            //console.log('Funkcja Pobierz_ID_Arkusza response_Data');
            //console.log(response.data.ID_Arkusza);

            const { ID_Arkusza } = response.data;

            id_arkusza_m = ID_Arkusza;
            //console.log('Pobierz_ID_Arkusza');
            console.log('Pobierz_ID_Arkusza id_arkusza_m: ' + id_arkusza_m);

        })
        .catch((error) => {
            // handle error
            console.log(error);
        });

}
async function getG2($LOGIN, $MAGAZYN, $WYR, $FINGERPRINT) {
    try {
        const data = await axios({
            method: 'post',
            url: '/spis/public/arkusz/test',
            data: {
                Login: $LOGIN,
                Magazyn: $MAGAZYN,
                Wyr: $WYR,
                FingerP: $FINGERPRINT,
            }
        });
        console.log(data);
        const TES = 'JacekG125';
        //Stan_Arkusza = TES;
        //showOutput(data);
    } catch {
        console.log('Jakis straszny błąd');
    }
}

function getG1() {
    //alert(Stan_Arkusza);
    uzyt = $("#Uzytkownik").val();
    lok = $("#Lokacja").val();
    lok2 = $("#Lokacja2").val().toUpperCase();
    var tekst = "Tu pojawią sie ustawienia arkusza";
    $("#ustawienia").html(tekst);
    if (!(uzyt == "Login z Enov'y" || lok == "Wybierz magazyn" || lok2 == "")) {
        Arkusz_Test(uzyt, lok, lok2, fingerprint);

        $("#przycisk7").removeClass("disabled"); //przycisk7 -> Zacznij
        $("#przycisk5").addClass("disabled");
        //$("#przycisk3").addClass("disabled");

        $("#przycisk6").click();
        //$("#Uzytkownik").val("Login z Enov'y");
        //$("#Lokacja").val('Wybierz magazyn');
        //$("#Lokacja2").val('');
    } else {
        alert("Proszę uzupełnic wszystkie pola !");
    };
};
// Funkcje wykonywane po załadowaniu dokumentu
$(document).ready(function() {
    var uzy = null;
    var lo = null;
    var lo2 = null;
    window.Stan_Arkusza = null;
    window.id_arkusza_m = null;
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
})
document.getElementById('przycisk3').addEventListener('click', getG1); //przycisk3 -> Zapisz ustawienia