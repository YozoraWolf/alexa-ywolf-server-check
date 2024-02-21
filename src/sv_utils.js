// Util
const Alexa = require('ask-sdk-core');
const ServerStatus = require('@enums/ServerStatus');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const servers = require('@data/servers.json');

const filterOutGrepLines = (stdout) => {
    return stdout.split('\n').filter(line =>
        !line.includes('grep') &&
        !line.includes('SCREEN') &&
        line.length > 0);
}

// Check if there's a screen with the same name as the server
const doesScreenExist = async (server) => {
    try {
        // Check if there's a screen with the same name as the server.
        // Note: Added cat since grep returns a non-zero exit code if no match is found.
        const { stdout, stderr } = await exec(`screen -ls | grep '${server}' | cat`);
        const screenNo = stdout.length === 0 ? 0 : stdout.split('\n').length;
        return screenNo > 0 ? true : false;
    } catch (error) {
        console.error(error);
        return true;
    }
};


// Get server from Alexa slot
const getServer = (slot) => {
    return servers[Alexa.getSlotValue(slot.requestEnvelope, 'server').toUpperCase()];
}

// Start a server with it's own screen
const startServer = async (sv) => {
    try {
        // Check if there are any screens running under the same name and if process is running.
        if ((await doesScreenExist(sv.name)) && (await isServerRunning(sv.proc_name))) {
            return ServerStatus.IS_ON;
        };

        // TODO: Find out why screens are not getting created. 
        const { stdout, stderr } = await exec(`screen -dmS ${sv.name} ${sv.location}`);
        return (await isServerRunning(sv.proc_name) === ServerStatus.RUNNING) ? ServerStatus.RUNNING : ServerStatus.ERROR;
    } catch (error) {
        console.error(error);
        return ServerStatus.ERROR;
    }
}

// Stop a server and quit it's screen
const stopServer = async (sv) => {
    try {
        // Check if there are any screens running under the same name and if process is running.
        if (!(await doesScreenExist(sv.name)) && (await isServerRunning(sv.proc_name) === ServerStatus.OFF)) {
            return ServerStatus.IS_OFF;
        };
        const { stdout, stderr } = await exec(`screen -X -S ${sv.name} quit`);
        return await isServerRunning(sv.proc_name) === ServerStatus.OFF ? ServerStatus.OFF : ServerStatus.ERROR;
    } catch (error) {
        console.error(error);
        return ServerStatus.ERROR;
    }
}

// Check if server is running by checking its proccess.
const isServerRunning = async (server) => {
    try {
        console.log(`ps aux | grep '${server}' | cat`);
        // Sanatizing not needed as we are using a predefined list of servers.
        // Note: Added cat since grep returns a non-zero exit code if no match is found.
        const { stdout, stderr } = await exec(`ps aux | grep '${server}' | cat`);
        // Filter out grep and empty lines,
        // If there are any lines in the stdout then the server is running, else not.
        return filterOutGrepLines(stdout).length > 0 ? ServerStatus.RUNNING : ServerStatus.OFF;
    } catch (error) {
        console.error(error);
        return ServerStatus.ERROR;
    }
};

module.exports = {
    startServer,
    stopServer,
    getServer,
    filterOutGrepLines,
    isServerRunning
}