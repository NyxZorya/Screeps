var rangeFinder = require('helper.rangefinder');
var HOMEROOM = require('constants.homeroom');

var roleMule = {

    /** @param {Creep} creep **/
    run: function(creep) 
    {

        if(creep.memory.role == 'harvester' && !creep.memory.muling) 
        {
            creep.memory.taskToComplete = 'spawn';
            creep.memory.muling = true;
        }
        else if(!creep.memory.taskToComplete) 
        {
            creep.memory = {role: 'mule', muling: true, taskToComplete: 'spawn'};
        }

        const energyTarget = rangeFinder.findDroppedEnergy(creep);
        const spawn = HOMEROOM.getSpawn();
        const tower = HOMEROOM.getTower();
        
        if(creep.memory.muling) 
        {
            switch(creep.memory.taskToComplete) 
            {
                case 'spawn':
                    this.spawnTask(creep);
                    break;
                case 'extension':
                    this.extensionTask(creep);
                    break;
                case 'container':
                    this.containerTask(creep);
                    break;
                case 'tower':
                    this.towerTask(creep);
                    break;
                case 'controller':
                    this.controllerTask(creep);
                    break;
                default:
                    console.log("Unknown Task: " + creep.memory.taskToComplete);
            }

            if(creep.store.getUsedCapacity(RESOURCE_ENERGY) == 0) 
            {
                creep.memory.muling = false;
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
                creep.memory.muling = true;
            }
        }
        
    },

    spawnTask: function(creep) 
    {
        const spawn = HOMEROOM.getSpawn();

        if(spawn.store.getFreeCapacity(RESOURCE_ENERGY) != 0) 
        {
            if(creep.transfer(spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) 
            {
                creep.moveTo(spawn);
            }
        }
        else 
        {
            if(HOMEROOM.getSpawn().memory.invaded) 
            {
                creep.say("⚡Tower");
                creep.memory.taskToComplete = 'tower';
            }
            else 
            {
                creep.say("Extensions");
                creep.memory.taskToComplete = 'extension';
            }
        }
    },

    extensionTask: function(creep) 
    {
        const EXTENSION = HOMEROOM.getNextUnfilledExtension();
        
        if(!EXTENSION) 
        {
            creep.say("Containers");
            creep.memory.taskToComplete = "container";
        }
        else 
        {
            if(creep.store.getUsedCapacity(RESOURCE_ENERGY) != 0) 
            {
                if(creep.transfer(EXTENSION, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) 
                {
                    creep.moveTo(EXTENSION);
                }
            }
            else
            {
                creep.say("Spawn");
                creep.memory.taskToComplete = 'spawn';
            }
        }
    },

    containerTask: function(creep) 
    {
        const CONTAINER = HOMEROOM.findNextUnfilledContainer();

        if(!CONTAINER) 
        {
            creep.memory.taskToComplete = "tower";
            creep.say("⚡Tower");
        }
        else 
        {
            if(creep.store.getUsedCapacity(RESOURCE_ENERGY) != 0) 
            {
                if(creep.transfer(CONTAINER, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) 
                {
                    creep.moveTo(CONTAINER);
                }
            }
            else 
            {
                creep.say("Spawn");
                creep.memory.taskToComplete = 'spawn';
            }
        }
    },

    towerTask: function(creep) 
    {
        const TOWER = HOMEROOM.getTower();

        if(!TOWER || TOWER.store.getFreeCapacity(RESOURCE_ENERGY) == 0) 
        {
            creep.memory.taskToComplete = "controller";
            creep.say("⚡Control");
        }
        else 
        {
            if(creep.store.getUsedCapacity(RESOURCE_ENERGY) != 0) 
            {
                if(creep.transfer(TOWER, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                {
                    creep.moveTo(TOWER);
                }
            }
            else 
            {
                creep.say("⚡Spawn");
                creep.memory.taskToComplete = 'spawn';
            }
        }
    },

    controllerTask: function(creep) 
    {
        const controller = HOMEROOM.getController();

        if(creep.store.getUsedCapacity(RESOURCE_ENERGY) != 0) 
        {
            if(creep.transfer(controller, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) 
            {
                creep.moveTo(controller);
            }
        }
        else 
        {
            creep.say("⚡Spawn");
            creep.memory.taskToComplete = 'spawn';
        }
    }

};

module.exports = roleMule;