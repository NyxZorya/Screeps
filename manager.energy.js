var managerEnergy = 
{

    nextAvailableEnergySource: function() 
    {
        var actualNumAtSource1 = 0;
        var sourceCap1 = 1;

        for(var name in Game.creeps) 
        {
            var creep = Game.creeps[name];

            if(creep.memory.source == 1) 
            {
                actualNumAtSource1 = actualNumAtSource1 + 1;
            }
        }

        if(actualNumAtSource1 <= sourceCap1) 
        {
            return 1;
        }
        else 
        {
            return 0;
        }
	}
	
};

module.exports = managerEnergy;