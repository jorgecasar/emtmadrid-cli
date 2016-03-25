/* list commander component
 * To use add require('../cmds/list.js')(program) to your commander.js based node executable before program.parse
 */
'use strict';

var EMTMadridQuestions = require('../config/EMTMadridQuestions');

module.exports = function(program) {

  function _list(cmd) {
    var methods = Object.keys(EMTMadridQuestions);
    if (cmd.list) {
      console.log('  ' + methods.join('\n  '));
    } else {
      console.log(methods.join('\t'));
    }
  }

  program
    .command('list')
    .option('-l, --list', 'Display as vertical list')
    .version('0.1.0')
    .description('Show the EMT Service methods')
    .action(_list);

};
