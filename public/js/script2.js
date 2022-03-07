//Zmienne dla okienek modalnych
var kodzik1 = "";
var kodzik2 = "";
var kodzik3 = "";
var kodzik4 = "";
var kodzik5 = "";
var kodzik6 = "";
var kodzik7 = "";
var kodzik8 = "";
var id_arkusza = "5";
var fingerprint = "8e1ef20f19a31b49c2fd5e09fc5bb0ed";
let Jaki_Arkusz = 'ARK01';
var LAO = '';
//Bazowe ustawienia dla AXIOS
const axiosInstance = axios.create({
    // Other custom settings
    baseURL: 'http://192.168.88.50/'
});

//Testowy przycisk dodający przykładową dana do okna spisanych artukółów
$('#przycisk1').click(function() {
    //alert("test");
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
// Przycisk zapisz w okienku ustawień TU WPISZ SPRAWDZANIE CO WPISAŁ URZYTKOWNIK
$('#przycisk3').click(function() {
    alert('Przed : ' + Jaki_Arkusz);
    var uzyt = $("#Uzytkownik").val();
    var lok = $("#Lokacja").val();
    var lok2 = $("#Lokacja2").val().toUpperCase();
    if (uzyt == "Login z Enov'y" || lok == "Wybierz magazyn" || lok2 == "") {
        alert("Proszę uzupełnic wszystkie pola !");

    } else {
        alert('Funkcja klick #przycisk3');
        //alert('Przed : ' + Jaki_Arkusz);
        var tekst = ("Login: " + uzyt + ", Lokacja: " + lok + ", Położenie: " + lok2 + ", UID: " + fingerprint);
        Arkusz_Tworzenie(uzyt, lok, lok2, fingerprint);
        alert('Po : ' + Jaki_Arkusz);
        $("#przycisk4").removeClass("disabled");
        $("#przycisk5").addClass("disabled");
        $("#ustawienia").html(tekst);
        $("#przycisk6").click();
    };

    //alert(tekst);
});
// Przycisk wyślij arkusz
$('#przycisk4').click(function() {
    var uzy = $("#Uzytkownik").val();
    var lo = $("#Lokacja").val();
    var lo2 = $("#Lokacja2").val();
    var $element = $('#spisane');
    var numberOfChildren = ($('#spisane>tbody tr').length - 1);
    //var numberOfChildren = $element.children().length;
    //alert(lo2);
    if ((lo2 == "") || (lo == "Wybierz magazyn") || (uzy == "Login z Enov'y") || (numberOfChildren == 0)) {
        alert("Wprowadz ustawienia lub dane, bo nie mogę wysłać arkusza");
    } else {
        alert("Zapisuję i zamykam Arkusz ID :" + id_arkusza);
        Zamknij_arkusz(id_arkusza);
        var wstaw1 = '<tbody><th>Kod</th><th>Jednostka</th><th>Nazwa</th><th>EAN</th><th>Ilość</th><th>Operacje</th><th></th></tbody>';
        $("#spisane").html(wstaw1);
        $("#ustawienia").html("Tu pojawią sie ustawienia arkusza");
        $("#przycisk5").removeClass("disabled");
        $("#przycisk4").addClass("disabled");
        $("#przycisk5").click();

    };
    //alert(Zamknij_arkusz($id_arkusza));

});
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
});
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

        Zapisz_produkt(ID_Ln, zapas, wpisana_ilosc, id_arkusza, ean);
        linijka = Generuj_tr(ID_Ln, wpisana_ilosc);
        $("tr#" + ID_Ln).remove();
        $('#spisane').append(linijka);
        $("#search_text").val('');
        $('#Ilosc_spisana').val('');
        $("#search_text").focus();
    }
});
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
});
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
});
//Funkcja pobierająca wskaznik this do konkretnej lini tabeli wyników wyszukiwania w bazie 
$("body").on("click", '.btn-arr', function() {
    var ID_Ln = $(this).parent().attr('id').slice(0, -3); // numer
    kodzik6 = ID_Ln;
    $('#Ilosc_spisana').val(''); //kasowanie wprowadzonych danych w oknie formularza ilości
});
//Funkcja kasująca linijke w polu #spisane
$("body").on("click", '.btn-kas', function() {
    var p = $(this).parent().attr('id');
    var u = ("tr#" + p).slice(0, -3);
    var id = p.slice(0, -3);
    // TU funkcja kasująca rekord w bazie
    //alert(id);
    Skasuj_wpis(id, id_arkusza);
    $(u).remove();
    //alert(u);
});
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
});
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
    Zapisz_produkt(ID_Ln, zapas, 1, id_arkusza, ean);
    //alert(ean);
    $("tr#" + ID_Ln).remove();
    $('#spisane').append(linijka);
    $("#search_text").val('');
    $('#Ilosc_spisana').val('');
    $("#search_text").focus();
});
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
});
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
};

function losowa() {
    alert(Math.floor(Math.random() * 100 + 1));

};

// Funkcja przekazująca ajax do zapisania ustawień arkusza w bazie
function Arkusz_Tworzenie($LOGIN, $MAGAZYN, $WYR, $FINGERPRINT) {
    // Make a request for a user with a given ID
    //alert('Query:' + query);
    axios.post('/spis/public/index.php/arkusz/test', {
            Login: $LOGIN,
            Magazyn: $MAGAZYN,
            Wyr: $WYR,
            FingerP: $FINGERPRINT
        })
        .then((response) => {

            const { LAZ, LAO } = response.data;
            console.log('Odpowiedz w funkcji Sprawdz_ustawienia');
            if (LAZ == 0 && LAO == 0) {
                //console.log('Dwa 0 to oznacza ARKUSZ NOWY');
                const Stan = 'NOWY';
                Jaki_Arkusz = Stan;
            };
            if (LAZ == 0 && LAO == 1) {
                //console.log('0 i 1 to oznacza ARKUSZ ISTNIEJE');
                const Stan = 'ISTNIEJE';
                Jaki_Arkusz = Stan;
            };
            if (LAZ == 1 && LAO == 0) {
                //console.log('1 i 0 to oznacza ARKUSZ ZAMKNIETY');
                const Stan = 'ZAMKNIETY';
                Jaki_Arkusz = Stan;
            };
            //console.log(Login);
            //console.log(FingerP);
            //showOutput(response);

        })
        .catch((error) => {
            // handle error
            console.log(error);
        });
}

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
});