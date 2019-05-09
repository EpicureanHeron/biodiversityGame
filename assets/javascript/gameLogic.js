

function gameModeLogic(gameModeVariable) {
    switch (gameModeVariable) {
        case '1':
            return fiveByFiveRules()

        case '2':
            return tenByTenByFiveRules()

        default:
            return true
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

                tenSet.push(key)
            }
        }
    }

    //iterates over the keys
    for (var key in rulesDict) {

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

                return false
            }

            // this block should evaluate if 10/10/5 has been reached.
            // evaluates if this would be the 11th in a set or if we already would have more than 2 sets greater than five
            if ((rulesDict[key] >= 11) || (tenSet.length > 2)) {

                return false

            }

        }

    }

    return true
}

module.exports = {
    gameModeLogic: gameModeLogic,
    tenByTenByFiveRules: tenByTenByFiveRules,
    fiveByFiveRules: fiveByFiveRules

};