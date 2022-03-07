//Zmienne dla okienek modalnych
var kodzik1 = "";
var kodzik2 = "";
var kodzik3 = "";
var kodzik4 = "";
var kodzik5 = "";
var kodzik6 = "";
var kodzik7 = "";
var kodzik8 = "";
//let id_arkusza_m = "Nie znany";
var fingerprint = "";
//var Stan_Arkusza = null;
//let Stan_Arkusza = "Nie ustawiono";
// var uzy = "";
// var lo = "";
// var lo2 = "";

//Bazowe ustawienia dla AXIOS
const axiosInstance = axios.create({
        // Other custom settings
        baseURL: 'http://jag.szlifmar.pl/spis/'
    })
    //Testowy przycisk dodający przykładową dana do okna spisanych artukółów
$('#przycisk1').click(function() {
    //alert("test");
    //$('#spisane').append('<div class="d-flex justify-content-evenly"><button type="button" class="btn btn-primary mx-2 my-2 btn-kas"><i class="bi bi-x-circle"></i></button> KK:1234567890123 #0000002 Ilość:0000<button type="button" class="btn btn-primary mx-2 my-2 btn-pop"><i class="bi bi-chat-square-dots"></i></button></div>');
    //losowa();
});
// Przycisk plusa dodaje manualny wpis do arkusza spisu.
$('#przycisk8').click(function() {
    //alert("test");
    //alert(Math.floor(Math.random() * 100000 + 1));
    $ID_WWW = Math.floor(Math.random() * 100000 + 1);
    $KOD = 0011111;
    $ILOSC = 1;
    $ID_ARKUSZA = id_arkusza_m;
    $EAN = 1111111111333;
    //alert($ID_WWW + ', ' + $KOD + ', ' + $ILOSC + ', ' + $ID_ARKUSZA + ', ' + $EAN);
    //$('#spisane').append('<div class="d-flex justify-content-evenly"><button type="button" class="btn btn-primary mx-2 my-2 btn-kas"><i class="bi bi-x-circle"></i></button> KK:1234567890123 #0000002 Ilość:0000<button type="button" class="btn btn-primary mx-2 my-2 btn-pop"><i class="bi bi-chat-square-dots"></i></button></div>');
    //losowa();
});
// Przycisk zliczający elementy w oknie spisanych artykółów
$('#przycisk2').click(function() {
    //alert($('#spisane').children().length);
    alert(($('#spisane>tbody tr').length) - 1);
    //alert("Jacek");
    //alert($('#id_spisane').length);
});
$('#przycisk7').click(function() {
    uzy = $("#Uzytkownik").val();
    lo = $("#Lokacja").val();
    lo2 = $("#Lokacja2").val().toUpperCase();
    //alert(Stan_Arkusza);
    //console.log($("#Uzytkownik").val());
    var tekst = ("Login: " + uzyt + ", Lokacja: " + lok + ", Położenie: " + lok2 + ", Stan: " + Stan_Arkusza);
    $("#ustawienia").html(tekst);
    if (Stan_Arkusza == 'NOWY') {
        //alert('NOWY');
        Arkusz_Create(uzy, lo, lo2, fingerprint);
        $("#przycisk4").removeClass("disabled"); //Przycisk WYŚLIJ AEKUSZ
        $("#przycisk7").addClass("disabled"); //Przycisk ZACZNIJ
        $("#przycisk5").addClass("disabled"); //Przycisk USTAWIENIA
        $("#search_text").removeAttr('disabled', 'disabled');
        $("#search_text").focus();
        $("#przycisk8").removeClass("disabled"); //Przycisk DODAJ
    };
    if (Stan_Arkusza == 'ISTNIEJE') {
        //alert('ISTNIEJE');
        Pobierz_ID_Arkusza(uzy, lo, lo2, fingerprint);
        //console.log(id_arkusza_m);
        setTimeout(function() {
            //console.log('after#przycisk7 id_arkusza_m: ' + id_arkusza_m);
            load_backup(id_arkusza_m);
        }, 2000);
        //load_backup(id_arkusza_m);
        //console.log(id_arkusza_m);
        $("#przycisk4").removeClass("disabled"); //Przycisk WYŚLIJ AEKUSZ
        $("#przycisk7").addClass("disabled"); //Przycisk ZACZNIJ
        $("#przycisk5").addClass("disabled"); //Przycisk USTAWIENIA
        $("#search_text").removeAttr('disabled', 'disabled');
        $("#search_text").focus();
        $("#przycisk8").removeClass("disabled"); //Przycisk DODAJ
    };
    if (Stan_Arkusza == 'ZAMKNIETY') {
        alert('Arkusz jest ZAMKNIETY');
        //$("#przycisk4").removeClass("disabled"); //Przycisk USTAWIENIA
        $("#przycisk5").removeClass("disabled"); //Przycisk USTAWIENIA
        $("#przycisk7").addClass("disabled"); //Przycisk ZACZNIJ
        $("#przycisk4").addClass("disabled"); //Przycisk WYŚLIJ AEKUSZ
        $("#przycisk8").addClass("disabled"); //Przycisk DODAJ
    };
    //$("#przycisk4").removeClass("disabled"); //Przycisk USTAWIENIA
    //$("#przycisk7").addClass("disabled"); //Przycisk WYŚLIJ AEKUSZ

    //alert("Jacek");
    //alert($('#id_spisane').length);
});
// Przycisk WYŚLIJ ARKUSZ
$('#przycisk4').click(function() {
        uzy = $("#Uzytkownik").val();
        lo = $("#Lokacja").val();
        lo2 = $("#Lokacja2").val();
        //var $elementy = $('#spisane').val();
        var numberOC = ($('#spisane>tbody tr').length - 1);
        //var numberOfChildren = $element.children().length;
        //alert(numberOC);
        if ((numberOC == 0) || (lo == "Wybierz magazyn") || (uzy == "Login z Enov'y") || (lo2 == "")) {
            alert("Wprowadz ustawienia lub dane, bo nie mogę wysłać arkusza");

        } else {
            alert("Zapisuję i zamykam Arkusz ID :" + id_arkusza_m);
            Zamknij_arkusz(id_arkusza_m);
            var wstaw1 = '<tbody><th>Kod</th><th>Jednostka</th><th>Nazwa</th><th>EAN</th><th>Ilość</th><th>Operacje</th><th></th></tbody>';
            $("#spisane").html(wstaw1);
            var wstaw2 = '<table class="table bordered table-responsive"><th>Kod</th><th>Jednostka</th><th>Nazwa</th><th>EAN</th><th>Operacje</th></table>';
            $("#wyszukane").html(wstaw2);
            $("#ustawienia").html("Tu pojawią sie ustawienia arkusza");
            $("#przycisk5").removeClass("disabled"); //Przycisk USTAWIENIA
            $("#przycisk7").addClass("disabled"); //Przycisk ZACZNIJ
            $("#przycisk4").addClass("disabled"); //Przycisk WYŚLIJ AEKUSZ
            $("#search_text").attr('disabled', 'disabled');
            $("#przycisk8").addClass("disabled"); //Przycisk DODAJ
            // $("#przycisk5").click(); //Przycisk USTAWIENIA

        };
        //alert(Zamknij_arkusz($id_arkusza));

    })
    //Obsłyga przycisku zapisz w oknie wpisywania kodu kreskowego
