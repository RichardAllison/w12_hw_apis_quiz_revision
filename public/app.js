// ----------------
const app = function() {

  const geographyButton = document.getElementById("geography-button");
  geographyButton.addEventListener("click", showGeographySection);
}
// ----------------
const showGeographySection = function(){
  document.getElementById("display-section").innerHTML =
    `<p>View information about a country</p>
    Region: <select id="region-select">
      <option selected disabled>Select a region</option>
    </select>
    Country: <select id="country-select">
      <option selected disabled>Select a country to view information</option>
    </select>
    <section id="country-information-section">
      <div id="country-info">

      </div>
      <div id="main-map">

      </div>`

  const url = "https://restcountries.eu/rest/v2/all"
  makeRequest(url, requestComplete);

  const mapDiv = document.querySelector("#main-map");
  const coords = {lat: 0, lng: 0}
  const map = new MapWrapper(mapDiv, coords, 1);
}

const makeRequest = function(url, callback) {
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

const displayCountryInfo = function(countries) {
  const index = document.getElementById('country-select').value;
  const country = countries[index];

  const coords = {lat: country.latlng[0], lng: country.latlng[1]};
  const mapDiv = document.querySelector('#main-map');
  const map = new MapWrapper(mapDiv, coords, 4);
  map.addMarker(coords);
}

// ----------------
document.addEventListener("DOMContentLoaded", app);
