
//list of perimeter plots that go clockwise around the grid
let perimeterPlots = [1, 2, 3, 4, 5, 10, 15, 20, 25, 24, 23, 22, 21, 16, 11, 6]
let activePerimeterPlot = 0
let turn = 0
const mapping = { 1: 'tomatoes', 2: 'corn', 3: 'lettuce', 4: 'blueberries', 5: 'eggplants', 6: 'wildcard' }

$(document).ready(function () {

    let lastPlantClicked = ''
    let plantCounter = 0
    let gameState = 'planting'

    //updates plant
    $('body').on('click', '.plants', function () {
        lastPlantClicked = $(this).attr('id');

        $('#lastSelected').html(lastPlantClicked);
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
            $('#lastSelected').html(lastPlantClicked)
            plantCounter += 1

            if (plantCounter >= 25) {
                gameState = 'infecting'

                let nextTurnButton = $('<button>')
                nextTurnButton.attr('type', 'button')
                nextTurnButton.attr('id', 'infectionBtn')
                nextTurnButton.addClass('btn')
                nextTurnButton.addClass('btn-primary')
                nextTurnButton.html('Next Turn')
                $('#infectionStatus').append(nextTurnButton)
            }
        }
    })

    $('body').on('click', '#infectionBtn', function () {
        var rand = 1 + Math.floor(Math.random() * 6);
        $('#diceRoll').html(rand)

        infection(turn)

    })

})

function infection(passedTurn) {

    turn += 1

    var rand = 1 + Math.floor(Math.random() * 6);
    $('#diceRoll').html(mapping[rand])
    state = activePerimeterPlot + passedTurn
    activePlot = '#plot' + perimeterPlots[state]

    if (passedTurn > 0) {
        lastPlot = '#plot' + perimeterPlots[state - 1]
        $(lastPlot).removeClass('active')
    }

    $(activePlot).addClass('active')

    //checks dice roll against the current active plot
    if (mapping[rand] === $(activePlot).attr('data') || mapping[rand] === 'wildcard') {
        $(activePlot).removeClass($(activePlot).attr('data'))
        $(activePlot).addClass('infected')
        $(activePlot).attr('infected', 'true')
        spread($(activePlot).attr('id'))
    }
}


function spread(infectedDivID) {

    let listOfhits = []
    listOfhits.push(infectedDivID)

    for (h = 0; h < listOfhits.length; h++) {

        let infectedDivname = '#' + listOfhits[h]
        let xValueOfInfected = $(infectedDivname).attr('x')
        let yValueOfInfected = $(infectedDivname).attr('y')

        for (i = -1; i < 2; i++) {

            let yValueofadjacent = parseInt(yValueOfInfected) + i

            for (j = -1; j < 2; j++) {

                let xValueofAdjacent = parseInt(xValueOfInfected) + j
                let attributeLookUp = '[x=' + xValueofAdjacent + '][y=' + yValueofadjacent + ']'

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