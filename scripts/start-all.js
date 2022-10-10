process.argv.push("start");
process.argv.push("--watch");
require("../node_modules/@nestjs/cli/bin/nest");
require("./start");