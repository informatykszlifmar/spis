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
    var uzyt = $("#Uzytkownik").val();
    var lok = $("#Lokacja").val();
    var lok2 = $("#Lokacja2").val().toUpperCase();
    if (uzyt == "Login z Enov'y" || lok == "Wybierz magazyn" || lok2 == "") {
        alert("Proszę uzupełnic wszystkie pola !");

    } else {
        var tekst = "Login: " + uzyt + ", Lokacja: " + lok + ", Położenie: " + lok2 + ", UID: " + fingerprint;
        var dwa = Zapisz_ustawienia(uzyt, lok, lok2, fingerprint);
        console.log('Zmienna dwa: ' + dwa);
        //alert(dwa);
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
        alert(Zamknij_arkusz($id_arkusza1));
    };


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
    //console.log(ID_Ln);
    //alert(kodzik6);
    var wpisana_ilosc = $('#Ilosc_spisana').val();
    var dlugosc_i = wpisana_ilosc.length;
    //alert(wpisany_kod + ',' + dlugosc);
    if (dlugosc_i == 0 || wpisana_ilosc == "0") {
        alert("Ilość musi być większa od zera");
        $('#Ilosc_spisana').val('');
    } else {

        //Zapisz_produkt(ID_Ln, zapas, wpisana_ilosc, 1);
        linijka = Generuj_tr(ID_Ln, wpisana_ilosc);
        $("tr#" + ID_Ln).remove();
        $('#spisane').append(linijka);
        $("#search_text").val('');
        $('#Ilosc_spisana').val('');
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
    $(u).remove();
    //alert(u);
});
//Funcja poprawiająca ilość spisana dla danego rekordu w bazie danych !!!!!!!!!!!!!!!!!!!!!!!!!
$("body").on("click", '#spisane .btn-pop', function() {
    alert("Popraw ilość")
});
//Funkcja dodająca zawsze jedna sztuke klikniętego zasobu do arkusza spisanego
$("body").on("click", '.btn-add1', function() {
    var ID_Ln = $(this).parent().attr('id').slice(0, -3); // numer
    var wpisana_ilosc = 1;
    var zapas = $(this).text();
    var ean = $("td#" + ID_Ln + "-EA").text();
    //var id_arkusza = '';
    alert(id_arkusza);
    linijka = Generuj_tr(ID_Ln, wpisana_ilosc);

    //console.log(linijka);
    Zapisz_produkt(ID_Ln, zapas, 1, id_arkusza1, ean);
    alert(ean);
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
        load_data_zapas(1);
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
    var pop_btn = "<button type='button' class='btn btn-primary mx-2 my-2 btn-pop'><i class='bi bi-pencil'></i></button>";
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

//Funkcja generująca linijke dla tabeli #wyszukane
function Generuj_tr_wysz(ID_LnF) {
    var ID_Ln = ID_LnF; // numer
    var wpisana_ilosc = Ilosc_F; //Ilość wpisywana do lini tabeli w polu #spisane
    var linijka = '';
    var Nr_zap = '';
    var nazwa = '';
    var ean = '';
    var jedn = '';
    var kas_btn = "<button type='button' class='btn btn-primary mx-2 my-2 btn-kas'><i class='bi bi-x-square'></i></button>";
    var pop_btn = "<button type='button' class='btn btn-primary mx-2 my-2 btn-pop'><i class='bi bi-pencil'></i></button>";
    //Generowanie id na podstawie unikalnego numeru rekordu 
    Nr_zap = $("td#" + ID_Ln + "-ID").text();
    nazwa = $("td#" + ID_Ln + "-NA").text();
    ean = $("td#" + ID_Ln + "-EN").text();
    jedn = $("td#" + ID_Ln + "-JE").text();
    //console.log(ID_Ln + ", " + Nr_zap + ", " + nazwa + ", " + ean + ", " + jedn);
    var tr_pocz = "<tr id='" + ID_Ln + "'>";
    var td_nr_zap = "<td id='" + ID_Ln + "-ID'>" + Nr_zap + "</td>";
    var td_nazwa = "<td id='" + ID_Ln + "-NA'>" + nazwa + "</td>";
    var td_ean = "<td id='" + ID_Ln + "-EN'>" + ean + "</td>";
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

function Zamknij_arkusz($ID_ARKUSZA) {
    // Make a request for a user with a given ID
    //alert('Query:' + query);
    axios.post('index.php/arkusz/close', {
            ID_Arkusza: $ID_ARKUSZA,

        })
        .then((response) => {
            $id_arkusza2 = response.data['ID_Arkusza'];
            console.log($id_arkusza2);
        })
        .catch((error) => {
            // handle error
            console.log(error);
        });
};

// Funkcja przekazująca ajax do zapisania spisanego produktu w bazie
function Zapisz_produkt($ID_WWW, $KOD, $ILOSC, $ID_ARKUSZA, $EAN) {
    // Make a request for a user with a given ID
    //alert('Query:' + query);
    axios.post('index.php/spis/add', {
            ID_WWW: $ID_WWW,
            Kod: $KOD,
            Ilosc: $ILOSC,
            ID_Arkusza: $ID_ARKUSZA,
            EAN: $EAN

        })
        .then((response) => {

            // handle success
            //showOutput(response);
            console.log(response);
            //alert("JacekK");
        })
        .catch((error) => {
            // handle error
            console.log(error);
        });
};

function Arkusz_on(uzyt, mag, wyr) {
    axios.put('index.php/arkusz/open')
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
};

// Funkcja AJAX pobierająca dane na podstawie numeru zapasu

function load_data_zapas(query) {
    // Make a request for a user with a given ID
    //alert('Query:' + query);
    axios.get('index.php/zapas/' + query)
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
};

function showOutput(res) {
    //console.log(res.data.length);
    //console.log(res.data[0].NAZWA);
    var wstaw = '';
    for (var i = 0; i < res.data.length; i++) {
        var kod = res.data[i].KOD;
        var jednostka = res.data[i].JEDNOSTKA;
        var typk = res.data[i].TYPK;
        var ptypk = res.data[i].PTYPK;
        var zapas = res.data[i].ZAPAS;
        var nazwa = res.data[i].NAZWA;
        var cenaz = res.data[i].CENAZ;
        var cenaj = res.data[i].CENAJ;
        var numer = Math.floor(Math.random() * 100000) + 1;
        if ((kod.length) < 13) {
            var kod2 = '<button type="button" class="btn btn-primary mx-2 my-2 btn-ean" data-bs-toggle="modal" data-bs-target="#staticBackdrop1"><i class="bi bi-qr-code-scan"></i></button>';
            kod = kod2;
        };
        //heder = '<th>Kod</th><th>Jednostka</th><th>Nazwa</th><th>EAN</th><th>Operacje</th>';
        wstaw = wstaw + '<tr id="' + numer + '"class="table-success">' +
            '<td id="' + numer + '-ID"><button type="button" class="btn btn-primary mx-2 my-2 btn-add1">' + zapas + '</button></td>' +
            '<td id="' + numer + '-JE">' + jednostka + '</td>' +
            '<td id="' + numer + '-NA">' + nazwa + '</td>' +
            '<td id="' + numer + '-EA">' + kod + '</td>' +
            '<td id="' + numer + '-DO"><button type="button" class="btn btn-primary mx-2 my-2 btn-arr" data-bs-toggle="modal" data-bs-target="#staticBackdrop0"><i class="bi bi-arrow-right-square"></i></button></td>' +
            '</tr>';
        //tabelka = heder + wstaw;
    };

    $('#wyszukane').append(wstaw);


}
// Funkcja AJAX pobierająca dane na podstawie kodu kreskowego
function load_data_kod(query) {
    $.ajax({
        url: "fetch-kod.php",
        method: "post",
        data: {
            query: query
        },
        success: function(data) {
            $('#wyszukane').html(data);
        }
    });
};

function losowa() {
    alert(Math.floor(Math.random() * 100 + 1));

};

function zrob_tabele(id_tabeli) {
    var dataArr = [];
    $(id_tabeli).each(function() {
        dataArr.push($(this).html());
    });
    console.log(dataArr);
    alert(dataArr);

};

function konwersja_tabeli() {
    var table = $('.table-responsive').tableToJSON();
    console.log(table);
    alert(JSON.stringify(table));
};

function Set_Id_Arkusza(obj) {
    $id_arkusza = obj.data['ID_Arkusza'];
    console.log(obj.data['ID_Arkusza'])
};

// Podpięcia po załadowaniu dokumentu
$(document).ready(function() {
    //load_data_zapas();
    $("#search_text").val('');
    $("#search_text").focus();

    $("#staticBackdrop1").on('shown.bs.modal', function() {
        $(this).find('#KodKreskowy').focus();
    });
    $("#staticBackdrop0").on('shown.bs.modal', function() {
        $(this).find('#Ilosc_spisana').focus();
    });
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
                //console.log(visitorId)
            fingerprint = visitorId;
            $('#przycisk3').removeClass("disabled");
        })
});
// Zapobieganie odświerzeniu strony
/*$(window).bind('beforeunload', function(e) {
    return "Unloading this page may lose data. What do you want to do..."
    e.preventDefault();
});*/