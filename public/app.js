// ----------------
document.addEventListener("DOMContentLoaded", function () {
  const geographyButton = document.getElementById("geography-button");
  geographyButton.addEventListener("click", showGeographySection);

  const hPButton = document.getElementById("harry-potter-button")
  hPButton.addEventListener("click", showHPSection);

  if (localStorage.getItem('lastSession')) {
    if (localStorage.getItem('lastSession') === "Geography") {
      showGeographySection();

    } else if (localStorage.getItem('lastSession') === "Harry Potter") {
        showHPSection();
    }
  }
  const copyrightNotice = createElement("p", `${'\u00A9'} Richard Allison ${(new Date().getFullYear())}. All rights reserved.`)
  document.querySelector("footer").appendChild(copyrightNotice);
});
// ----------------
const createElement = function (element, text) {
  const newElement = document.createElement(element);
  if (text) {
    newElement.innerText = text;
  }
  return newElement;
}

const rememberSession = function (lastSession) {
  localStorage.setItem('lastSession', lastSession);
}
// ----------------
const showGeographySection = function () {
  rememberSession("Geography");

  const heading = document.querySelector("h1");
  heading.innerText = "Revise for Geography Quiz Questions";

  const subTitle = document.querySelector("header p");
  subTitle.innerText = "View information about a country";

  const display = document.getElementById("display-section");
  display.innerText = "";

  const regionSelectLabel = createElement("label", "Region: ")
  regionSelectLabel.setAttribute("for", "region-select");
  display.appendChild(regionSelectLabel);
  const regionSelect = createElement("select", "Region: ")
  regionSelect.id = "region-select";
  display.appendChild(regionSelect);
  const regionDefaultOption = createElement("option", "Select a region");
  regionDefaultOption.disabled = true;
  regionDefaultOption.setAttribute("selected", true);
  regionSelect.appendChild(regionDefaultOption);

  const countrySelectLabel = createElement("label", "Country: ")
  countrySelectLabel.setAttribute("for", "country-select");
  display.appendChild(countrySelectLabel);
  const select = createElement("select");
  select.id = "country-select";
  display.appendChild(select);
  const countryDefaultOption = createElement("option", "Select a country");
  countryDefaultOption.disabled = true;
  countryDefaultOption.setAttribute("selected", true);
  select.appendChild(countryDefaultOption);

  const countryInfoSection = document.createElement("section");
  countryInfoSection.id = "country-information-section";
  display.appendChild(countryInfoSection);

  const countryInfoDiv = document.createElement("div");
  countryInfoDiv.id = "country-info"
  countryInfoSection.appendChild(countryInfoDiv);

  const mapDiv = document.createElement("div")
  mapDiv.id="main-map";
  document.getElementById("display-section").appendChild(mapDiv);
  const coords = {lat: 0, lng: 0}
  const map = new MapWrapper(mapDiv, coords, 2);
  // map.addClickEvent();

  makeCountriesRequest(countriesRequestComplete);
}
// ----------------
const makeCountriesRequest = function (callback) {
  const url = "https://restcountries.eu/rest/v2/all"
  const request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener("load", callback);
  request.send();
}

const countriesRequestComplete = function () {
  if(this.status !== 200) return;
  const jsonString = this.responseText;
  const countries = JSON.parse(jsonString);
  populateList(countries);
}
// ----------------
const populateList = function (countries) {
  const select = document.getElementById("country-select");

  countries.forEach(function (country, index) {
    const option = document.createElement("option");
    option.innerText = country.name;
    option.value = index;
    select.appendChild(option);
  });

  select.addEventListener('change', function () {
    const index = this.value;
    const country = countries[index];
    displayCountryInfo(country);
  });
};

// ----------------
const displayCountryInfo = function (country) {

  const display = document.getElementById("country-info")
  display.innerText = "";
  const name = createElement("h3", `${country.name} (${country.nativeName})`);
  display.appendChild(name);
  const infoList = createElement("ul");
  display.appendChild(infoList);

  const flagLi = createElement("li");
  infoList.appendChild(flagLi);
  const flagImg = createElement("img");
  flagImg.src = country.flag;
  flagImg.width = 200;
  flagLi.appendChild(flagImg);
  infoList.appendChild(createElement("li", `Capital: ${country.capital}`));
  infoList.appendChild(createElement("li", `Population: ${country.population}`));
  infoList.appendChild(createElement("li", `Area: ${country.area} km²`));
  const languages = createElement("li", "Official languages: ");
  infoList.appendChild(languages);
  const languagesList = createElement("ul");
  languages.appendChild(languagesList)

  country.languages.forEach(function (language) {
    const langLi = createElement('li', `${language.name} (${language.nativeName})`);
    languagesList.appendChild(langLi);
  });

  const currencies = createElement("li", "Currencies: ");
  infoList.appendChild(currencies);
  const currenciesList = createElement("ul");
  currencies.appendChild(currenciesList)

  country.currencies.forEach(function (currency) {
    const currLi = createElement('li', `${currency.code}: ${currency.name} (${currency.symbol})`);
    currenciesList.appendChild(currLi);
  });

  const regionalBlocs = createElement("li", "Regional Blocs: ");
  infoList.appendChild(regionalBlocs);
  const regionalBlocsList = createElement("ul");
  regionalBlocs.appendChild(regionalBlocsList)

  country.regionalBlocs.forEach(function (regionalBloc) {
    const blocLi = document.createElement('li');
    blocLi.innerText = `${regionalBloc.name}`
    regionalBlocsList.appendChild(blocLi);
  });

  const coords = {lat: country.latlng[0], lng: country.latlng[1]};
  const mapDiv = document.querySelector('#main-map');
  const map = new MapWrapper(mapDiv, coords, 4);
  map.addMarker(coords);
  // map.addClickEvent();
}
// ----------------

