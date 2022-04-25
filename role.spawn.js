var soldierCounter = require('helper.soldiercounter');
var energyManager = require('manager.energy');
var HOMEROOM = require('constants.homeroom');

var roleSpawn =
{

    fillEmptyRoles: function() 
    {
        var energyReserve = Game.rooms[HOMEROOM.getName()].energyAvailable;
        
        var timeName = Game.time.toString().substring(Game.time.toString().length - 4, Game.time.toString().length - 1);

        var harvesterCount  = _(Game.creeps).filter( { memory: { role: 'harvester' } } ).size();
        var upgraderCount   = _(Game.creeps).filter( { memory: { role: 'upgrader' } } ).size();
        var soldierCount    = _(Game.creeps).filter( { memory: { role: 'soldier' } } ).size();
        var builderCount    = _(Game.creeps).filter( { memory: { role: 'builder' } } ).size();
        var repairerCount   = _(Game.creeps).filter( { memory: { role: 'repairer' } } ).size();
        var muleCount       = _(Game.creeps).filter( { memory: { role: 'mule' } } ).size();

        if(HOMEROOM.getSpawn().memory.invaded) 
        {
            if((Game.time % 25 == 0) && (energyReserve >= 400)) 
            {
                console.log("Determining what to spawn ...");

                if(soldierCount < 10) 
                {
                    var guardLocation = soldierCounter.countSoldiersAtFlags();
                        
                    if(guardLocation != "nospawn") 
                    {
                        console.log("Spawning soldier");
                        HOMEROOM.getSpawn().spawnCreep([RANGED_ATTACK,RANGED_ATTACK,MOVE,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH], "S" + timeName, {memory: {role: 'soldier', location: guardLocation}});
                    }
                }
                else if(harvesterCount < 2) 
                {
                    console.log("Spawning harvester");

                    var energyLocation = energyManager.nextAvailableEnergySource();

                    HOMEROOM.getSpawn().spawnCreep([WORK,WORK,WORK,CARRY,MOVE], "H" + timeName, {memory: {role: 'harvester', unloading: "false", source: energyLocation}});
                }
                else if(muleCount < 4) 
                {
                    console.log("Spawning mule");
                    HOMEROOM.getSpawn().spawnCreep([WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], "M" + timeName, {memory: {role: 'mule', muling: "false"}}); 
                }
                else 
                {
                    console.log("No creep to spawn");
                }
            }
        }
        else 
        {
            if((Game.time % 50 == 0) && (energyReserve >= 400)) 
            {
                console.log("Determining what to spawn ...");

                if(harvesterCount < 3) 
                {
                    console.log("Spawning harvester");

                    var energyLocation = energyManager.nextAvailableEnergySource();

                    HOMEROOM.getSpawn().spawnCreep([WORK,WORK,WORK,CARRY,MOVE], "H" + timeName, {memory: {role: 'harvester', unloading: "false", source: energyLocation}});
                }
                else if(muleCount < 3) 
                {
                    console.log("Spawning mule");
                    HOMEROOM.getSpawn().spawnCreep([WORK,CARRY,CARRY,MOVE,MOVE], "M" + timeName, {memory: {role: 'mule', muling: "false"}});
                }
                else if(upgraderCount < 4) 
                {
                    console.log("Spawning upgrader");
                    HOMEROOM.getSpawn().spawnCreep([WORK,WORK,CARRY,CARRY,MOVE], "U" + timeName, {memory: {role: 'upgrader', upgrading: "false"}});
                }
                else if(repairerCount < 2) 
                {
                    console.log("Spawning repairer");
                    HOMEROOM.getSpawn().spawnCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], "R" + timeName, {memory: {role: 'repairer', repairing: false}});
                }
                else if(soldierCount < 4) 
                {
                    var guardLocation = soldierCounter.countSoldiersAtFlags();
                        
                    if(guardLocation != "nospawn") 
                    {
                        console.log("Spawning soldier");
                        HOMEROOM.getSpawn().spawnCreep([RANGED_ATTACK,MOVE,TOUGH,TOUGH], "S" + timeName, {memory: {role: 'soldier', location: guardLocation}});
                    }
                }
                else if(builderCount < 2) 
                {
                    console.log("Spawning builder");
                    HOMEROOM.getSpawn().spawnCreep([WORK,WORK,CARRY,CARRY,CARRY,MOVE], "B" + timeName, {memory: {role: 'builder'}}); 
                }
                else 
                {
                    console.log("No creep to spawn");
                }
            }
        }
    }

}

module.exports = roleSpawn;