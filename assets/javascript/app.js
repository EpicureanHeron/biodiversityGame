$(document).ready(function() {

    lastPlantClicked = ''
    $('body').on('click', '.plants', function () {
        lastPlantClicked = $(this).attr('id');
       console.log(lastPlantClicked)

    })
    $('body').on('click', '.box', function () {
        box = $(this).attr('id');
        planted = $(this).attr('data');
        console.log(box)
        console.log(planted)
        if($(this).attr('data') === 'none'){
            $(this).attr('data', lastPlantClicked) 
        }


    })
    

})