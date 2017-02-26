var map;

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
            name: "Torres de Cuart",
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
        zoom: 13
    });

    window.mapBounds = new google.maps.LatLngBounds();

    setMarkers(Model.places);

    // posCiudadArtes = {lat: 39.4548751, lng:-0.3526791};
    // var markerCiudadArtes = new google.maps.Marker({
    //     position: posCiudadArtes,
    //     map: map,
    //     title: 'Ciudad de las Artes y las Ciencias'
    // });
    // var infoCiudadArtes = new google.maps.InfoWindow({
    //     content: 'Art and Science, What more do you need?'
    // });
    // markerCiudadArtes.addListener('click', function() {
    //     infoCiudadArtes.open(map, markerCiudadArtes);
    // });
}

function setMarkers(locations) {
    var location;
    var i;
    var max = locations.length;

    for(i = 0; i < max; i++) {
        location = locations[i];
        bounds = window.mapBounds;
        marker = new google.maps.Marker({
            position: location.position,
            animation: google.maps.Animation.DROP,
            map: map,
            title: location.name
        });
    }
}
