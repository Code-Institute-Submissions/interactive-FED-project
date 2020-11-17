

function createCard(name, street, city, state, phone, url) {
    let urlVerified
    if (url == undefined) {
        urlVerified = ""; 
    } else {
        urlVerified = url;
    }

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
        <p class="info-url">${urlVerified}</p>
    </div>
</div>
    `;
}

//Functiaon search breweryes info
function searchInfo(event) {

    console.log("searchInfo function initiated") //remove

    let searchInputData = encodeURI($('#input-brewery-name').val().toLowerCase());
    let breweriesInfoResults = [];

    if (searchInputData.length == 0) {

       console.log("Error no data to be searched") //fix

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
                    $('.error-message').html(`<p>No info found for ${$('#input-brewery-name')}</p>`)
                } else {
                    console.log(errorResponse);
                }
            }
         )
        .done(function () {
            console.log(breweriesInfoResults.length); //remove

            if (breweriesInfoResults.length == 0) {
                console.log("No data found and reset")
                
                $('.error-message').html('<p>Sorry, no breweries found with this name</p>') //fix
                $('.search').addClass('hidden'); //fix
                $('.reset').removeClass('hidden');//fix

            } else {
                $('.error-message').html('') 
                $('.breweries-cards').html('');
                console.log("Create cards") // remove

                for (i in breweriesInfoResults) {

                        $('.breweries-cards').append( createCard(
                            breweriesInfoResults[i].name, 
                            breweriesInfoResults[i].street, 
                            breweriesInfoResults[i].city, 
                            breweriesInfoResults[i].state, 
                            breweriesInfoResults[i].phone, 
                            breweriesInfoResults[i].url))
                  
                }

                $('.search').addClass('hidden');
                $('.reset').removeClass('hidden');
            }
        });
    }

}

function infoResetSearch(event) {
    $('.search').removeClass('hidden');
    $('.reset').addClass('hidden');
    $('#input-brewery-name').val('');
    $('.error-message').html('');
    $('.breweries-cards').html('');
}

function resetButtons(event) {
        $('.search').removeClass('hidden');
        $('.reset').addClass('hidden');
        $('.error-message').html('');
};


