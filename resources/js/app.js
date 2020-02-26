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
            // var grid = [];
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

        new_block_val: function() {
            // chances of block 2 is 9 out of 10 times
            var block_vals, block_val, pos;

            block_vals = [2, 2, 2, 4, 2, 2, 2, 2, 2, 2];
            pos = Math.floor(Math.random() * 10);
            block_val = block_vals[pos];

            return block_val;
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

        new_block_location: function(empty_locations) {
            var length, pos, block_location;

            length = empty_locations.length;
            pos = Math.floor(Math.random() * 10);
            block_location = empty_locations[pos];

            return block_location;
        },

        update_grid: function(block_val, block_location) {
            var row, col;
            row = block_location[0];
            col = block_location[1];
            grid[row][col] = block_val;
        }
    };
})();

// UI Controller

var uiController = (function() {
    // Code goes here
    var DOMStrings = {
        tile: "#tile-",
        score_box: ".score",
        score_class: "value-"
    };

    return {
        DOMStrings: DOMStrings,

        display_score: function(current_score) {
            document.querySelector(
                DOMStrings.score_box
            ).innerText += current_score.toString();
        },

        place_new_block: function(block_val, block_location) {
            var new_tile = DOMStrings.tile;
            var new_score_class = DOMStrings.score_class + block_val.toString();

            block_location.forEach(function(cur) {
                new_tile += cur.toString();
            });

            document.querySelector(new_tile).innerText = block_val.toString();
            document.querySelector(new_tile).classList.toggle(new_score_class);
        }
    };
})();

// Main Controller

var controller = (function(dataCtrl, uiCtrl) {
    // Code goes here

    var new_block = function() {
        var current_grid, empty_locations, game_over, block_val;

        current_grid = dataCtrl.get_current_grid();
        console.log(current_grid);
        empty_locations = dataCtrl.get_empty_locations(current_grid);
        game_over = dataCtrl.check_game_over(empty_locations);

        if (!game_over) {
            block_val = dataCtrl.new_block_val();

            var block_location;
            block_location = dataCtrl.new_block_location(empty_locations);

            uiCtrl.place_new_block(block_val, block_location);

            dataCtrl.update_grid(block_val, block_location);
        }
    };

    return {
        init: function() {
            console.log("Hi, I am init function");

            // initialize the grid with height and row
            dataCtrl.init_grid(4, 4);

            // show the grid for testing
            dataCtrl.show_current_grid();

            // set the score to 0
            dataCtrl.init_score();

            // console.log(dataCtrl.get_score());

            // update the score on the UI
            uiCtrl.display_score(dataCtrl.get_score());

            // new block
            new_block();
            // new_block();
            // new_block();
            // new_block();
        }
    };
})(dataController, uiController);

controller.init();
