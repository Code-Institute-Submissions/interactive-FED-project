function mapLoadTest(){
    $(document).ready(function(){
        if ($('#map').children().length > 0) {
            console.log("Map loaded")
            return "Map Load Successfully";
        } else {
            alert("Map Load Error");
        }
    })
};

