var map;
var markers = [];

var Model = {
    places: [
        {
            name: "Bioparc",
            position: {lat: 39.4786806, lng:-0.4134128}
        },
        {
            name: "Catedral de Valencia",
            position: {lat: 39.4755957, lng:-0.3774011}
        },
        {
            name: "Ciudad de las Artes y las Ciencias",
            position: {lat: 39.4548751, lng:-0.3526791}
        },
        {
            name: "L'Oceanogràfic",
            position: {lat: 39.4530477, lng:-0.3493372}
        },
        {
            name: "Parque Gulliver",
            position: {lat: 39.4625232, lng:-0.3617788}
        },
        {
            name: "Playa de la Malvarrosa",
            position: {lat: 39.4769315, lng:-0.3318832}
        },
        {
            name: "Torres de Quart",
            position: {lat: 39.4757442, lng:-0.386073}
        }
    ]
}

function initMap() {
// Constructor creates a new map
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 39.4689262, lng: -0.3846146},
        zoom: 13,
        mapTypeControl: false
    });

    infoWindow = new google.maps.InfoWindow();

    setMarkers(Model.places);

    ko.applyBindings(octopus);
    octopus.addMarkers();
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
        infowindow.setContent("<h3>" + marker.title + "</h3>" + "<div class='gallery'><div>");
        getPhotos(marker.title);
        infowindow.open(map, marker);
        // Make sure the marker property is cleared if the infowindow is closed.
        infowindow.addListener("closeclick", function() {
            infowindow.marker = null;
        });
    }
}

function getPhotos(location) {
    $.ajax({
        dataType: "json",
        url: "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
        data:
        {
            tags: location,
            tagmode: "any",
            format: "json"
        },
        success: function(data) {
            $.each(data.items, function(i, item) {
                $("<img>").attr("src", item.media.m).appendTo(".gallery");
                if(i >= 2) {
                    return false;
                }
            });
        },
        error: function(data) {
            $("<p>It seems there is a problem loading Flickr photos, sorry! Try refreshing the page.</p>").appendTo(".gallery");
        }
    });
}

function toggleMenu() {
    $("#myDropdown").toggleClass("show");
}

var placeElement = function(place) {
    this.name = place.name;
    this.position = place.position;
    this.currentSelection = ko.observable(true);
};

var ViewModel = function() {

    var self = this;
    var place;
    var marker;
    var placeItem;
    self.positionObserverArray = ko.observableArray();

    for (var i = 0; i < Model.places.length; i++) {
        place = new placeElement(Model.places[i]);
        self.positionObserverArray.push(place);
    }

    self.itemClick = function(placeItem) {
        var marker = placeItem.marker;
        google.maps.event.trigger(marker, 'click');
    };

    self.searchVenue  = ko.observable('');

    self.filterSearch = ko.computed(function() {

        if (!self.searchVenue() || self.searchVenue === undefined) {
            for (var i = 0; i < self.positionObserverArray().length; i++) {
                if (self.positionObserverArray()[i].marker !== undefined) {
                    self.positionObserverArray()[i].marker.setVisible(true);
                }
            }
            return self.positionObserverArray();
        } else {
            var filter = self.searchVenue().toLowerCase();
            return ko.utils.arrayFilter(self.positionObserverArray(), function(
            location) {
                var match = location.name.toLowerCase().indexOf(filter) > -1;
                location.marker.setVisible(match);
                return match;
            });
        }
    });

    this.addMarkers = function() {
        this.positionObserverArray().forEach(function(place, i) {
            place.marker = markers[i];
        });
    };
};

var octopus = new ViewModel();