$('.kod_kreskowy').click(function() {
        var wpisany_kod = $('#KodKreskowy').val();

        //alert(wpisany_kod);
        var dlugosc = wpisany_kod.length;
        if (dlugosc != 13) {
            alert("Kod kreskowy ma 13 znaków sprawdz czy wprowadzasz poprawny kod");
            $('#KodKreskowy').val('');
        } else {
            var do_cl = "tr#" + kodzik7;
            //alert(do_cl);
            $(do_cl).removeClass("table-danger");
            $(do_cl).addClass("table-success");
            $(kodzik1).append(wpisany_kod);
            $(kodzik2).remove();
            $('#KodKreskowy').val('');
            /*alert(kodzik1, kodzik2);*/
        }
    })
    //Obsługa przycisku zapisz w oknie wpisywania ilości
$('.podaj_ilosc').click(function() {
        var ID_Ln = kodzik6; // numer
        var zapas = $("td#" + ID_Ln + "-ID").text();
        var ean = $("td#" + ID_Ln + "-EA").text();
        var wpisana_ilosc = $('#Ilosc_spisana').val();
        var dlugosc_i = wpisana_ilosc.length;
        if (dlugosc_i == 0 || wpisana_ilosc == "0") {
            alert("Ilość musi być większa od zera");
            $('#Ilosc_spisana').val('');
        } else {

            Zapisz_produkt(ID_Ln, zapas, wpisana_ilosc, id_arkusza_m, ean);
            linijka = Generuj_tr(ID_Ln, wpisana_ilosc);
            $("tr#" + ID_Ln).remove();
            $('#spisane').append(linijka);
            $("#search_text").val('');
            $('#Ilosc_spisana').val('');
            $("#search_text").focus();
        }
    })
    //Obsługa przycisku zapisz w oknie poprawiania ilości
