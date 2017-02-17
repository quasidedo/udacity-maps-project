var map;
function initMap() {
// Constructor creates a new map - only center and zoom are required.
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 39.4689262, lng: -0.3846146},
        zoom: 13
    });
    ciudadArtes = {lat: 39.4548751, lng:-0.3526791};
    var marker = new google.maps.Marker({
        position: ciudadArtes,
        map: map,
        title: 'Ciudad de las Artes y las Ciencias'
    });
}
