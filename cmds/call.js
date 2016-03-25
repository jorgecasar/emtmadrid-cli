/* call commander component
 * To use add require('../cmds/call.js')(program) to your commander.js based node executable before program.parse
 */
'use strict';

var util = require('util');
var inquirer = require('inquirer');

var questions = require('../config/questions');
var EMTMadridQuestions = require('../config/EMTMadridQuestions');
var EMTMadrid = require('../lib/EMTMadrid');


module.exports = function(program) {
  /**
   * Convert inquirer.prompt into a Promise.
   */
  function inquirerPrompt(questionPrompt) {
    return new Promise(function(resolve, reject) {
      inquirer.prompt(questionPrompt, function(answers) {
        resolve(answers);
      })
    });
  };

  /**
   * Chek if idClient and passKey are set or ask for them.
   */
  function checkSetupData() {
    var config = program.config.load();
    var setupQuestions = [];
    if (!config.idClient) setupQuestions.push(questions.idClient);
    if (!config.passKey) setupQuestions.push(questions.passKey);
    return inquirerPrompt(setupQuestions);
  }

  function saveSetupData(setupData) {
    if(setupData.idClient) program.config.set('idClient', setupData.idClient);
    if(setupData.passKey) program.config.set('passKey', setupData.passKey);
    program.config.save();
  }

  /**
   * Create a new instance of EMTMadrid using idClient and passKey.
   *
   * @params setupData Object Data for setup (idClient, pasKey).
   */
  function setupEMTMadrid(setupData) {
    var config = program.config.load();
    return new EMTMadrid(config.idClient, config.passKey)
  }

  /**
   * Check if the method exist in EMTMadrid
   *
   * @param service Object
   */
  function checkMethodExist(service) {
    return new Promise(function(resolve, reject) {
      if (service[program.method] && typeof service[program.method] === 'function') {
        resolve(service[program.method])
      } else {
        reject('Method "' + program.method + '" doen\'t exist. Please, provide a valid method name.');
      }
    });
  }

  /**
   * Do all needed questions and launch tha call to `serviceMethod` with the answers.
   *
   * @param serviceMethod Function
   */
  function requestCallParams(serviceMethod) {
    return inquirerPrompt(EMTMadridQuestions[program.method]).then(serviceMethod);
  }

  /**
   * Print the results with colors
   *
   * @params results JSON
   */
  function printResult(result) {
    console.log(util.inspect(JSON.parse(result), { depth: null, colors: true }))
    process.exit();
  }

  function _call(method) {
    if(program.idClient) program.config.set('idClient', program.idClient);
    if(program.passKey) program.config.set('passKey', program.passKey);
    program.config.save();
    program.method = method;
    checkSetupData()
      .then(saveSetupData)
      .then(setupEMTMadrid)
      .then(checkMethodExist)
      .then(requestCallParams)
      .then(printResult)
      .catch(function(error){
        console.error(error);
        process.exit(1);
      });
  }

  program
    .command('call <method>')
    .option('-c, --clientId <clientId>', 'Save Client Id to use in the call')
    .option('-p, --passKey <passKey>', 'Save Pass Key to use in the call')
    .option('-l', '--lan <lang>', 'Save laguage for the request')
    .version('0.1.0')
    .description('Call EMT service method')
    .action(_call);

};
