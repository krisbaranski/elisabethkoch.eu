const os = require("os");

const numCPUs = os.cpus().length;
console.log(`Number of available CPU cores: ${numCPUs}`);
