// ----------------
document.addEventListener("DOMContentLoaded", function() {
  if (localStorage.getItem('state')) {
    if (localStorage.getItem('state') === "Geography") {
      showGeographySection();
    }
  } else {

    const geographyButton = document.getElementById("geography-button");
    geographyButton.addEventListener("click", showGeographySection);
  }
  createParagraph(document.querySelector("footer"), `${'\u00A9'} Richard Allison ${(new Date().getFullYear())}. All rights reserved.`)
});
// ----------------
const createParagraph = function(appendTo, text) {
  const p = document.createElement("p");
  p.innerText = text;
  appendTo.appendChild(p);
  return p;
}

const createLabel = function(appendTo, id, labelText) {
  const label = document.createElement("label");
  label.setAttribute("for", id);;
  label.innerText = labelText;
  appendTo.appendChild(label);
  return label;
}

const createSelect = function(appendTo, id, labelText) {
  if (labelText) {
    createLabel(appendTo, id, labelText)
  }
  const select = document.createElement("select");
  select.id = id;
  select.name = id;
  appendTo.appendChild(select);
  return select;
}

const createOption = function(appendTo, text, selected, disabled, value) {
  const option = document.createElement("option");
  option.innerText = text;
  if (value) {
    option.value = value;
  }
  if (disabled) {
    option.disabled = disabled;
  }
  if (selected) {
    option.setAttribute("selected", true);
  }
  appendTo.appendChild(option);
  return option;
}

const createImage = function(url, appendTo) {
  const img = document.createElement("img");
  img.src = url;
  img.width = "200";
  appendTo.appendChild(img);
  return img;
}

const createList = function(appendTo) {
  const ul = document.createElement("ul");
  appendTo.appendChild(ul);
  return ul;
}

const createListItem = function(appendTo, innerText) {
  const li = document.createElement("li");
  if (innerText) {
    li.innerText = innerText;
  }
  appendTo.appendChild(li);
  return li;
}

const rememberState = function(state) {
  localStorage.setItem('state', state);
}
// ----------------
const showGeographySection = function(){
  rememberState("Geography");

  const heading = document.querySelector("h1");
  heading.innerText = "Revise Geography";

  const subTitle = document.querySelector("header p");
  subTitle.innerText = "View information about a country";

  // const reviseSection = document.getElementById("revise-section")
  // reviseSection.parentNode.removeChild(reviseSection);

  const display = document.getElementById("display-section");

  const regionSelect = createSelect(display, "region-select", "Region: ")
  createOption(regionSelect, "Select a region", true, true)

  const select = createSelect(display, "country-select", "Country: ");
  createOption(select, "Select a country", true, true)

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

  makeRequest(requestComplete);
}
// ----------------
const makeRequest = function(callback) {
  const url = "https://restcountries.eu/rest/v2/all"
  const request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener("load", callback);
  request.send();
}

const requestComplete = function(){
  if(this.status !== 200) return;
  const jsonString = this.responseText;
  const countries = JSON.parse(jsonString);
  populateList(countries);
}
// ----------------
const populateList = function(countries){
  const select = document.getElementById("country-select");


  countries.forEach(function(country, index){
    const option = document.createElement("option");
    option.innerText = country.name;
    option.value = index;
    select.appendChild(option);
  });

  select.addEventListener('change', function(){
    displayCountryInfo(countries);
  });
};

// ----------------
const displayCountryInfo = function(countries) {
  const index = document.getElementById('country-select').value;
  const country = countries[index];

  const display = document.getElementById("country-info")
  display.innerText = "";
  const infoList = createList(display);

  createListItem(infoList, country.name);
  const flagLi = createListItem(infoList);
  createImage(country.flag, flagLi);
  createListItem(infoList, country.capital);

  const coords = {lat: country.latlng[0], lng: country.latlng[1]};
  const mapDiv = document.querySelector('#main-map');
  const map = new MapWrapper(mapDiv, coords, 4);
  map.addMarker(coords);
}
