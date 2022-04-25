var rangeFinder = require('helper.rangefinder');
var HOMEROOM = require('constants.homeroom');

var roleTower = {

    /** @param {Tower} tower **/
    run: function(tower) 
    {
        const TARGET = rangeFinder.findNearestEnemy(tower);
        
        if(!TARGET) 
        {
            HOMEROOM.getSpawn().memory.invaded = false;

            //tower.repair(rangeFinder.findNextStructureToRepair(tower));
        }
        else 
        {
            HOMEROOM.getSpawn().memory.invaded = true;

            tower.attack(TARGET);
        }
	}
	
};

module.exports = roleTower;