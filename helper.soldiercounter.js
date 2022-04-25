var HOMEROOM = require('constants.homeroom');

var helperSoldierCounter = 
{
    
    countSoldiersAtFlags: function() 
    {
        var creeps = Game.creeps;

        var numOfSoldiers = 2;

        if(HOMEROOM.getSpawn().memory.invaded) 
        {
            numOfSoldiers = 5;
        }
        
        for(var name in Game.flags) 
        {
            var assignedSoldiers = 0;
            var flagName = name;
            
            for(var name in creeps) 
            {
                if(Game.creeps[name].memory.location == flagName) 
                {
                    assignedSoldiers = assignedSoldiers + 1;
                }
            }
            
            if(assignedSoldiers < numOfSoldiers) 
            {
                return flagName;
            }
        }
        
        return "nospawn";
    }
    
};

module.exports = helperSoldierCounter;