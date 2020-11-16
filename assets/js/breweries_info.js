

function createCard(name, street, city, state, phone, url) {
    return `
    <div class="info-card">
    <div class="info-name">
        <h3>${name}</h3>
    </div>
    <div class="info-address">
        <i class="fas fa-map-marker-alt"></i>
        <p class="info-street">${street}</p>
        <p class="info-city">${city}</p>
        <p class="info-state">${state}</p>
    </div>
    <div class="info-phone">
        <i class="fas fa-phone"></i>
        <p class="info-number">${phone}</p>
    </div>
    <div class="info-website">
        <i class="fas fa-globe"></i>
        <p class="info-url">${url}</p>
    </div>
</div>
    `;
}

//Functiaon search breweryes info
function searchInfo(event) {

    console.log("searchInfo function initiated")

    let searchInputData = encodeURI($('#input-brewery-name').val().toLowerCase());
    let breweriesInfoResults = [];

    if (searchInputData.length == 0) {

       console.log("Error no data to be searched")

    } else {

        //loading animation

        //look for data
        $.when(
            $.getJSON(`https://api.openbrewerydb.org/breweries/search?query=${searchInputData}`)
        ).then(
            function (response) {
                var openbrewerydbResponse = response;
                console.log(openbrewerydbResponse);
                openbrewerydbResponse.forEach(function (element) {
                        breweriesInfoResults.push(element);

                });
            },
            function (errorResponse) {
                if (errorResponse.status === 404) {
                    $('.error-message').html(`<p>No info found in ${searchInputData}</p>`)
                } else {
                    console.log(errorResponse);
                    $('.error-message').html(`<p>Error ${errorResponse.responseJSON.message}</p>`)
                }
            }
         )
        .done(function () {
            console.log(breweriesInfoResults.length);

            if (breweriesInfoResults.length == 0) {
                console.log("No data found and reset")
                
                $('.error-message').html('<p>Sorry, no breweries found at this city =(</p>') //fix
                $('.search').addClass('hidden'); //fix
                $('.reset').removeClass('hidden');//fix

            } else {
                $('.error-message').html('') //fix
                console.log("Create cards")

                for (i in breweriesInfoResults) {
                    $('.breweries-cards').append( createCard(
                        breweriesInfoResults[i].name, 
                        breweriesInfoResults[i].street, 
                        breweriesInfoResults[i].city, 
                        breweriesInfoResults[i].state, 
                        breweriesInfoResults[i].phone, 
                        breweriesInfoResults[i].url))
                }

                // $('.search').addClass('hidden');
                // $('.reset').removeClass('hidden');
            }
        });
    }

}

// function resetSearch(event) {
//     $('.search').removeClass('hidden');
//     $('.reset').addClass('hidden');
//     $('#input-location').val('');
//     $('.error-message').html('');

//     var map = new google.maps.Map(document.getElementById("map"), initialCoordinates);
// }

// function resetButtons(event) {
//         $('.search').removeClass('hidden');
//         $('.reset').addClass('hidden');
//         $('.error-message').html('');
// };


