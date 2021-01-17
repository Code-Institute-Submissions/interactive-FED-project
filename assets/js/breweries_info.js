//Function to create brewery card
function createCard(name, street, city, state, phone, url) {
    let urlFormated = ""

    //Check if url exists and formart it to be added to the card
    if (url) {
        urlFormated = `<a href="${url}" target="_blank" class="info-link">${url.replace(/^https?:\/\//, '')}</a>`;
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
        <p class="info-url">${urlFormated}</p>
    </div>
</div>
    `;
}

//Function search breweryes info
function searchInfo(event) {

    let searchInputData = encodeURI($('#input-brewery-name').val().toLowerCase());
    let breweriesInfoResults = [];

    if (searchInputData.length != 0) {
        //Get data on Open Brewery DB
        $.when(
                $.getJSON(`https://api.openbrewerydb.org/breweries/search?query=${searchInputData}`)
            ).then(
                //Handle response
                function (response) {
                    var openbrewerydbResponse = response;
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
                //Check if API provided data and show error in case not
                if (breweriesInfoResults.length == 0) {
                    console.log("No data found and reset")

                    $('.error-message').html('<p>Sorry, no breweries found with this name</p>')
                    $('.search').addClass('hidden');
                    $('.reset').removeClass('hidden');

                } else {
                    $('.error-message').html('')
                    $('.breweries-cards').html('');

                    // Create cards
                    for (i in breweriesInfoResults) {
                        $('.breweries-cards').append(createCard(
                            breweriesInfoResults[i].name,
                            breweriesInfoResults[i].street,
                            breweriesInfoResults[i].city,
                            breweriesInfoResults[i].state,
                            breweriesInfoResults[i].phone,
                            breweriesInfoResults[i].website_url))
                    }

                    //Show reset button
                    $('.search').addClass('hidden');
                    $('.reset').removeClass('hidden');
                }
            });
    }
}

//Reset search and page
function infoResetSearch(event) {
    $('.search').removeClass('hidden');
    $('.reset').addClass('hidden');
    $('#input-brewery-name').val('');
    $('.error-message').html('');
    $('.breweries-cards').html(`
        <div class="info-card">
        <div class="info-name">
            <h3>Type any part of the name above</h3>
        </div>
        <div class="info-address">
            <i class="fas fa-map-marker-alt"></i>
            <p class="info-street">Some information can </p>
            <p class="info-city">be not found</p>
            <p class="info-state"></p>
        </div>
        <div class="info-phone">
            <i class="fas fa-phone"></i>
            <p class="info-number"></p>
        </div>
        <div class="info-website">
            <i class="fas fa-globe"></i>
            <p class="info-url"></p>
        </div>
    </div>`);
}

//Search when pressing the Enter key
$(function () {
    $("#input-brewery-name").keyup(function (event) {
        if (event.key === 'Enter' || event.keyCode === 13) {
            $("#btn-search-brewery").click();
        }
    });
});