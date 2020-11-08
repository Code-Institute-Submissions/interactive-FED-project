const initialCoordinates = {
    zoom: 2,
    center: {
        lat: 11.456725,
        lng: -30.637881
    }
}

function infoContainerContent(name) {
    return `<h2 class="map-brewery-name">${name}</h2>`;
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
                

            } else {
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
                        content: infoContainerContent(breweryData.name)
                    })

                    marker.addListener('click', function () {
                        mapInfoContainer.open(map, marker);
                    })

                }

                
                var map = new google.maps.Map(document.getElementById("map"), setCoordinates);
                
                
                for (i in breweriesToMark) {
                    createMarker(breweriesToMark[i]);
                }
            }
        });
    }
    var san = 'San Diego';
}