$('.popraw_ilosc').click(function() {
        var ID_Ln = kodzik8; // numer
        var zapas = $("td#" + ID_Ln + "-ID").text();
        var ean = $("td#" + ID_Ln + "-EA").text();
        var wpisana_ilosc = $('#Ilosc_poprawiana').val();
        var dlugosc_i = wpisana_ilosc.length;
        if (dlugosc_i == 0 || wpisana_ilosc == "0") {
            alert("Ilość musi być większa od zera");
            $('#Ilosc_poprawiana').val('');
        } else {
            //alert(ID_Ln);
            Zaktualizuj_produkt(ID_Ln, wpisana_ilosc);
            var u = "#" + ID_Ln + "-DO";
            $(u).text(wpisana_ilosc);
            //Zapisz_produkt(ID_Ln, zapas, wpisana_ilosc, id_arkusza, ean);
            //linijka = Generuj_tr(ID_Ln, wpisana_ilosc);
            //$("tr#" + ID_Ln).remove();
            //$('#spisane').append(linijka);
            //$("#search_text").val('');
            $('#Ilosc_poprawiana').val('');
            $("#search_text").focus();
        }
    })
    //Funkcja pobierająca dane niezbędne dla okienka z wpisywaniem kodu kreskowego
$("body").on("click", '.btn-ean', function() {
        var ID_Ln = $(this).parent().attr('id').slice(0, -3); // numer
        kodzik7 = ID_Ln;
        var t = $(this).parent().attr('id');
        var b = "#" + t + " button";
        var q = "td#" + t;
        kodzik1 = q;
        kodzik2 = b;
        //alert(q + ', ' + b + ', ' + t);
    })
    //Funkcja pobierająca wskaznik this do konkretnej lini tabeli wyników wyszukiwania w bazie 
$("body").on("click", '.btn-arr', function() {
        var ID_Ln = $(this).parent().attr('id').slice(0, -3); // numer
        kodzik6 = ID_Ln;
        $('#Ilosc_spisana').val(''); //kasowanie wprowadzonych danych w oknie formularza ilości
    })
    //Funkcja kasująca linijke w polu #spisane
$("body").on("click", '.btn-kas', function() {
        var p = $(this).parent().attr('id');
        var u = ("tr#" + p).slice(0, -3);
        var id = p.slice(0, -3);
        // TU funkcja kasująca rekord w bazie
        //alert(id);
        Skasuj_wpis(id, id_arkusza_m);
        $(u).remove();
        //alert(u);
    })
    //Funcja poprawiająca ilość spisana dla danego rekordu w bazie danych !!!!!!!!!!!!!!!!!!!!!!!!!
$("body").on("click", '.btn-pop', function() {
        var p = $(this).parent().attr('id');
        var id = p.slice(0, -3);
        var u = (id + "-DO");
        kodzik8 = id;
        $('#Ilosc_poprawiana').val('');
        //$("#Ilosc_poprawiana").focus();
        //alert('P: ' + p + ' U: ' + u + ' ID: ' + id);
        //alert("Popraw ilość")
    })
    //Funkcja dodająca zawsze jedna sztuke klikniętego zasobu do arkusza spisanego
