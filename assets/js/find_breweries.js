//Map inital coordinates
const initialCoordinates = {
    zoom: 4,
    center: {
        lat: 40.002107,
        lng: -98.462495
    }
}

//Function to create Marker Flag
function infoContainerContent(name, address, url) {
    return `
    <h3 class="map-brewery-name">${name}</h3>
    <p class="map-brewery-address">${address}</p>
    <o class="map-brewery-url"><a href="${url}" target="_blank">${url.replace('http://', '').toLowerCase()}</a></o>
    `;
}

//Load Map
function initMap() {
    var map = new google.maps.Map(document.getElementById("map"), initialCoordinates);
}

// Function to search breweries in the location inserted
function searchBreweries(event) {

    let location = $('#input-location').val().toLowerCase().replace(" ", "_");
    let breweriesToMark = [];

    if (location.length == 0) {
        //Reset map
        var map = new google.maps.Map(document.getElementById("map"), initialCoordinates);

    } else {
        //Get data on Open Brewery DB
        $.when(
            $.getJSON(`https://api.openbrewerydb.org/breweries?by_city=${location}`)
        ).then(
            //Handle response
            function (response) {
                var breweriesResponse = response;
                breweriesResponse.forEach(function (element) {
                    if (element.name && element.latitude && element.longitude) {
                        breweriesToMark.push(element);
                    }
                });
            },
            function (errorResponse) {
                if (errorResponse.status === 404) {
                    $('.error-message').html(`<p>No brewery found in ${location}</p>`)
                } else {
                    console.log(errorResponse);
                    $('.error-message').html(`<p>Error ${errorResponse.responseJSON.message}</p>`)
                }
            }
        ).done(function () {
            //Check if there is breweries to mark, and if not show error.
            if (breweriesToMark.length == 0) {
                //Reset map
                var map = new google.maps.Map(document.getElementById("map"), initialCoordinates);
                //Show error message
                $('.error-message').html('<p>Sorry, no breweries found at this city =(</p>')
                $('.search').addClass('hidden');
                $('.reset').removeClass('hidden');

            } else {
                $('.error-message').html('')

                //Map area and zoom
                let setCoordinates = {
                    zoom: 11,
                    center: {
                        lat: parseFloat(breweriesToMark[0].latitude),
                        lng: parseFloat(breweriesToMark[0].longitude)
                    }
                }

                //Function to create Markeres
                function createMarker(breweryData) {
                    let marker = new google.maps.Marker({
                        position: {
                            lat: parseFloat(breweryData.latitude),
                            lng: parseFloat(breweryData.longitude)
                        },
                        map: map,
                    });

                    let mapInfoContainer = new google.maps.InfoWindow({
                        content: infoContainerContent(breweryData.name, breweryData.street, breweryData.website_url)
                    })

                    marker.addListener('click', function () {
                        mapInfoContainer.open(map, marker);
                    })
                }

                //Load map area and zoom
                var map = new google.maps.Map(document.getElementById("map"), setCoordinates);

                //Create breweries Markers
                for (i in breweriesToMark) {
                    createMarker(breweriesToMark[i]);
                }

                //Show reset button
                $('.search').addClass('hidden');
                $('.reset').removeClass('hidden');
            }
        });
    }
}

//Reset search and page
function resetSearch(event) {
    $('.search').removeClass('hidden');
    $('.reset').addClass('hidden');
    $('#input-location').val('');
    $('.error-message').html('');

    //Reset map
    var map = new google.maps.Map(document.getElementById("map"), initialCoordinates);
}

//Search when pressing the Enter key
$(function () {
    $("#input-location").keyup(function (event) {
        if (event.key === 'Enter' || event.keyCode === 13) {
            $("#btn-search-location").click();
        }
    });
});
