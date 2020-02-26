console.log("Hola!");

// Data Controller

var dataController = (function() {
    // Code goes here

    // gird is the variable where all the current values in the grid is stored

    // var grid = [
    //     [0, 0, 0, 0],
    //     [0, 0, 0, 0],
    //     [0, 0, 0, 0],
    //     [0, 0, 0, 0]
    // ];

    var grid = [];
    var score = 0;

    return {
        init_grid: function(height, width) {
            grid = [];
            var grid_row;

            for (var i = 0; i < height; i++) {
                grid_row = new Array(width).fill(0);
                grid.push(grid_row);
            }
        },

        get_current_grid: function() {
            return grid;
        },

        // testing function for displaying current grid
        show_current_grid: function() {
            console.log(grid);
        },

        calculate_score: function() {},

        init_score: function() {
            score = 0;
        },

        get_score: function() {
            return score;
        },

        new_tile_val: function() {
            // chances of tile 2 is 9 out of 10 times
            var tile_vals, tile_val, pos;

            tile_vals = [2, 2, 2, 4, 2, 2, 2, 2, 2, 2];
            pos = Math.floor(Math.random() * 10);
            tile_val = tile_vals[pos];

            return tile_val;
        },

        get_empty_locations: function(current_grid) {
            var empty_locations, empty_location;

            empty_locations = [];

            height = current_grid.length;
            width = current_grid[0].length;

            for (var i = 0; i < height; i++) {
                for (var j = 0; j < width; j++) {
                    if (current_grid[i][j] === 0) {
                        empty_location = [i, j]; // row, column
                        empty_locations.push(empty_location);
                    }
                }
            }

            return empty_locations;
        },

        check_game_over: function(empty_locations) {
            var game_over;

            game_over = false;

            if (empty_locations.length === 0) {
                game_over = true;
            }

            return game_over;
        },

        new_tile_location: function(empty_locations) {
            var length, pos, tile_location;

            length = empty_locations.length;
            pos = Math.floor(Math.random() * length);
            tile_location = empty_locations[pos];

            return tile_location;
        },

        update_grid: function(tile_val, tile_location) {
            var row, col;
            row = tile_location[0];
            col = tile_location[1];
            grid[row][col] = tile_val;
        }
    };
})();

// UI Controller

var uiController = (function() {
    // Code goes here
    var DOMStrings = {
        tile: "#tile-",
        score_box: "#score",
        score_class: "value-",
        new_game: "#new-game"
    };

    return {
        DOMStrings: DOMStrings,

        display_grid: function(current_grid) {
            var height, width;

            height = current_grid.length;
            width = current_grid[0].length;

            for (var i = 0; i < height; i++) {
                for (var j = 0; j < width; j++) {
                    // innertext of the tile
                    // get value of the existing tile
                    // if not zero
                    // then remove the value class
                    // add the new value class
                    var tile_val = current_grid[i][j];
                    var tile_location = [i, j];
                    this.place_new_tile(tile_val, tile_location);
                }
            }
        },

        display_score: function(current_score) {
            document.querySelector(DOMStrings.score_box).innerText =
                "SCORE: " + current_score.toString();
        },

        place_new_tile: function(tile_val, tile_location) {
            // console.log(tile_location);
            var new_tile_id = DOMStrings.tile;

            var new_score_class = DOMStrings.score_class + tile_val.toString();

            tile_location.forEach(function(cur) {
                new_tile_id += cur.toString();
            });

            var new_tile = document.querySelector(new_tile_id);

            var classes = new_tile.classList;
            var value_class = "";

            // console.log(classes);
            classes.forEach(function(element) {
                if (element.includes("value")) {
                    // console.log(element);
                    value_class = element;
                }
            });

            // console.log(value_class);

            if (value_class !== "") {
                new_tile.classList.remove(value_class);
            }

            if (tile_val !== 0) {
                new_tile.classList.add(new_score_class);
                new_tile.innerText = tile_val.toString();
            } else {
                new_tile.innerText = "";
            }
        }
    };
})();

// Main Controller

var controller = (function(dataCtrl, uiCtrl) {
    var DOM = uiCtrl.DOMStrings;

    var init = function() {
        console.log("Hi, I am init function");

        // initialize the grid with height and row
        dataCtrl.init_grid(4, 4);

        // show the grid for testing
        dataCtrl.show_current_grid();

        // display grid
        uiCtrl.display_grid(dataCtrl.get_current_grid());

        // set the score to 0
        dataCtrl.init_score();

        // console.log(dataCtrl.get_score());

        // update the score on the UI
        uiCtrl.display_score(dataCtrl.get_score());

        // new tile
        new_tile();
        // new_tile();
        // new_tile();
        // new_tile();

        setUpEventListeners();
    };

    var setUpEventListeners = function() {
        document.querySelector(DOM.new_game).addEventListener("click", init);
    };

    var new_tile = function() {
        var current_grid, empty_locations, game_over, tile_val;

        current_grid = dataCtrl.get_current_grid();
        // console.log(current_grid);
        empty_locations = dataCtrl.get_empty_locations(current_grid);
        game_over = dataCtrl.check_game_over(empty_locations);

        if (!game_over) {
            tile_val = dataCtrl.new_tile_val();

            var tile_location;
            tile_location = dataCtrl.new_tile_location(empty_locations);

            uiCtrl.place_new_tile(tile_val, tile_location);

            dataCtrl.update_grid(tile_val, tile_location);
        }
    };

    return {
        init: init
    };
})(dataController, uiController);

controller.init();
