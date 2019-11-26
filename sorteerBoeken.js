//json import
let xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    sorteerBoekObj.data = JSON.parse(this.responseText);
    sorteerBoekObj.voegJSdatumIn();

    sorteerBoekObj.data.forEach(boek => {
      boek.titelUpper = boek.titel.toUpperCase();

      boek.sortAuteur = boek.auteur[0];
    });
    sorteerBoekObj.sorteren();
  }
}

xmlhttp.open('GET', "boeken.json", true);
xmlhttp.send();

// een tabel kop in markup uitvoeren uit een array
const maakTabelKop = (arr) => {
  let kop = '<table class="boekSelectie"><tr>';
  arr.forEach((item) => {
    kop += "<th>" + item + "</th>";
  });
  kop += "</tr>";
  return kop;
}


//functie die van een maand string een nummer maak
const geefMaandNummer = (maand) => {
  let nummer;
  switch (maand) {
    case "januari":
      nummer = 0;
      break;
    case "februari":
      nummer = 1;
      break;
    case "maart":
      nummer = 2;
      break;
    case "april":
      nummer = 3;
      break;
    case "mei":
      nummer = 4;
      break;
    case "juni":
      nummer = 5;
      break;
    case "julie":
      nummer = 6;
      break;
    case "augustus":
      nummer = 7;
      break;
    case "september":
      nummer = 8;
      break;
    case "oktober":
      nummer = 9;
      break;
    case "november":
      nummer = 10;
      break;
    case "december":
      nummer = 11;
      break;
    default:
      nummer = 0

  }
  return nummer;
}

// functie die string van maand jaar omzet in een dat-object
const maakJSdatum = (maandJaar) => {
  let mjArray = maandJaar.split(" ");
  let datum = new Date(mjArray[1], geefMaandNummer(mjArray[0]));
  return datum;
}

// maakt van array een opsomming
const maakOpsomming = (array) => {
  let string = "";
  for (let i = 0; i < array.length; i++) {
    switch (i) {
      case array.length - 1:
        string += array[i];
        break;
      case array.length - 2:
        string += array[i] + " en ";
        break;
      default:
        string += array[i] + ", ";

    }
  }
  return string;
}

const keerTekstOm = (string) => {
  if ( string.indexOf(',') != -1 ) {
    let array = string.split(',');
    string = array[1] + ' ' + array[0];
  }
  return string;
}
//object dat de boeken uitvoert en sorteert
//eigenschap: data sorteerkenmerk
//methods: sorteren() en uitvoeren()
let sorteerBoekObj = {
  data: "", //komt van de xmlhttp

  kenmerk: "titelUpper",

  oplopend: 1,

  //een datumObject toevoeg uit string uitgave
  voegJSdatumIn: function() {

    this.data.forEach((item) => {
      item.jsDatum = maakJSdatum(item.uitgave);
    });
  },

  // data sorteren
  sorteren: function() {
    this.data.sort((a, b) => a[this.kenmerk] > b[this.kenmerk] ? 1*this.oplopend : -1*this.oplopend);
    this.uitvoeren(this.data);
  },

  //de data in een tabel uitvoeren
  uitvoeren: function(data) {
    document.getElementById('uitvoer').innerHTML = "";
    data.forEach( boek => {
      let sectie = document.createElement('section');
      sectie.className = 'boekSelectie';

      let main = document.createElement('main');
      main.className = 'boekSelectie__main';

      let afbeelding = document.createElement('img');
      afbeelding.className = 'boekSelectie__cover';
      afbeelding.setAttribute('src', boek.cover);
      afbeelding.setAttribute('alt', keerTekstOm(boek.titel));

      let titel = document.createElement('h3');
      titel.className = 'boekSelectie__titel';
      titel.textContent = keerTekstOm(boek.titel);

      let auteurs = document.createElement('p');
      auteurs.className = 'boekSelectie__auteurs';

      boek.auteur[0] = keerTekstOm(boek.auteur[0]);

      auteurs.textContent = maakOpsomming(boek.auteur);

      let overig = document.createElement('p');
      overig.className = 'boekSelectie__overig';
      overig.textContent = boek.uitgave+' | aantal pagina\'s '+boek.paginas+' |  '+boek.taal+' | ean '+boek.ean;

      let prijs = document.createElement('div');
      prijs.className = 'boekSelectie__prijs';
      prijs.textContent = boek.prijs.toLocaleString('nl-NL', {currency: 'EUR', style: 'currency'});

      sectie.appendChild(afbeelding);
      main.appendChild(titel);
      main.appendChild(auteurs);
      main.appendChild(overig);
      sectie.appendChild(main);
      sectie.appendChild(prijs);

      document.getElementById('uitvoer').appendChild(sectie);

    });
  }}
//keuze sorteert
document.getElementById('kenmerk').addEventListener('change', (e) => {
  sorteerBoekObj.kenmerk = e.target.value;
  sorteerBoekObj.sorteren();
});

document.getElementsByName('oplopend').forEach((item) => {
  item.addEventListener('click', (e) => {
    sorteerBoekObj.oplopend = parseInt(e.target.value);
    sorteerBoekObj.sorteren();
  })
})
