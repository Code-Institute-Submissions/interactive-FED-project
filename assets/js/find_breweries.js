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


function searchBreweries(location) {
    var map = new google.maps.Map(document.getElementById("map"), initialCoordinates);

    //Create marker function
    function createMarker(breweryData) {
        let marker = new google.maps.Marker({
            position: breweryData.coords,
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

    let input = $('#input-location').val();
    console.log(input);
    createMarker(dataSmithwick);
}

