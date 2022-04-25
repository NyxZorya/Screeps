var systemManagement =
{
    
    clearMemory: function() 
    {
        for(var name in Memory.creeps)
        {
            if(!Game.creeps[name]) 
            {
                delete Memory.creeps[name];

                console.log("Purging Creep from Memory: " + name);
            }
        }
    }

}

module.exports = systemManagement;