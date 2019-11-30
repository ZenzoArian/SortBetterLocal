


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

const keerTekstOm = (string) => {
  if ( string.indexOf(',') != -1 ) {
    let array = string.split(',');
    string = array[1] + ' ' + array[0];
  }
  return string;
}

let winkelwagen = {
  items: [],

  haalItemsOp: function() {
    let bestelling;
    if( localStorage.getItem('besteldeBoeken') == null ){
      bestelling = [];
    }else {
      bestelling = JSON.parse(localStorage.getItem('besteldeBoeken'));
      document.querySelector('.winkelwagen__aantal').innerHTML = bestelling.length;
    }
    bestelling.forEach( item => {
      this.items.push(item);
    })
    return bestelling;
  },

  verwijderItem: function(ean) {

  },


  uitvoeren: function() {
    document.getElementById('bestelling').innerHTML = "";
    this.items.forEach( boek => {
      let sectie = document.createElement('section');
      sectie.className = 'besteldBoek';

      let afbeelding = document.createElement('img');
      afbeelding.className = 'besteldBoek__cover';
      afbeelding.setAttribute('src', boek.cover);
      afbeelding.setAttribute('alt', keerTekstOm(boek.titel));

      let titel = document.createElement('h3');
      titel.className = 'bbesteldBoek__titel';
      titel.textContent = keerTekstOm(boek.titel);

      let prijs = document.createElement('div');
      prijs.className = 'besteldBoek__prijs';
      prijs.textContent = boek.prijs.toLocaleString('nl-NL', {currency: 'EUR', style: 'currency'});

      let verwijder = document.createElement('div');
      verwijder.className = 'besteldBoek__verwijder';

      sectie.appendChild(afbeelding);
      sectie.appendChild(titel);
      sectie.appendChild(prijs);
      sectie.appendChild(verwijder);

      document.getElementById('bestelling').appendChild(sectie);

    });
  }

}

winkelwagen.haalItemsOp();
winkelwagen.uitvoeren();