$("body").on("click", '.btn-add1', function() {
        var ID_Ln = $(this).parent().attr('id').slice(0, -3); // numer
        var wpisana_ilosc = 1;
        var zapas = $(this).text();
        var ean = $("td#" + ID_Ln + "-EA").text();
        //var id_arkusza = '';
        //alert('Zmienna id_arkusza w funcji dodawania zawsze jednej szt :' + id_arkusza);
        linijka = Generuj_tr(ID_Ln, wpisana_ilosc);

        //console.log(linijka);
        //alert(ID_Ln + " " + zapas + " " + id_arkusza + " " + ean);
        Zapisz_produkt(ID_Ln, zapas, 1, id_arkusza_m, ean);
        //alert(ean);
        $("tr#" + ID_Ln).remove();
        $('#spisane').append(linijka);
        $("#search_text").val('');
        $('#Ilosc_spisana').val('');
        $("#search_text").focus();
    })
    //Funkcja pobierająca tekst wpisany w polu wyszukaj i pobierająca dane z bazy dla pola #wyszukane
$("#search_text").keyup(function() {
        // Check input( $( this ).val() ) for validity here
        var search = $(this).val();
        if (search != '') {
            var dl = search.length;
            if ((dl >= 5) && (dl <= 7)) {
                //alert(search);
                load_data_zapas(search);
            } else {
                if (dl >= 13) {
                    //alert(search);
                    load_data_zapas(search);
                    //alert("Powyzej 13")
                }
            }

        } else {
            //alert(search);
            load_data_zapas(0);
        }
    })
    //Funkcja generująca linijke dla tabeli #spisane
function Generuj_tr(ID_LnF, Ilosc_F) {
    var ID_Ln = ID_LnF; // numer
    var wpisana_ilosc = Ilosc_F; //Ilość wpisywana do lini tabeli w polu #spisane
    var linijka = '';
    var Nr_zap = '';
    var nazwa = '';
    var ean = '';
    var jedn = '';
    var kas_btn = "<button type='button' class='btn btn-primary mx-2 my-2 btn-kas'><i class='bi bi-x-square'></i></button>";
    var pop_btn = "<button type='button' class='btn btn-primary mx-2 my-2 btn-pop' data-bs-toggle='modal' data-bs-target='#staticBackdrop3'><i class='bi bi-pencil'></i></button>";
    //Generowanie id na podstawie unikalnego numeru rekordu 
    Nr_zap = $("td#" + ID_Ln + "-ID").text();
    nazwa = $("td#" + ID_Ln + "-NA").text();
    ean = $("td#" + ID_Ln + "-EA").text();
    jedn = $("td#" + ID_Ln + "-JE").text();
    //console.log(ID_Ln + ", " + Nr_zap + ", " + nazwa + ", " + ean + ", " + jedn);
    var tr_pocz = "<tr id='" + ID_Ln + "'>";
    var td_nr_zap = "<td id='" + ID_Ln + "-ID'>" + Nr_zap + "</td>";
    var td_nazwa = "<td id='" + ID_Ln + "-NA'>" + nazwa + "</td>";
    var td_ean = "<td id='" + ID_Ln + "-EA'>" + ean + "</td>";
    var td_jed = "<td id='" + ID_Ln + "-JE'>" + jedn + "</td>";
    var td_ilosc = "<td id='" + ID_Ln + "-DO'>" + wpisana_ilosc + "</td>";
    var td_kas = "<td id='" + ID_Ln + "-KS'>" + kas_btn + "</td>";
    var td_pop = "<td id='" + ID_Ln + "-PO'>" + pop_btn + "</td>";
    var tr_kon = "</tr>";
    //linijka = "<tr id='" + ID_Ln + "'><td id='" + ID_Ln + "-ID'>" + Nr_zap + "</td><td id='" + ID_Ln + "-NA'>" + nazwa + "</td><td id='" + ID_Ln + "-EN'>" + ean + "</td><td id='" + ID_Ln + "-JE'>" + jedn + "</td><td id='" + ID_Ln + "-DO'>" + wpisana_ilosc + "</td><td id='" + ID_Ln + "-KS'>" + kas_btn + "</td><td id='" + ID_Ln + "-PO'>" + pop_btn + "</td></tr>";
    linijka = tr_pocz + td_nr_zap + td_jed + td_nazwa + td_ean + td_ilosc + td_kas + td_pop + tr_kon;
    //console.log(linijka);
    return linijka;
}

