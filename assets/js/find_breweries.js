const initialCoordinates = {
    zoom: 2,
    center: {
        lat: 11.456725,
        lng: -30.637881
    }
}

function infoContainerContent(name) {
    return  `<h2 class="map-brewery-name">${name}</h2>`;
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

    let location = $('#input-location').val().toLowerCase().replace(" ", "_");
    let breweriesToMark= [];

    //Result verification
    //If input empty => reset

    //else
        //loading animation

        //look for data
       
        $.when(
            //$.getJSON(`apiURL${location}`)
            $.getJSON(`https://api.openbrewerydb.org/breweries?by_city=${location}`)
        ).then(
            function(response) {
                var breweriesResponse = response;
                breweriesResponse.forEach(function(element) {
                    if (element.name && element.latitude && element.longitude) {
                        console.log(element.name);
                        breweriesToMark.push(element);                 
                    }
                });
            }, function(errorResponse) {
                if (errorResponse.status === 404) {
                    $('.error-message').html(`<p>No brewery found in ${location}</p>`)
                } else {
                    console.log(errorResponse);
                    $('.error-message').html(`<p>Error ${errorResponse.responseJSON.message}</p>`)
                }
            }
        )

        //If data empty => reset
        //If data => create markers

        
   
        var map = new google.maps.Map(document.getElementById("map"), initialCoordinates);
        
        
        //Create marker function
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
        
            marker.addListener('click', function() {
                mapInfoContainer.open(map, marker);
            })
        
        }
        
        setTimeout(function() {
            // console.log(breweriesToMark)
            // console.log(breweriesToMark[0])
            // console.log(breweriesToMark[0].latitude)
            // console.log(typeof(breweriesToMark[0].latitude))
            
            createMarker(breweriesToMark[0])

        },3000)
        
        

        var san = 'San Diego';
  
    // createMarker(/* Usar a função para criar os markers */);
}

