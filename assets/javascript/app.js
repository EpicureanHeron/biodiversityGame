
$(window).on('load', function () {
    $('#myModal').modal('show');
});
//list of perimeter plots that go clockwise around the grid
let gameMode
$(document).ready(function () {
    $('body').on('click', '.gameMode', function () {
        gameMode = $(this).attr('data')

    })
})

function gameModeLogic() {
    switch (gameMode) {
        case '1':
            return fiveByFiveRules()

        case '2':
            let result = tenByTenByFiveRules()
            console.log(result)
            return result

        default:
            return True
    }
}

function fiveByFiveRules() {
    let rulesDict = {
        'tomatoes': 0,
        'corn': 0,
        'lettuce': 0,
        'blueberries': 0,
        'eggplants': 0
    }
    for (i = 1; i < 26; i++) {
        let plotToCheck = '#plot' + i
        let cropType = $(plotToCheck).attr('data')
        rulesDict[cropType] += 1
    }
    //takes the last clicked plant, which would be the plant type the user is about to plant
    // and adds it to the count, to see if it would break the
    rulesDict[lastPlantClicked] += 1
    for (var key in rulesDict) {
        if (rulesDict.hasOwnProperty(key)) {
            if (rulesDict[key] === 6 && key !== 'none') {
                console.log('attempting to plant too many ' + key)
                return false

            }
        }

    }
    return true

}

function tenByTenByFiveRules() {

    //logic 

    //first check to see if three different crops have been selected

    //second check to see if the distribution is 10, 10, 5

    let rulesDict = {
        'tomatoes': 0,
        'corn': 0,
        'lettuce': 0,
        'blueberries': 0,
        'eggplants': 0
    }
    // console.log(rulesDict)
    let cropList = []
    let tenSet = []


    for (i = 1; i < 26; i++) {
        let plotToCheck = '#plot' + i
        let cropType = $(plotToCheck).attr('data')
        rulesDict[cropType] += 1
    }

    //extroplates whatever was clicked last
    rulesDict[lastPlantClicked] += 1
    //gathers all that are 5 or more
    for (var key in rulesDict) {
        if (rulesDict.hasOwnProperty(key)) {
            if (rulesDict[key] > 5 && key !== 'none') {
                console.log(key)
                tenSet.push(key)
            }
        }
    }

//iterates over the keys
    for (var key in rulesDict) {
        console.log(key)
        if (rulesDict.hasOwnProperty(key)) {
            //enforces the upper limit of crop types
            if (cropList.length <= 3) {
                //if greater than zero and not 'none' add it to the cropList
                if (key !== 'none' && rulesDict[key] > 0) {
                    cropList.push(key)
                }
            }
            //if it is greater than 3, cannot add it
            else {
                console.log('too many crops')
                return false
            }

            // this block should evaluate if 10/10/5 has been reached.
            // evaluates if this would be the 11th in a set or if we already would have more than 2 sets greater than five
            if ((rulesDict[key] >= 11) || (tenSet.length > 2)) {
                console.log('the 11th or 6th + sets greater than 5')
                return false

            }

        }

    }

    return true
}




let perimeterPlots = [1, 2, 3, 4, 5, 10, 15, 20, 25, 24, 23, 22, 21, 16, 11, 6]
let activePerimeterPlot = 0
let turn = 0
const mapping = { 1: 'tomatoes', 2: 'corn', 3: 'lettuce', 4: 'blueberries', 5: 'eggplants', 6: 'wildcard' }
let gameState = 'planting'
let lastPlantClicked = ''