function Generuj_tr2(ID_LnF, Ilosc_F) {
    var ID_Ln = ID_LnF; // numer
    var wpisana_ilosc = Ilosc_F; //Ilość wpisywana do lini tabeli w polu #spisane
    var linijka = '';
    var Nr_zap = '';
    var nazwa = '';
    var ean = '';
    var jedn = '';
    var kas_btn = "<button type='button' class='btn btn-primary mx-2 my-2 btn-kas'><i class='bi bi-x-square'></i></button>";
    var pop_btn = "<button type='button' class='btn btn-primary mx-2 my-2 btn-pop' data-bs-toggle='modal' data-bs-target='#staticBackdrop3'><i class='bi bi-pencil'></i></button>";
    //Generowanie id na podstawie unikalnego numeru rekordu 
    Nr_zap = $("td#" + ID_Ln + "-ID").text();
    nazwa = $("td#" + ID_Ln + "-NA").text();
    ean = $("td#" + ID_Ln + "-EA").text();
    jedn = $("td#" + ID_Ln + "-JE").text();
    //console.log(ID_Ln + ", " + Nr_zap + ", " + nazwa + ", " + ean + ", " + jedn);
    var tr_pocz = "<tr id='" + ID_Ln + "'>";
    var td_nr_zap = "<td id='" + ID_Ln + "-ID'>" + Nr_zap + "</td>";
    var td_nazwa = "<td id='" + ID_Ln + "-NA'>" + nazwa + "</td>";
    var td_ean = "<td id='" + ID_Ln + "-EA'>" + ean + "</td>";
    var td_jed = "<td id='" + ID_Ln + "-JE'>" + jedn + "</td>";
    var td_ilosc = "<td id='" + ID_Ln + "-DO'>" + wpisana_ilosc + "</td>";
    var td_kas = "<td id='" + ID_Ln + "-KS'>" + kas_btn + "</td>";
    var td_pop = "<td id='" + ID_Ln + "-PO'>" + pop_btn + "</td>";
    var tr_kon = "</tr>";
    //linijka = "<tr id='" + ID_Ln + "'><td id='" + ID_Ln + "-ID'>" + Nr_zap + "</td><td id='" + ID_Ln + "-NA'>" + nazwa + "</td><td id='" + ID_Ln + "-EN'>" + ean + "</td><td id='" + ID_Ln + "-JE'>" + jedn + "</td><td id='" + ID_Ln + "-DO'>" + wpisana_ilosc + "</td><td id='" + ID_Ln + "-KS'>" + kas_btn + "</td><td id='" + ID_Ln + "-PO'>" + pop_btn + "</td></tr>";
    linijka = tr_pocz + td_nr_zap + td_jed + td_nazwa + td_ean + td_ilosc + td_kas + td_pop + tr_kon;
    //console.log(linijka);
    return linijka;
}

function losowa() {
    alert(Math.floor(Math.random() * 100 + 1));

}

// Funkcja przekazująca ajax do zapisania ustawień arkusza w bazie
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
async function Arkusz_Test1($LOGIN, $MAGAZYN, $WYR, $FINGERPRINT) {
    try {
        const data = await axios({
            method: 'post',
            url: '//arkusz/test',
            data: {
                Login: $LOGIN,
                Magazyn: $MAGAZYN,
                Wyr: $WYR,
                FingerP: $FINGERPRINT
            }
        });
        const { LAZ, LAO } = data.data;
        //const { LAZ, LAO } = response.data;
        console.log('Odpowiedz w funkcji Sprawdz_ustawienia');
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
        //console.log(data);
        // const TES = 'JacekG125';
        // Zmienna = TES;
        // showOutput(data);
    } catch {
        console.log('Jakis straszny błąd');
    }
}


