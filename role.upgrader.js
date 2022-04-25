var rangeFinder = require('helper.rangefinder');

var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) 
    {

        const activeEnergySource = rangeFinder.findDroppedEnergy(creep);
        const roomController = rangeFinder.findController();
        
        if(creep.memory.upgrading) 
        {   
            if(creep.upgradeController(roomController) == ERR_NOT_IN_RANGE) 
            {
                creep.moveTo(roomController);
            }
            
            if(creep.store.getUsedCapacity(RESOURCE_ENERGY) == 0) 
            {
                creep.memory.upgrading = false;
            }
        }
        else 
        {
            if(creep.pickup(activeEnergySource) == ERR_NOT_IN_RANGE) 
            {
                creep.moveTo(activeEnergySource);
            }
            
            if(creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0) 
            {
                creep.memory.upgrading = true;
            }
        }
        
    }
};

module.exports = roleUpgrader;