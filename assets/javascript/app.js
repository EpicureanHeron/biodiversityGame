$(document).ready(function () {

    lastPlantClicked = ''
    plantCounter = 0
    gameState = 'planting'
    $('body').on('click', '.plants', function () {
        lastPlantClicked = $(this).attr('id');

        $('#lastSelected').html(lastPlantClicked);
    })
    $('body').on('click', '.box', function () {
        box = $(this).attr('id');
        planted = $(this).attr('data');
        console.log(box)
        console.log(planted)
        if ($(this).attr('data') === 'none') {
            $(this).attr('data', lastPlantClicked)
            $(this).addClass(lastPlantClicked)
            $('#lastSelected').html(lastPlantClicked)
            plantCounter += 1
            console.log(plantCounter)
            if (plantCounter >= 25) {
                gameState = 'infecting'
                console.log(gameState)
            }
        }



    })


})