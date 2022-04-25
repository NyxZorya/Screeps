var HOMEROOM = 
{
    
    getName: function() 
    {
        return "W58N9";
    },

    getSpawn: function() 
    {
        return Game.rooms[this.getName()].find(FIND_MY_SPAWNS)[0];
    },

    getController: function() 
    {
        return Game.rooms[this.getName()].controller;
    },

    getTower: function()
    {
        return this.getSpawn().room.find(FIND_MY_STRUCTURES, {
            filter: (structure) =>
            {
                return (structure.structureType == STRUCTURE_TOWER);
            }
        })[0];
    },

    getExtensions: function() 
    {
        return this.getSpawn().room.find(FIND_MY_STRUCTURES, {
            filter: (structure) =>
            {
                return (structure.structureType == STRUCTURE_EXTENSION);
            }
        });
    },
    
    getNextUnfilledExtension: function() 
    {
        return this.getSpawn().room.find(FIND_MY_STRUCTURES, {
            filter: (structure) =>
            {
                return (structure.structureType == STRUCTURE_EXTENSION
                && structure.store.getFreeCapacity(RESOURCE_ENERGY) != 0);
            }
        })[0];
    },

    getContainers: function() 
    {
        return Game.rooms[this.getName()].find(FIND_STRUCTURES, {
            filter: (structure) => structure.structureType == STRUCTURE_CONTAINER
        });
    },
    
    findNextUnfilledContainer: function() 
    {
        return Game.rooms[this.getName()].find(FIND_STRUCTURES, {
            filter: (structure) => structure.structureType == STRUCTURE_CONTAINER
                                && structure.store.getFreeCapacity(RESOURCE_ENERGY) != 0
        })[0];
    },

    getEnergySource: function(index) 
    {
        return this.getSpawn().room.find(FIND_SOURCES_ACTIVE)[index];
    }
    
};

module.exports = HOMEROOM;