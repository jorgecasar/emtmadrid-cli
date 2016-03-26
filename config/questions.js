'use strict';
var dateRegExp = /^([0]?[1-9]|[1|2][0-9]|[3][0|1])[.\/-]([0]?[1-9]|[1][0-2])[.\/-]([0-9]{4}|[0-9]{2})$/gi;
var emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gi;
var uuidRegExp = /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/gi;
var numberRegExp = /^\d+$/gi;
var numbersByPipeRegexp = /^\d+(?:\|\d+)*$/gi;
var textByPipe = /^\w+(?:\|\w+)*$/gi;

var formatDate = function(date, days) {
  if (days) {
    date.setDate(date.getDate() + days);
  }

  var dd = ('0' + date.getDate()).slice(-2);
  var mm = ('0' + (date.getMonth() + 1)).slice(-2);
  var yyyy = date.getFullYear().toString();
  return dd + '/' + mm + '/' + yyyy;
};

module.exports = {
  idClient: {
    name: 'idClient',
    message: 'Client id: ',
    validate: function(input) {
      return emailRegExp.test(input);
    }
  },
  passKey: {
    name: 'passKey',
    message: 'Pass Key: ',
    validate: function(input) {
      return uuidRegExp.test(input);
    }
  },
  date: {
    name: 'date',
    message: 'Date: ',
    default: formatDate(new Date()),
    validate: function(input) {
      return input.match(dateRegExp) ? true : 'Please provide a valid date with format dd/mm/yyyy';
    }
  },
  startDate: {
    name: 'startDate',
    message: 'Start date: ',
    default: formatDate(new Date()),
    validate: function(input) {
      return input.match(dateRegExp) ? true : 'Please provide a valid date with format dd/mm/yyyy';
    }
  },
  endDate: {
    name: 'endDate',
    message: 'End date: ',
    default: formatDate(new Date()),
    validate: function(input) {
      return input.match(dateRegExp) ? true : 'Please provide a valid date with format dd/mm/yyyy.';
    }
  },
  lang: {
    name: 'lang',
    message: 'Language',
    type: 'list',
    choices: [{
      name: 'Español',
      value: 'ES'
    }, {
      name: 'English',
      value: 'EN'
    }]
  },

  description: {
    name: 'description',
    message: 'Nombre de la calle/primera calle de esquina/ punto de interés:',
    validate: function(input) {
      return input ? true : 'Please provide the name of a street.';
    }
  },
  streetNumber: {
    name: 'streetNumber',
    message: 'Numero de la calle:',
    validate: function(input) {
      return input && input.match(numberRegExp) ? true : 'Please provide the name of a street.';
    }
  },
  direction: {
    name: 'direction',
    message: 'Dirección',
    type: 'list',
    choices: [{
      name: 'Ida',
      value: '1'
    }, {
      name: 'Vuelta',
      value: '2'
    }]
  },
  line: {
    name: 'line',
    message: 'Line: ',
    validate: function(input) {
      return input && input.match(numberRegExp) ?
        true :
        'Please provide a valid line numbers separated by pipe "|".';
    }
  },
  lines: {
    name: 'lines',
    message: 'Lines (separated by pipe "|"): ',
    validate: function(input) {
      return input && input.match(numbersByPipeRegexp) ?
        true :
        'Please provide a valid line numbers separated by pipe "|".';
    }
  },
  idStop: {
    name: 'idStop',
    message: 'Stop ID: ',
    validate: function(input) {
      return input && input.match(numberRegExp) ?
        true :
        'Please provide a valid stop ID.';
    }
  },
  nodes: {
    name: 'nodes',
    message: 'Stop IDs: (separated by pipe "|"):',
    validate: function(input) {
      return input && input.match(numbersByPipeRegexp) ?
        true :
        'Please provide a valid stops ID separated by pipe "|".';
    }
  },
  longitude: {
    name: 'longitude',
    message: 'Longitude with decimal separator ".":',
    validate: function(input) {
      return !isNaN(input) ?
        true :
        'Please provide a valid decimal number using point "." as decimal separator.';
    }
  },
  latitude: {
    name: 'latitude',
    message: 'Latitude with decimal separator ".":',
    validate: function(input) {
      return !isNaN(input) ?
        true :
        'Please provide a valid decimal number using point "." as decimal separator.';
    }
  },
  typesPOI: {
    name: 'typesPOI',
    message: 'Types of POI (separated decimals by pipe "|"):',
    validate: function(input) {
      return input && input.match(textByPipe) ?
        true :
        'Please provide a valid types of POI separated by pipe "|".';
    }
  },
  radius: {
    name: 'radius',
    message: 'Radius:',
    validate: function(input) {
      return !isNaN(input) && parseInt(Number(input)) == input && !isNaN(parseInt(input, 10)) ?
        true :
        'Please provide a valid number.';
    }
  },
  moreInfo: {
    name: 'moreInfo',
    message: 'More info:'
  }
};
