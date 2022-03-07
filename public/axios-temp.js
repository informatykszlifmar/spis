function Zapisz_ustawienia($LOGIN, $MAGAZYN, $WYR, $FINGERPRINT) {
    //alert('Funkcja Zapisz_ustawienia');
    Sprawdz_ustawienia($LOGIN, $MAGAZYN, $WYR, $FINGERPRINT);
    //console.log (odpowiedz);
    console.log('Funkcja Zapisz Ustawienia');
    console.log($LOGIN);
    console.log($MAGAZYN);
    console.log($WYR);
    console.log($FINGERPRINT);
    console.log(Jaki_Arkusz);
};
// Funkcja przekazująca ajax do zapisania ustawień arkusza w bazie
function Sprawdz_ustawienia($LOGIN, $MAGAZYN, $WYR, $FINGERPRINT) {
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
                console.log('Dwa 0 to oznacza ARKUSZ NOWY');
                const Stan = 'NOWY';
                Jaki_Arkusz = Stan;
            };
            if (LAZ == 0 && LAO == 1) {
                console.log('0 i 1 to oznacza ARKUSZ ISTNIEJE');
                const Stan = 'ISTNIEJE';
                Jaki_Arkusz = Stan;
            };
            if (LAZ == 1 && LAO == 0) {
                console.log('1 i 0 to oznacza ARKUSZ ZAMKNIETY');
                const Stan = 'ZAMKNIETY';
                Jaki_Arkusz = Stan;
            };
            //console.log(Login);
            console.log(FingerP);

        })
        .catch((error) => {
            // handle error
            console.log(error);
        });
};

function Zamknij_arkusz($ID_ARKUSZA) {
    // Make a request for a user with a given ID
    //alert('Query:' + query);
    axios.post('/spis/public/index.php/arkusz/close', {
            ID_Arkusza: $ID_ARKUSZA,

        })
        .then((response) => {
            //$id_arkusza2 = response.data['ID_Arkusza'];
            console.log(response);
        })
        .catch((error) => {
            // handle error
            console.log(error);
        });
};

// Funkcja przekazująca ajax do zapisania spisanego produktu w bazie
function Zaktualizuj_produkt($ID_WWW, $ILOSC) {
    // Make a request for a user with a given ID
    //alert('Query:' + query);
    axios.post('/spis/public/index.php/spis/update', {
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
};

// Funkcja przekazująca ajax do zapisania spisanego produktu w bazie
function Zapisz_produkt($ID_WWW, $KOD, $ILOSC, $ID_ARKUSZA, $EAN) {
    // Make a request for a user with a given ID
    //alert('Query:' + query);
    axios.post('/spis/public/index.php/spis/add', {
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
};

function Skasuj_wpis($ID_WWW, $ID_ARKUSZA) {
    // Make a request for a user with a given ID
    //alert('Query:' + query);
    axios.post('/spis/public/index.php/spis/delete', {
            ID_WWW: $ID_WWW,
            ID_Arkusza: $ID_ARKUSZA
        })
        .then((response) => {
            console.log('Skasuj_wpis: ' + response);
        })
        .catch((error) => {
            // handle error
            console.log(error);
        });
};

function Arkusz_on(uzyt, mag, wyr) {
    axios.put('/spis/public/index.php/arkusz/open')
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
    axios.get('/spis/public/index.php/zapas/' + query)
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
//Funkcja odczytujaca backup 
function load_backup(ID_Arkusza) {
    // Make a request for a user with a given ID
    //alert('Query:' + query);
    axios.get('/spis/public/index.php/zapas/backup/' + ID_Arkusza)
        .then((response) => {
            // handle success
            //showOutput(response);

            console.log(response.data.length);
            wyswietl_tabele_spisane(response);
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

function wyswietl_tabele_spisane(res) {
    // var table = $('.table-responsive').tableToJSON();
    // console.log(table);
    // alert(JSON.stringify(table));
    let ID_WWW = "";
    let KOD = "";
    let JEDNOSTA = "";
    let NAZWA = "";
    let EAN = "";
    let ILOSC = "";
    let tekst_sk = "";
    let arr = res.data;
    for (index = 0; index < arr.length; index++) {
        console.log(arr[index]);
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
};

function Set_Id_Arkusza(obj) {
    let sia = JSON.parse(obj.data);
    let ex = '';
    let otw = '';
    id_arkusza = sia.ID_Arkusza;
    otw = sia.Otwarty;
    ex = sia.IS_EXIST;
    // if ((ex == 1) && (otw == 1)) {
    //     load_backup(id_arkusza);
    // } else {
    //     //alert("ZŁe Dane");
    //     //$("#Uzytkownik").val('Login z Enov'y');
    //     //$("#Lokacja").val('Wybierz magazyn');
    //     $("#Lokacja2").val('');
    //     $("#przycisk5").click();
    // };
    console.log(sia.ID_Arkusza);
    console.log(sia.Otwarty);
    console.log(sia.IS_EXIST);
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
};