// axios.post('/spis/public/arkusz/test', {
//         Login: $LOGIN,
//         Magazyn: $MAGAZYN,
//         Wyr: $WYR,
//         FingerP: $FINGERPRINT
//     })
//     .then((response) => {
//         const { LAZ, LAO } = response.data;
//         if (LAZ == 0 && LAO == 0) {
//             const Stan = 'NOWY';
//             Stan_Arkusza = Stan;
//         };
//         if (LAZ == 0 && LAO == 1) {
//             const Stan = 'ISTNIEJE';
//             Stan_Arkusza = Stan;
//         };
//         if (LAZ == 1 && LAO == 0) {
//             const Stan = 'ZAMKNIETY';
//             Stan_Arkusza = Stan;
//         };
//     })
//     .catch((error) => {
//         // handle error
//         console.log(error);
//     });


function Wyswietl(res) {
    //console.log(Stan_Arkusza);
    //alert(Stan_Arkusza);
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
            // console.log ('Funkcja Pobierz_ID_Arkusza response_Data');
            // console.log(response.data.ID_Arkusza);

            const { ID_Arkusza } = response.data;

            id_arkusza_m = ID_Arkusza;
            // console.log(ID_Arkusza);

        })
        .catch((error) => {
            // handle error
            console.log(error);
        });
}

function Arkusz_Create($LOGIN, $MAGAZYN, $WYR, $FINGERPRINT) {
    // Make a request for a user with a given ID
    let $log = $LOGIN;
    let $mag = $MAGAZYN;
    let $w = $WYR;
    let $fp = $FINGERPRINT;
    axios.post('/spis/public/arkusz/create', {
            Login: $LOGIN,
            Magazyn: $MAGAZYN,
            Wyr: $WYR,
            FingerP: $FINGERPRINT
        })
        .then((response) => {

            const { ID_Arkusza } = response.data;
            // console.log('Odpowiedz w funkcji Sprawdz_ustawienia : ' + $mag);
            // console.log('Magazyn : ' + $mag);
            // console.log('Login : ' + $log);
            // console.log('Wyróżnik : ' + $w);
            // console.log('UID : ' + $fp);
            id_arkusza_m = ID_Arkusza;
            //console.log(Login);
            //console.log(ID_Arkusza);
            //showOutput(response);

        })
        .catch((error) => {
            // handle error
            console.log(error);
        });
}
//Funkcja odczytujaca backup 
function load_backup($numerek) {
    //console.log($numerek);
    // Make a request for a user with a given ID
    //alert('Query:' + query);
    axios.get('/spis/public/zapas/backup/' + $numerek)
        .then((response) => {
            // handle success
            //showOutput(response);

            //console.log(response.data.length);
            wyswietl_tabele_spisane(response);
            //alert("JacekK");
        })
        .catch((error) => {
            // handle error
            console.log(error);
        });
}

