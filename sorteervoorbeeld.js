lijst = ["Theo", "Milena", "Miloš", "Rosmerta", "Ed", "Saskia", "Hidde"];
//lijst = [1,2,3,4,11,12,13,14,21,22,23,24,31,32,33,34,41]

// sorteren


// uitvoeren
let uitvoer = "";
lijst.forEach((item) => {
   uitvoer += item + '<br>';
});
document.getElementById('uitvoer').innerHTML = uitvoer;
