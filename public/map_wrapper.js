const MapWrapper = function (container, coords, zoom) {
  this.googleMap = new google.maps.Map(container, {
    center: coords,
    zoom: zoom
  });
};

MapWrapper.prototype.addMarker = function(coords) {
  const marker = new google.maps.Marker({
    position: coords,
    map: this.googleMap
  });
};

// MapWrapper.prototype.addClickEvent = function () {
//   google.maps.event.addListener(this.googleMap, 'click', function (event) {
//     const latLng = { lat: event.latLng.lat(), lng: event.latLng.lng() }
//     const map = this.googleMap;
//     this.addMarker(latLng)

    // the code below to show information about a country by clicking somewhere on the map. Problem is to get country information back it has to make the request every time.
// ----------------
    // const geocoder = new google.maps.Geocoder;
    // geocoder.geocode({'location': latLng}, function(results, status) {
      // if (status === 'OK') {
      //   if (results[0]) {
      //     for (let i = 0; i < results[0].address_components.length; i++)  {
      //       if (results[0].address_components[i].types.indexOf("country")!= -1) {
      //         const countryName = results[0].address_components[i].long_name;
      //         makeRequest(function(){
      //           if(this.status !== 200) return;
      //           const jsonString = this.responseText;
      //           const countries = JSON.parse(jsonString);
      //           for (country of countries) {
      //             if (country.name.indexOf(countryName) !== -1) {
      //               displayCountryInfo(country);
      //             }
      //           }
      //         });
      //       }
      //     }
      //   } else {
      //     console.log('No results found');
      //   }
      //     } else {
          //   console.log("failed");
          // }
          // });
// ----------------

//   }.bind(this));
// };

// // MapWrapper.prototype.addClickEvent = function () {
//   google.maps.event.addListener(this.googleMap, 'click', function (event) {
//     const latLng = { lat: event.latLng.lat(), lng: event.latLng.lng() }
//     this.addMarker(latLng);
//     const geocoder = new google.maps.Geocoder;
//     const infowindow = new google.maps.InfoWindow;
//         geocoder.geocode({'location': latLng}, function(results, status) {
//           if (status === 'OK') {
//             if (results[0]) {
//               map.setZoom(11);
//               var marker = new google.maps.Marker({
//                 position: latlng,
//                 map: map
//               });
//               // infowindow.setContent(results[0].formatted_address);
//               // infowindow.open(map, marker);
//               console.log("worked");
//             } else {
//               // window.alert('No results found');
//               console.log("didn't work");
//             }
//           } else {
//             // window.alert('Geocoder failed due to: ' + status);
//             console.log("failed");
//           }
//         });
//       })
//   }.bind(this);