function wyswietl_tabele_spisane(res) {
    // var table = $('.table-responsive').tableToJSON();
    // console.log(table);
    // alert(JSON.stringify(table));
    let ID_WWW = "";
    let KOD = "";
    let JEDNOSTKA = "";
    let NAZWA = "";
    let EAN = "";
    let ILOSC = "";
    let tekst_sk = "";
    let arr = res.data;
    for (index = 0; index < arr.length; index++) {
        //console.log(arr[index]);
        ID_WWW = arr[index].ID_WWW;
        KOD = arr[index].KOD;
        JEDNOSTKA = arr[index].JEDNOSTKA;
        NAZWA = arr[index].NAZWA;
        EAN = arr[index].EAN;
        ILOSC = arr[index].ILOSC;
        tekst_sk += Generuj_tr_backup(ID_WWW, KOD, JEDNOSTKA, NAZWA, EAN, ILOSC);
    }
    tekst_sk = "<tbody><th>Kod</th><th>Jednostka</th><th>Nazwa</th><th>EAN</th><th>Ilość</th><th>Operacje</th><th></th>" + tekst_sk + "</tbody>";
    $("#spisane").html(tekst_sk);
}
//Funkcja generująca linijke dla tabeli #spisane z backupu
function Generuj_tr_backup(ID_WWW, Kod, Jednostka, Nazwa, Ean, Ilosc) {
    var ID_Ln = ID_WWW; // numer
    var wpisana_ilosc = Ilosc; //Ilość wpisywana do lini tabeli w polu #spisane
    var linijka = "";
    var Nr_zap = Kod;
    var nazwa = Nazwa;
    var ean = Ean;
    var jedn = Jednostka;
    var kas_btn = "<button type='button' class='btn btn-primary mx-2 my-2 btn-kas'><i class='bi bi-x-square'></i></button>";
    var pop_btn = "<button type='button' class='btn btn-primary mx-2 my-2 btn-pop' data-bs-toggle='modal' data-bs-target='#staticBackdrop3'><i class='bi bi-pencil'></i></button>";
    //Generowanie id na podstawie unikalnego numeru rekordu 
    // Nr_zap = $("td#" + ID_Ln + "-ID").text();
    // nazwa = $("td#" + ID_Ln + "-NA").text();
    // ean = $("td#" + ID_Ln + "-EA").text();
    // jedn = $("td#" + ID_Ln + "-JE").text();
    //console.log(ID_Ln + ", " + Nr_zap + ", " + nazwa + ", " + ean + ", " + jedn);
    var tr_pocz = "<tr id='" + ID_Ln + "'>";
    var td_nr_zap = "<td id='" + ID_Ln + "-ID'>" + Nr_zap + "</td>";
    var td_nazwa = "<td id='" + ID_Ln + "-NA'>" + nazwa + "</td>";
    var td_ean = "<td id='" + ID_Ln + "-EA'>" + ean + "</td>";
    var td_jed = "<td id='" + ID_Ln + "-JE'>" + jedn + "</td>";
    var td_ilosc = "<td id='" + ID_Ln + "-DO'>" + wpisana_ilosc + "</td>";
    var td_kas = "<td id='" + ID_Ln + "-KS'>" + kas_btn + "</td>";
    var td_pop = "<td id='" + ID_Ln + "-PO'>" + pop_btn + "</td>";
    var tr_kon = "</tr>";
    //linijka = "<tr id='" + ID_Ln + "'><td id='" + ID_Ln + "-ID'>" + Nr_zap + "</td><td id='" + ID_Ln + "-NA'>" + nazwa + "</td><td id='" + ID_Ln + "-EN'>" + ean + "</td><td id='" + ID_Ln + "-JE'>" + jedn + "</td><td id='" + ID_Ln + "-DO'>" + wpisana_ilosc + "</td><td id='" + ID_Ln + "-KS'>" + kas_btn + "</td><td id='" + ID_Ln + "-PO'>" + pop_btn + "</td></tr>";
    linijka = tr_pocz + td_nr_zap + td_jed + td_nazwa + td_ean + td_ilosc + td_kas + td_pop + tr_kon;
    //console.log(linijka);
    return linijka;
}

