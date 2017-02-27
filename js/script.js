var map;
var markers = [];

var Model = {
    places: [
        {
            name: "Ciudad de las Artes y las Ciencias",
            position: {lat: 39.4548751, lng:-0.3526791},
            slogan: "Art and Science, What more do you need?",
            info: null
        },
        {
            name: "L'Oceanogràfic",
            position: {lat: 39.4530477, lng:-0.3493372},
            slogan: "Look out! A shark!",
            info: null
        },
        {
            name: "Bioparc",
            position: {lat: 39.4786806, lng:-0.4134128},
            slogan: "Wild Nature in the middle of the city",
            info: null
        },
        {
            name: "Torres de Quart",
            position: {lat: 39.4757442, lng:-0.386073},
            slogan: "Astonishing medieval wall",
            info: null
        },
        {
            name: "Parque Gulliver",
            position: {lat: 39.4625232, lng:-0.3617788},
            slogan: "Feel like a Lilliputian",
            info: null
        }
    ]
}

function initMap() {
// Constructor creates a new map - only center and zoom are required.
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 39.4689262, lng: -0.3846146},
        zoom: 13,
        mapTypeControl: false
    });

    infoWindow = new google.maps.InfoWindow();

    setMarkers(Model.places);

}

function setMarkers(locations) {
    var location;

    for(var i = 0; i < locations.length; i++) {

        location = locations[i];

        marker = new google.maps.Marker({
            position: location.position,
            title: location.name,
            animation: google.maps.Animation.DROP,
            map: map

        });

        markers.push(marker);

        marker.addListener('click', function() {
            populateInfoWindow(this, infoWindow);
        });
    }
}

function populateInfoWindow(marker, infowindow) {
    // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker != marker) {
        infowindow.marker = marker;
        infowindow.setContent('<h3>' + marker.title + '</h3>');
        infowindow.open(map, marker);
        // Make sure the marker property is cleared if the infowindow is closed.
        infowindow.addListener('closeclick', function() {
            infowindow.marker = null;
        });
    }
}
