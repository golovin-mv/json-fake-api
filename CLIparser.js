const program = require('commander');


program
    .version('1.0.0')
    .usage('[options] <file ...>')
    .option('-p, --proxy <url>', 'Add remote address')
    .option('-P, --port <n>', 'Set port', parseInt)
    .parse(process.argv);

module.exports = program;