function Zamknij_arkusz($ID_ARKUSZA) {
    // Make a request for a user with a given ID
    //alert('Query:' + query);
    axios.post('/spis/public/arkusz/close', {
            ID_Arkusza: $ID_ARKUSZA,

        })
        .then((response) => {
            //$id_arkusza2 = response.data['ID_Arkusza'];
            //console.log(response);
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
// Funkcja AJAX pobierająca dane na podstawie numeru zapasu
function load_data_zapas(query) {
    // Make a request for a user with a given ID
    //alert('Query:' + query);
    axios.get('/spis/public/zapas/' + query)
        .then((response) => {
            // handle success
            showOutput(response);
            //console.log(response);
            //alert("JacekK");
        })
        .catch((error) => {
            // handle error
            console.log(error);
        });
}

function showOutput(res) {
    //console.log(res.data.length);
    //console.log(res.data[0].NAZWA);
    var wstaw = '';
    var h1 = '<tbody><th>Kod</th><th>Jednostka</th><th>Nazwa</th><th>EAN</th><th>Operacje</th></tbody>';
    for (var i = 0; i < res.data.length; i++) {
        var kod = res.data[i].KOD;
        var jednostka = res.data[i].JEDNOSTKA;
        var typk = res.data[i].TYPK;
        var ptypk = res.data[i].PTYPK;
        var zapas = res.data[i].ZAPAS;
        var nazwa = res.data[i].NAZWA;
        var cenaz = res.data[i].CENAZ;
        var cenaj = res.data[i].CENAJ;
        var clasa = 'table-success';
        var numer = Math.floor(Math.random() * 100000) + 1;
        if ((kod.length) < 13) {
            var kod2 = '<button type="button" class="btn btn-primary mx-2 my-2 btn-ean" data-bs-toggle="modal" data-bs-target="#staticBackdrop1"><i class="bi bi-qr-code-scan"></i></button>';
            kod = kod2;
            clasa = 'table-warning';
        };

        wstaw = wstaw + '<tr id="' + numer + '"class="' + clasa + '">' +
            '<td id="' + numer + '-ID"><button type="button" class="btn btn-primary mx-2 my-2 btn-add1">' + zapas + '</button></td>' +
            '<td id="' + numer + '-JE">' + jednostka + '</td>' +
            '<td id="' + numer + '-NA">' + nazwa + '</td>' +
            '<td id="' + numer + '-EA">' + kod + '</td>' +
            '<td id="' + numer + '-DO"><button type="button" class="btn btn-primary mx-2 my-2 btn-arr" data-bs-toggle="modal" data-bs-target="#staticBackdrop0"><i class="bi bi-arrow-right-square"></i></button></td>' +
            '</tr>';
        //tabelka = heder + wstaw;
    };
    wstaw = h1 + wstaw;
    //console.log(wstaw);
    $('#wyszukane>table').html(wstaw);


}
// Funkcja przekazująca ajax do zapisania spisanego produktu w bazie
function Zapisz_produkt($ID_WWW, $KOD, $ILOSC, $ID_ARKUSZA, $EAN) {
    //alert(id_arkusza_m);
    // Make a request for a user with a given ID
    //alert('Query:' + query);
    axios.post('/spis/public/spis/add', {
            ID_WWW: $ID_WWW,
            Kod: $KOD,
            Ilosc: $ILOSC,
            ID_Arkusza: $ID_ARKUSZA,
            EAN: $EAN

        })
        .then((response) => {

            // handle success
            //showOutput(response);
            //console.log(response);
            //alert("JacekK");
        })
        .catch((error) => {
            // handle error
            console.log(error);
        });
}
// Funkcja przekazująca ajax do zapisania manualnego produktu w bazie
function Zapisz_produkt_man($ID_WWW, $KOD, $ILOSC, $ID_ARKUSZA, $EAN) {
    //alert(id_arkusza_m);
    // Make a request for a user with a given ID
    //alert('Query:' + query);
    axios.post('/spis/public/spis/addman', {
            ID_WWW: $ID_WWW,
            Kod: $KOD,
            Ilosc: $ILOSC,
            ID_Arkusza: $ID_ARKUSZA,
            EAN: $EAN

        })
        .then((response) => {

            // handle success
            //showOutput(response);
            //console.log(response);
            //alert("JacekK");
        })
        .catch((error) => {
            // handle error
            console.log(error);
        });
}

function Skasuj_wpis($ID_WWW, $ID_ARKUSZA) {
    // Make a request for a user with a given ID
    //alert('Query:' + query);
    axios.post('/spis/public/spis/delete', {
            ID_WWW: $ID_WWW,
            ID_Arkusza: $ID_ARKUSZA
        })
        .then((response) => {
            //console.log('Skasuj_wpis: ' + response);
        })
        .catch((error) => {
            // handle error
            console.log(error);
        });
}
// Funkcja przekazująca ajax do zapisania spisanego produktu w bazie
function Zaktualizuj_produkt($ID_WWW, $ILOSC) {
    // Make a request for a user with a given ID
    //alert('Query:' + query);
    axios.post('/spis/public/spis/update', {
            ID_WWW: $ID_WWW,
            Nowa_War: $ILOSC

        })
        .then((response) => {

            // handle success
            //showOutput(response);
            //console.log(response);
            //alert("JacekK");
        })
        .catch((error) => {
            // handle error
            console.log(error);
        });
}

function Przycisk() {
    //alert('Stan Przycisku');

};

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
    //$("#search_text").focus();
    $("#search_text").attr('disabled', 'disabled');
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
    $('#search_text').addClass("disabled");
    $("#przycisk8").addClass("disabled");
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
window.onbeforeunload = function() {
    return "Dude, are you sure you want to leave? Think of the kittens!";
};
document.getElementById('przycisk3').addEventListener('click', getG1);