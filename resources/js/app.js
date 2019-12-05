console.log("Hola!");

// Data Controller

var dataController = (function () {
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
        init_grid: function (height, width) {
            // var grid = [];
            var grid_row;

            for (var i = 0; i < height; i++) {
                grid_row = new Array(width).fill(0);
                grid.push(grid_row);
            }
        },

        // testing function
        show_grid: function () {
            console.log(grid);
        },

        calculate_score: function () {

        },

        init_score: function () {
            score = 0;
        }


    };


})();

// UI Controller

var uiController = (function () {
    // Code goes here
    var DOMStrings = {
        tile: '#tile-',
        score_box: ".score"
    };



    return {
        DOMStrings: DOMStrings
    }
})();

// Main Controller

var controller = (function (dataCtrl, uiCtrl) {
    // Code goes here

    return {
        init: function () {
            console.log("Hi, I am init function");

            // initialize the grid with height and row
            dataCtrl.init_grid(4, 4);

            // show the grid for testing
            dataCtrl.show_grid();

            // set the score to 0
            dataCtrl.init_score();

            // update the score on the UI


        }
    }
})(dataController, uiController);


controller.init();