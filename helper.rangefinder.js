var HOMEROOM = require('constants.homeroom');

var helperRangeFinder = 
{
    
    findBase: function() 
    {
        return HOMEROOM.getSpawn();
    },

    findController: function() 
    {
        return HOMEROOM.getController();
    },

    findNearestEnergyResource: function(creep) 
    {
        return creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
    },
    
    findMostRecentConstructionProject: function(creep) 
    {
        return creep.room.find(FIND_CONSTRUCTION_SITES)[0];
    },
    
    findNearestEnemy: function(creep) 
    {
        return creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    },
    
    findNearestEnergyResourceToBase: function() 
    {
        return Game.spawns[HOMEROOM.getSpawn()].findClosestByPath(FIND_SOURCES_ACTIVE);
    },
    
    findActiveEnergySource: function(creep) 
    {
        return creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
    },
    
    findNearestSpawn: function(creep) 
    {
        return creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (structure) => 
            {
                return (structure.structureType == STRUCTURE_SPAWN);
            }
        });
    },

    findDroppedEnergy: function(creep) 
    {
        return creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
    },
    
    findNextStructureToRepair: function(creep)
    {
        return creep.room.find(FIND_STRUCTURES, 
        {
            filter: object => object.hits < 2500
        })[0];
    },
    
    findNextContainerToRepair: function(creep) 
    {
        return creep.room.find(FIND_STRUCTURES, {
           filter: (structure) => 
           {
                return (structure.structureType == STRUCTURE_CONTAINER) &&
                structure.hits < 50000;
           } 
        })[0];
    },
    
    findNextWallToRepair: function(creep) 
    {
        return creep.room.find(FIND_STRUCTURES, {
           filter: (structure) => 
           {
                return (structure.structureType == STRUCTURE_WALL) &&
                structure.hits < 2500;
           } 
        })[0];
    },
    
    findNextRoadToRepair: function(creep) 
    {
        return creep.room.find(FIND_STRUCTURES, {
           filter: (structure) => 
           {
                return (structure.structureType == STRUCTURE_ROAD) &&
                structure.hits < 2500;
           } 
        })[0];
    },
    
    findHomeSpawn: function() 
    {
        return HOMEROOM.getSpawn();
    },
    
    findNearestController: function(creep)
    {
        return creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (structure) => 
            {
                return (structure.structureType == STRUCTURE_CONTROLLER);
            }
        });
    },
    
    findNearestControllerToBase: function() 
    {
        return HOMEROOM.getSpawn().findClosestByPath(FIND_STRUCTURES, {
            filter: (structure) => 
            {
                return (structure.structureType == STRUCTURE_CONTROLLER);
            }
        });
    }
    
};

module.exports = helperRangeFinder;