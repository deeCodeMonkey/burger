// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function () {
    $(".not-devoured").on("click", function (event) {
        var id = $(this).data("id");
        var devour = $(this).data("devoured");

        var newState = {
            devoured: !devour,
            id: id
        };

        // Send the PUT request.
        $.ajax("/api/eatenBurgers/" + id, {
            type: "PUT",
            data: newState
        }).then(
            function () {
                console.log("changed to", newState);
                // Reload the page to get the updated list
                location.reload();
            }
            );
    });

    $(".create-form").on("submit", function (event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();

        var newBurger = {
            burger_name: $("#burger").val().trim(),
        };

        // Send the POST request.
        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(
            function () {
                console.log("added new burger");
                // Reload the page to get the updated list
                location.reload();
            }
            );
    });

});