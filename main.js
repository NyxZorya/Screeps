var roleSpawn = require('role.spawn');
var creeps = require('helper.creeprunner');
var systemManagement = require('system.management');
var HOMEROOM = require('constants.homeroom');

module.exports.loop = function () 
{

    roleSpawn.fillEmptyRoles();

    creeps.run();

    systemManagement.clearMemory();

    if(HOMEROOM.getSpawn().hits < 1000) 
    {
        HOMEROOM.getController().activateSafeMode();
    }

}