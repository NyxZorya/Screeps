var rangeFinder = require('helper.rangefinder');
var repairer = require('role.repairer');

var roleBuilder = 
{

    /** @param {Creep} creep **/
    run: function(creep) {
        
        const buildTarget = rangeFinder.findMostRecentConstructionProject(creep);
        const energyTarget = rangeFinder.findDroppedEnergy(creep);

        if(creep.ticksToLive < 50) 
        {
            creep.suicide();
        }
        else if(!buildTarget) 
        {
            repairer.run(creep);
        }
        else 
        {
            if(!creep.memory.building) 
            {
                // Harvest
                if(creep.pickup(energyTarget) == ERR_NOT_IN_RANGE) 
                {
                    creep.moveTo(energyTarget);
                }
                
                if(creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0) 
                {
                    creep.memory.building = true;
                }
            }
            else 
            {
                if(creep.build(buildTarget) == ERR_NOT_IN_RANGE) 
                {
                    creep.moveTo(buildTarget, {visualizePathStyle: {stroke: '#ffffff'}});
                }
                
                if(creep.store.getUsedCapacity(RESOURCE_ENERGY) == 0) 
                {
                    creep.memory.building = false;
                }
            }
        }
	}
	
};

module.exports = roleBuilder;