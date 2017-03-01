var map;
var markers = [];

// Model: data about tourist places in Valencia
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

// Initializes the map
function initMap() {
// Constructor creates a new map
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 39.4689262, lng: -0.3846146},
        zoom: 13,
        mapTypeControl: false
    });

    infoWindow = new google.maps.InfoWindow();

    // Creates markers and binding to the ViewModel
    setMarkers(Model.places);
    ko.applyBindings(octopus);
    octopus.addMarkers();
}

// Creates a marker for every location
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

        // Stores markers into an array
        markers.push(marker);

        // Calls populateInfoWindow and bounce when a marker is clicked
        marker.addListener('click', function() {
            populateInfoWindow(this, infoWindow);
            bounce(this);
        });
    }
}

// Makes the marker bounce two times when clicked
function bounce(marker) {
    marker.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(function () {
        marker.setAnimation(null);
    }, 1400);
}

// Fills the marker's infowindow
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

// Retrieves the photos from Flickr API
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
        // Error handler in case the call fails
        error: function(data) {
            $("<p>It seems there is a problem loading Flickr photos, sorry! Try refreshing the page.</p>").appendTo(".gallery");
        }
    });
}

// Toggle the dropdown menu
function toggleMenu() {
    $("#myDropdown").toggleClass("show");
}

// Stores the selection
var placeElement = function(place) {
    this.name = place.name;
    this.position = place.position;
    this.currentSelection = ko.observable(true);
};

// WiewModel
var ViewModel = function() {

    var self = this;
    var place;
    var marker;
    var placeItem;
    // Keeps track of the filtered locations
    self.positionObserverArray = ko.observableArray();

    // Fills the positionObserverArray
    for (var i = 0; i < Model.places.length; i++) {
        place = new placeElement(Model.places[i]);
        self.positionObserverArray.push(place);
    }

    // Handles clicks to places on the list
    self.itemClick = function(placeItem) {
        var marker = placeItem.marker;
        google.maps.event.trigger(marker, 'click');
    };

    // Keeps track of the user's input
    self.searchVenue  = ko.observable('');

    self.filterSearch = ko.computed(function() {

        // Without input, all places are visible
        if (!self.searchVenue() || self.searchVenue === undefined) {
            for (var i = 0; i < self.positionObserverArray().length; i++) {
                if (self.positionObserverArray()[i].marker !== undefined) {
                    self.positionObserverArray()[i].marker.setVisible(true);
                }
            }
            return self.positionObserverArray();
        // With input, filter locations
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
