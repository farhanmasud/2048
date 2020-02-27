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
        initGrid: function(height, width) {
            grid = [];
            var gridRow;

            for (var i = 0; i < height; i++) {
                gridRow = new Array(width).fill(0);
                grid.push(gridRow);
            }
        },

        getCurrentGrid: function() {
            return grid;
        },

        // testing function for displaying current grid
        showCurrentGrid: function() {
            console.log(grid);
        },

        calculateScore: function() {},

        initScore: function() {
            score = 0;
        },

        getScore: function() {
            return score;
        },

        newTileVal: function() {
            // chances of tile 2 is 9 out of 10 times
            var tileVals, tileVal, pos;

            tileVals = [2, 2, 2, 4, 2, 2, 2, 2, 2, 2];
            pos = Math.floor(Math.random() * 10);
            tileVal = tileVals[pos];

            return tileVal;
        },

        getEmptyLocations: function(currentGrid) {
            var emptyLocations, emptyLocation;

            emptyLocations = [];

            height = currentGrid.length;
            width = currentGrid[0].length;

            for (var i = 0; i < height; i++) {
                for (var j = 0; j < width; j++) {
                    if (currentGrid[i][j] === 0) {
                        emptyLocation = [i, j]; // row, column
                        emptyLocations.push(emptyLocation);
                    }
                }
            }

            return emptyLocations;
        },

        checkGameOver: function(emptyLocations) {
            var gameOver;

            gameOver = false;

            if (emptyLocations.length === 0) {
                gameOver = true;
            }

            return gameOver;
        },

        newTileLocation: function(emptyLocations) {
            var length, pos, tileLocation;

            length = emptyLocations.length;
            pos = Math.floor(Math.random() * length);
            tileLocation = emptyLocations[pos];

            return tileLocation;
        },

        updateGrid: function(tileVal, tileLocation) {
            var row, col;
            row = tileLocation[0];
            col = tileLocation[1];
            grid[row][col] = tileVal;
        }
    };
})();

// UI Controller

var uiController = (function() {
    // Code goes here
    var DOMStrings = {
        tile: "#tile-",
        scoreBox: "#score",
        scoreClass: "value-",
        newGame: "#new-game"
    };

    var findClassIfExists = function(classes, classToFind) {
        // console.log(classes);
        var foundClass = "";
        classes.forEach(function(element) {
            if (element.includes(classToFind)) {
                // console.log(element);
                foundClass = element.toString();
            }
        });

        return foundClass;
    };

    // var removeClassIfExists = function(domObject, classToRemove) {
    //     if (classToRemove !== "") {
    //         domObject.classList.remove(classToRemove);
    //     }
    // };

    return {
        DOMStrings: DOMStrings,

        displayGrid: function(currentGrid) {
            var height, width;

            height = currentGrid.length;
            width = currentGrid[0].length;

            for (var i = 0; i < height; i++) {
                for (var j = 0; j < width; j++) {
                    // innertext of the tile
                    // get value of the existing tile
                    // if not zero
                    // then remove the value class
                    // add the new value class
                    var tileVal = currentGrid[i][j];
                    var tileLocation = [i, j];
                    this.placeNewTile(tileVal, tileLocation);
                }
            }
        },

        displayScore: function(currentScore) {
            document.querySelector(DOMStrings.scoreBox).innerText =
                "SCORE: " + currentScore.toString();
        },

        placeNewTile: function(tileVal, tileLocation) {
            // console.log(tileLocation);
            var newTileId = DOMStrings.tile;

            var newScoreClass = DOMStrings.scoreClass + tileVal.toString();

            tileLocation.forEach(function(cur) {
                newTileId += cur.toString();
            });

            var newTile = document.querySelector(newTileId);

            newTile.classList.remove("animated", "bounceInDown");

            var classes = newTile.classList;
            var valueClass = "";

            valueClass = findClassIfExists(classes, "value");

            console.log(valueClass);

            if (valueClass !== "") {
                newTile.classList.remove(valueClass);
            }

            if (tileVal !== 0) {
                newTile.classList.add(newScoreClass);
                newTile.innerText = tileVal.toString();

                newTile.classList.add("animated", "bounceInDown");
            } else {
                newTile.innerText = "";
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
        dataCtrl.initGrid(4, 4);

        // show the grid for testing
        dataCtrl.showCurrentGrid();

        // display grid
        uiCtrl.displayGrid(dataCtrl.getCurrentGrid());

        // set the score to 0
        dataCtrl.initScore();

        // console.log(dataCtrl.getScore());

        // update the score on the UI
        uiCtrl.displayScore(dataCtrl.getScore());

        // new tile
        newTile();
        // newTile();
        // newTile();
        // newTile();

        setUpEventListeners();
    };

    var setUpEventListeners = function() {
        document.querySelector(DOM.newGame).addEventListener("click", init);
    };

    var newTile = function() {
        var currentGrid, emptyLocations, gameOver, tileVal;

        currentGrid = dataCtrl.getCurrentGrid();
        // console.log(currentGrid);
        emptyLocations = dataCtrl.getEmptyLocations(currentGrid);
        gameOver = dataCtrl.checkGameOver(emptyLocations);

        if (!gameOver) {
            tileVal = dataCtrl.newTileVal();

            var tileLocation;
            tileLocation = dataCtrl.newTileLocation(emptyLocations);

            uiCtrl.placeNewTile(tileVal, tileLocation);

            dataCtrl.updateGrid(tileVal, tileLocation);
        }
    };

    return {
        init: init
    };
})(dataController, uiController);

controller.init();
