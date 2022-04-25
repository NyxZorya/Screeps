var rangeFinder = require('helper.rangefinder');

var roleRepairer = 
{

    /** @param {Creep} creep **/
    run: function(creep) 
    {
        var containerTarget = rangeFinder.findNextContainerToRepair(creep);
        var wallTarget = rangeFinder.findNextWallToRepair(creep);
        var roadTarget = rangeFinder.findNextRoadToRepair(creep);
        var energyTarget = rangeFinder.findDroppedEnergy(creep);
        
        if(creep.memory.repairing) 
        {
            if(containerTarget) 
            {
                if(creep.repair(containerTarget) == ERR_NOT_IN_RANGE) 
                {
                    creep.moveTo(containerTarget);
                }
            }
            else if(wallTarget) 
            {
                if(creep.repair(wallTarget) == ERR_NOT_IN_RANGE) 
                {
                    creep.moveTo(wallTarget);
                }
            }
            else if(roadTarget) 
            {
                if(creep.repair(roadTarget) == ERR_NOT_IN_RANGE) 
                {
                    creep.moveTo(roadTarget);
                }
            }
            
            if(creep.store.getUsedCapacity(RESOURCE_ENERGY) == 0) 
            {
                creep.memory.repairing = false;
            }
        }
        else 
        {
            if(creep.pickup(energyTarget) == ERR_NOT_IN_RANGE) 
            {
                creep.moveTo(energyTarget);
            }

            if(creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0) 
            {
                creep.memory.repairing = true;
            }
        }
	}
	
};

module.exports = roleRepairer;