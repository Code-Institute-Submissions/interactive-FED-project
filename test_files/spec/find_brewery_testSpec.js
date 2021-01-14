$(document).ready(function(){

describe("Find Brewery", function() {
    describe("Map load Tests", function () {
        it("should return: Map Load Error", function(){
            spyOn(window, "alert");
            mapLoadTest();
            expect(window.alert).toHaveBeenCalledWith("Map Load Error!")
        });
        it("should return: Map Load Successfully", function(){
            expect(mapLoadTest()).toBe("Input Reseted Successfully");
        });

    });
});
});