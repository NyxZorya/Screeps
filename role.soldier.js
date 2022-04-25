var rangeFinder = require('helper.rangefinder');

var roleSoldier = {

    /** @param {Creep} creep **/
    run: function(creep) 
    {
        const target = rangeFinder.findNearestEnemy(creep);
        
        if(!target) 
        {
            creep.moveTo(Game.flags[creep.memory.location]);
        }
        else 
        {
            if(creep.rangedAttack(target) == ERR_NOT_IN_RANGE) 
            {
                creep.moveTo(target);
            }
        }
	}
	
};

module.exports = roleSoldier;