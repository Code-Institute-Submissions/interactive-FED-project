const initialCoordinates = {
    zoom: 4,
    center: {
        lat: 40.002107,
        lng: -98.462495
    }
}

function infoContainerContent(name, address, url) {
    return `
    <h3 class="map-brewery-name">${name}</h3>
    <h5 class="map-brewery-address">${address}</h5>
    <h5 class="map-brewery-url"><a href="${url}" target="_blank">${url.replace('http://', '').toLowerCase()}</a></h5>
    `;
}

let dataGuinness = {
    coords: {
        lat: 53.341903,
        lng: -6.286789
    },
    name: 'Guinness'
    //icon: 'url.png'
}

let dataSmithwick = {
    coords: {
        lat: 52.654359,
        lng: -7.254142
    },
    name: "Smithwick's"
    //icon: 'url.png'
}



//Load Map
function initMap() {
    var map = new google.maps.Map(document.getElementById("map"), initialCoordinates);
}


function searchBreweries(event) {

    console.log("searchBreweries function initiated")



    let location = $('#input-location').val().toLowerCase().replace(" ", "_");
    let breweriesToMark = [];

    if (location.length == 0) {
        
        var map = new google.maps.Map(document.getElementById("map"), initialCoordinates);
        
    } else {

        //loading animation

        //look for data
        $.when(
            //$.getJSON(`apiURL${location}`)
            $.getJSON(`https://api.openbrewerydb.org/breweries?by_city=${location}`)
        ).then(
            function (response) {
                var breweriesResponse = response;
                breweriesResponse.forEach(function (element) {
                    if (element.name && element.latitude && element.longitude) {
                        //console.log(element.name); //remove
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
            console.log(breweriesToMark.length);
            console.log(breweriesToMark.length);

            if (breweriesToMark.length == 0) {
                console.log("If data empty => reset")
                //If data empty => reset
                
                var map = new google.maps.Map(document.getElementById("map"), initialCoordinates);
                $('.error-message').html('<p>Sorry, no breweries found at this city =(</p>')
                $('.search').addClass('hidden');
                $('.reset').removeClass('hidden');

            } else {
                $('.error-message').html('')
                console.log("Create markers")
                //If data => create markers
                let setCoordinates = {
                    zoom: 11,
                    center: {
                        lat: parseFloat(breweriesToMark[0].latitude),
                        lng: parseFloat(breweriesToMark[0].longitude)
                    }
                }
                
                function createMarker(breweryData) {
                    let marker = new google.maps.Marker({
                        position: {
                            lat: parseFloat(breweryData.latitude),
                            lng: parseFloat(breweryData.longitude)
                        },
                        map: map,
                        //icon: breweryData.icon = 'url.png'
                    });

                    let mapInfoContainer = new google.maps.InfoWindow({
                        content: infoContainerContent(breweryData.name, breweryData.street, breweryData.website_url)
                    })

                    marker.addListener('click', function () {
                        mapInfoContainer.open(map, marker);
                    })

                }

                
                var map = new google.maps.Map(document.getElementById("map"), setCoordinates);
                
                
                for (i in breweriesToMark) {
                    createMarker(breweriesToMark[i]);
                }

                $('.search').addClass('hidden');
                $('.reset').removeClass('hidden');
            }
        });
    }
   
}

function resetSearch(event) {
    $('.search').removeClass('hidden');
    $('.reset').addClass('hidden');
    $('#input-location').val('');
    $('.error-message').html('');

    var map = new google.maps.Map(document.getElementById("map"), initialCoordinates);    
}

function resetButtons(event) {
    $('.search').removeClass('hidden');
    $('.reset').addClass('hidden');
    $('.error-message').html('');
};