$(document).ready(function () {

    //updates plant
    $('body').on('click', '.plants', function () {
        console.log(gameMode)
        lastPlantClicked = $(this).attr('id');
        $('#turnCounter').empty()

        $('#lastSelected').html('You are planting ' + lastPlantClicked + '.');
    })

    //updates state of plot
    $('body').on('click', '.box', function () {
        let plantCounter = 0



        //checks to make sure a plant type was selected
        //checks to make sure that game mode logic is being followed
        if (lastPlantClicked !== '' && gameModeLogic()) {
            //if the plot already has been assigned, remove the class (color)
            if ($(this).attr('data') !== 'none') {
                $(this).removeClass($(this).attr('data'))
            }

            //sets the data type to the currently selected planting type
            if (lastPlantClicked !== 'till') {
                $(this).attr('data', lastPlantClicked)
                $(this).addClass(lastPlantClicked)
            }
            else {
                $(this).removeClass($(this).attr('data'))
                $(this).attr('data', 'none')
            }


            for (i = 1; i < 26; i++) {
                let plotToCheck = '#plot' + i
                if ($(plotToCheck).attr('data') !== 'none') {
                    plantCounter += 1
                }

                if (plantCounter === 25) {

                    gameState = 'infecting'
                    $('#plantSelection').empty()
                    // $('#plantSelection').addClass('invisible')
                    $('#plantSelection2').empty()
                    //  $('#plantSelection2').addClass('invisible')
                    $('#lastSelected').html('Selected the Infected button to start the next stage!')
                    let nextTurnButton = $('<button>')
                    nextTurnButton.attr('type', 'button')
                    nextTurnButton.attr('id', 'infectionBtn')
                    nextTurnButton.addClass('btn')
                    nextTurnButton.addClass('btn-primary')
                    nextTurnButton.html('Infect!')
                    $('#plantSelection').append(nextTurnButton)
                }


            }

        }
    })

    //logic for the infectionBtn
    $('body').on('click', '#infectionBtn', function () {

        humanTurn = turn + 1
        $('#turnCounter').html('Turn: ' + humanTurn)
        var rand = 1 + Math.floor(Math.random() * 6);
        $('#diceRoll').html(rand)
        infection(turn)
        if (turn === 16) {

            endGame()
        }

    })

    //resets the game state

    $('body').on('click', '#replayBtn', function () {
        console.log('this worked!')
        $('#plantSelection').empty()
        $('#infectionStatus').empty()
        for (i = 1; i < 26; i++) {

            let plot = '#plot' + i
            if ($(plot).attr('infected') === 'true') {
                $(plot).removeClass('infected')
            }
            if (plot === '#plot6') {
                $(plot).removeClass('active')
            }
            $(plot).removeClass($(plot).attr('data'))
            $(plot).attr('data', 'none')
            $(plot).attr('infected', 'false')
        }

        //could get rid of all of this code by using the classes

        //invisible and visible on the buttons
        for (i = 0; i < 6; i++) {
            button = $('<button>')
            button.addClass('btn')
            button.addClass('plants')

            if (i === 0) {
                button.addClass('btn-danger')
                button.attr('id', 'tomatoes')
                button.html('tomatoes')
                $('#plantSelection').append(button)
            }

            if (i === 1) {
                button.addClass('btn-warning')
                button.attr('id', 'corn')
                button.html('corn')
                $('#plantSelection').append(button)
            }
            if (i == 2) {
                button.addClass('btn-success')
                button.attr('id', 'lettuce')
                button.html('lettuce')
                $('#plantSelection').append(button)
            }
            if (i == 3) {
                button.addClass('btn-primary')
                button.attr('id', 'blueberries')
                button.html('blueberries')
                $('#plantSelection2').append(button)
            }
            if (i == 4) {
                button.addClass('btn-custom')
                button.attr('id', 'eggplants')
                button.html('eggplants')
                $('#plantSelection2').append(button)
            }
            if (i == 5) {
                button.addClass('btn')
                button.attr('id', 'till')
                button.html('Till')
                $('#plantSelection2').append(button)
            }

        }
        turn = 0
        activePerimeterPlot = 0
        gameState = 'planting'

    })

})

function infection(passedTurn) {
    turn += 1
    //dice roll logic, grabs the veggie type in the mapping established outside of this function

    var rand = 1 + Math.floor(Math.random() * 6);
    $('#diceRoll').html('The ' + mapping[rand] + ' virus tries to infect this plot!')

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

function endGame() {
    $('#plantSelection').empty()
    let points = 0
    for (i = 1; i < 26; i++) {
        let plot = '#plot' + i

        if ($(plot).attr('infected') === 'false') {
            points += 1
        }

    }
    $('#turnCounter').html("your final score: " + points)
    $('#plantSelection').empty()


    let replay = $('<button>')
    replay.addClass('btn')
    replay.addClass('btn-primary')
    replay.attr('id', 'replayBtn')
    replay.attr('type', 'button')
    replay.html('Replay?')
    $('#plantSelection').append(replay)



}