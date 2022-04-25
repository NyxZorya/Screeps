var HOMEBASE = require(constants.homeroom);

var GAMEPHASE = 
{
    
    stage: function() 
    {
        if(HOMEBASE.spawn().level >= 1 && HOMEBASE.spawn().level <= 3) 
        {
            // Early
            return "E";
        }
        else if(HOMEBASE.spawn().level >= 4 && HOMEBASE.spawn().level <= 6) 
        {
            // Middle
            return "M";
        }
        else
        {
            // Late
            return "L";
        }
    },

    energyEval: function() 
    {
        var totalEnergyCapacity = Game.rooms[HOMEBASE.room()].energyCapacityAvailable();

        console.log("Total Energy Capacity: " + totalEnergyCapacity);
    }
    
};

module.exports = GAMEPHASE;