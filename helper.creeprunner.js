var soldier = require('role.soldier');
var builder = require('role.builder');
var upgrader = require('role.upgrader');
var repairer = require('role.repairer');
var harvester = require('role.harvester');
var mule = require('role.mule');
var tower = require('role.tower');
var HOMEROOM = require('constants.homeroom');

var creepRunner = 
{
    
    run: function() 
    {
        for(var name in Game.creeps) 
        {
            var creep = Game.creeps[name];

            switch(creep.memory.role) 
            {
                case 'harvester':
                    harvester.run(creep);
                    break;
                case 'builder':
                    builder.run(creep);
                    break;
                case 'upgrader':
                    upgrader.run(creep);
                    break;
                case 'soldier':
                    soldier.run(creep);
                    break;
                case 'repairer':
                    repairer.run(creep);
                    break;
                case 'mule':
                    mule.run(creep);
                    break;
                default:
                    console.log("Unknown creep role: " + creep.memory.role);
            }
        }

        tower.run(HOMEROOM.getTower());
    }
    
};

module.exports = creepRunner;