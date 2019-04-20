
//list of perimeter plots that go clockwise around the grid
let perimeterPlots = [1, 2, 3, 4, 5, 10, 15, 20, 25, 24, 23, 22, 21, 16, 11, 6]
let activePerimeterPlot = 0
let turn = 0
const mapping = { 1: 'tomatoes', 2: 'corn', 3: 'lettuce', 4: 'blueberries', 5: 'eggplants', 6: 'wildcard' }
let gameState = 'planting'

$(document).ready(function () {

    let lastPlantClicked = ''
    let plantCounter = 0


    //updates plant
    $('body').on('click', '.plants', function () {
        lastPlantClicked = $(this).attr('id');

        $('#lastSelected').html('Active Crop: ' + lastPlantClicked);
    })

    //updates state of plot
    $('body').on('click', '.box', function () {
        let box = $(this).attr('id');
        let planted = $(this).attr('data');
        console.log(box)
        console.log(planted)
        if ($(this).attr('data') === 'none' && (lastPlantClicked !== '')) {
            $(this).attr('data', lastPlantClicked)
            $(this).addClass(lastPlantClicked)
          //  $('#lastSelected').html(lastPlantClicked)
            plantCounter += 1

            // after all plots are filled, create the infection button
            //and add it to the screen
            if (plantCounter >= 25) {
                gameState = 'infecting'
                $('#plantSelection').empty()
                let nextTurnButton = $('<button>')
                nextTurnButton.attr('type', 'button')
                nextTurnButton.attr('id', 'infectionBtn')
                nextTurnButton.addClass('btn')
                nextTurnButton.addClass('btn-primary')
                nextTurnButton.html('Infect!')
                $('#plantSelection').append(nextTurnButton)
            }
        }
    })

    //logic for the infectionBtn
    $('body').on('click', '#infectionBtn', function () {
        var rand = 1 + Math.floor(Math.random() * 6);
        $('#diceRoll').html(rand)

        infection(turn)

    })

})

function infection(passedTurn) {
    turn += 1
    //dice roll logic, grabs the veggie type in the mapping established outside of this function

    var rand = 1 + Math.floor(Math.random() * 6);
    $('#diceRoll').html('Infection: ' + mapping[rand])

    state = activePerimeterPlot + passedTurn
    //logic to go around the perimeter, this is hardcoded in the perimeterPlot list
    //but probably could be done dynamically if I was more clever
    activePlot = '#plot' + perimeterPlots[state]
    $('#lastSelected').html('Active Plot: ' + $(activePlot).attr('data'))
    // removes the active marker from the last plot
    if (passedTurn > 0) {
        lastPlot = '#plot' + perimeterPlots[state - 1]
        $(lastPlot).removeClass('active')
    }
    //gives the active plot the active class
    $(activePlot).addClass('active')

    //checks dice roll against the current active plot
    if (mapping[rand] === $(activePlot).attr('data') || mapping[rand] === 'wildcard') {
        $(activePlot).removeClass($(activePlot).attr('data'))
        $(activePlot).addClass('infected')
        $(activePlot).attr('infected', 'true')

        //kicks off spreading logic
        spread($(activePlot).attr('id'))
    }
}

//spreading looks at adjacent tiles to see if they match the vegetable type if it is
//infecting
function spread(infectedDivID) {
    //This list enables the spreading logic
    let listOfhits = []
    listOfhits.push(infectedDivID)
    //the for loop starts with only 1 div ID in it, but as positive results come in
    //they are added to the for loop, so the double nested for loops can run their own check
    //for each positive result
    for (h = 0; h < listOfhits.length; h++) {
        //get the necessary data from the div, specifically the x and y values
        let infectedDivname = '#' + listOfhits[h]
        let xValueOfInfected = $(infectedDivname).attr('x')
        let yValueOfInfected = $(infectedDivname).attr('y')
        //setting up the y values for one lower, on the same y, and one above
        //that is why i starts with -1 and goes to positive 1
        for (i = -1; i < 2; i++) {
            //calculates the offset based on the y value on the div
            let yValueofadjacent = parseInt(yValueOfInfected) + i
            //same logic for the y values, but the offset for the x values
            for (j = -1; j < 2; j++) {
                //calculates the x offset
                let xValueofAdjacent = parseInt(xValueOfInfected) + j
                //creates the x y look up based on the offset values
                let attributeLookUp = '[x=' + xValueofAdjacent + '][y=' + yValueofadjacent + ']'
                // checks the data (vegetables) of the adjacent against the div in the list of hits
                // if its true, the vegetable class is removed and it becomes infected
                // and is added to the "listOFhits" to run through the above logic to see if 
                // any of its adjacent tiles match it in veggie type
                if ($(attributeLookUp).attr('data') === $(infectedDivname).attr('data') && $(attributeLookUp).attr('infected') === 'false') {
                    $(attributeLookUp).removeClass($(infectedDivname).attr('data'))
                    $(attributeLookUp).addClass('infected')
                    $(attributeLookUp).attr('infected', 'true')
                    listOfhits.push($(attributeLookUp).attr('id'))
                }
            }
        }
    }
}