var map;
function initMap() {
// Constructor creates a new map - only center and zoom are required.
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 39.4689262, lng: -0.3846146},
        zoom: 13
    });
    posCiudadArtes = {lat: 39.4548751, lng:-0.3526791};
    var markerCiudadArtes = new google.maps.Marker({
        position: posCiudadArtes,
        map: map,
        title: 'Ciudad de las Artes y las Ciencias'
    });
    var infoCiudadArtes = new google.maps.InfoWindow({
        content: 'Art and Science, What more do you need?'
    });
    markerCiudadArtes.addListener('click', function() {
        infoCiudadArtes.open(map, markerCiudadArtes);
    });
}