const showHPSection = function () {
  rememberSession("Harry Potter");

  const heading = document.querySelector("h1");
  heading.innerText = "Revise for Harry Potter Quiz Questions";

  const subTitle = document.querySelector("header p");
  subTitle.innerText = "View information about Harry Potter characters";

  const display = document.getElementById("display-section");
  display.innerText = "";

  const characterSelectLabel = createElement("label", "Character: ")
  characterSelectLabel.setAttribute("for", "character-select");
  display.appendChild(characterSelectLabel);
  const characterSelect = createElement("select")
  characterSelect.id = "character-select";
  display.appendChild(characterSelect);
  const characterDefaultOption = createElement("option", "Select a character");
  characterDefaultOption.disabled = true;
  characterDefaultOption.setAttribute("selected", true);
  characterSelect.appendChild(characterDefaultOption);

  const characterInfoSection = document.createElement("section");
  characterInfoSection.id = "character-information-section";
  display.appendChild(characterInfoSection);

  const characterInfoDiv = document.createElement("div");
  characterInfoDiv.id = "character-info"
  characterInfoSection.appendChild(characterInfoDiv);

  makeHPRequest(hPRequestComplete);
}
// ----------------
const makeHPRequest = function (callback) {
  const url = "http://hp-api.herokuapp.com/api/characters"
  const request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener("load", callback);
  request.send();
}
// ----------------
const hPRequestComplete = function () {
  if(this.status !== 200) return;
  const jsonString = this.responseText;
  const characters = JSON.parse(jsonString);
  populateHPList(characters);
}
// ----------------
const populateHPList = function (characters) {
  const select = document.getElementById("character-select");

  characters.forEach(function (character, index) {
    const option = document.createElement("option");
    option.innerText = character.name;
    option.value = index;
    select.appendChild(option);
  });

  select.addEventListener('change', function () {
    const index = this.value;
    const character = characters[index];
    displayCharacterInfo(character);
  });
};
// ----------------
const displayCharacterInfo = function (character) {

  const display = document.getElementById("character-info")
  display.innerText = "";
  const name = createElement("h3", character.name);
  display.appendChild(name);
  const infoList = createElement("ul");
  display.appendChild(infoList);

  const charImgLi = createElement("li");
  infoList.appendChild(charImgLi);
  const charImg = createElement("img");
  charImg.src = character.image;
  charImg.width = 200;
  charImgLi.appendChild(charImg);
  if (character.hogwartsStudent) {
    infoList.appendChild(createElement("li", "Hogwarts Student"));
  }
  if (character.hogwartsStaff) {
    infoList.appendChild(createElement("li", "Hogwarts Staff"));
  }
  if (character.alive) {
    infoList.appendChild(createElement("li", "Alive"));
  } else {
    infoList.appendChild(createElement("li", "Deceased"));
  }
  infoList.appendChild(createElement("li", `Species: ${character.species}`));
  infoList.appendChild(createElement("li", `Gender: ${character.gender}`));
  infoList.appendChild(createElement("li", `House: ${character.house}`));
  infoList.appendChild(createElement("li", `Ancestry: ${character.ancestry}`));
  infoList.appendChild(createElement("li", `Eye Colour: ${character.eyeColour}`));
  infoList.appendChild(createElement("li", `Hair Colour: ${character.hairColour}`));
  const wand = createElement("li", "Wand: ");
  infoList.appendChild(wand);
  const wandInfoList = createElement("ul");
  wand.appendChild(wandInfoList);
  wandInfoList.appendChild(createElement('li', character.wand.wood));
  wandInfoList.appendChild(createElement('li', character.wand.core));
  wandInfoList.appendChild(createElement('li', `${character.wand.length}\"`));
  infoList.appendChild(createElement("li", `Patronus: ${character.patronus}`));
  infoList.appendChild(createElement("li", `Actor: ${character.actor}`));
}
