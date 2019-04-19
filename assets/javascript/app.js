
//list of perimeter plots that go clockwise around the grid
perimeterPlots = [1,2,3,4,5,10,15,20,25,24,23,22,21,16,11,6]
activePerimeterPlot = 0


$(document).ready(function () {

    lastPlantClicked = ''
    plantCounter = 0
    gameState = 'planting'

    //updates plant
    $('body').on('click', '.plants', function () {
        lastPlantClicked = $(this).attr('id');

        $('#lastSelected').html(lastPlantClicked);
    })

    //updates state of plot
    $('body').on('click', '.box', function () {
        box = $(this).attr('id');
        planted = $(this).attr('data');
        console.log(box)
        console.log(planted)
        if ($(this).attr('data') === 'none' && (lastPlantClicked !== '')) {
            $(this).attr('data', lastPlantClicked)
            $(this).addClass(lastPlantClicked)
            $('#lastSelected').html(lastPlantClicked)
            plantCounter += 1
            console.log(plantCounter)
            if (plantCounter >= 25) {
                gameState = 'infecting'
                console.log(gameState)
                infection()
            }
        }
    })



})

function infection() {

    
    infectionPlot = '#plot' + perimeterPlots[activePerimeterPlot]
    console.log(infectionPlot)
    $(infectionPlot).addClass('infection')

}