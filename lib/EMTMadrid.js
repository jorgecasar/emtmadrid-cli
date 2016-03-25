'use strict';

// Avoids DEPTH_ZERO_SELF_SIGNED_CERT error for self-signed certs
// https://github.com/request/request/issues/418
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var request = require('request');

function EMTMadrid(idClient, passKey, lang) {
  var _idClient = idClient;
  var _passKey = passKey;
  var _lang = lang;
  var _baseURL = 'https://openbus.emtmadrid.es:9443/emt-proxy-server/last/';

  var _doRequest = function(path, form) {
    return new Promise(function(resolve, reject){
      form.idClient = _idClient;
      form.passKey = _passKey;
      var requestData = {
        url: _baseURL + path,
        form: form
      };
      var requestCallback = function(error, response, body) {
        if (error) {
          reject(new Error(error));
        }
        resolve(body);
      };
      request.post(requestData, requestCallback);
    });
  };

  this._setIdClient = function(idClient) {
    _idClient = idClient;
  };
  this._setPassKey = function(passKey) {
    _passKey = passKey;
  };
  this._setCredentials = function(idClient, passKey) {
    this._setIdClient(idClient);
    this._setPassKey(passKey);
  };

  this.busGetCalendar = function(params) {
    var path = 'bus/GetCalendar.php';
    var data = {
      SelectDateBegin: params.startDate, //Mandatory
      SelectDateEnd: params.endDate //Mandatory
    };
    return _doRequest(path, data);
  };
  this.busGetGroups = function(params) {
    var path = 'bus/GetGroups.php';
    var data = {
      cultureInfo: params.lng || _lang
    };
    return _doRequest(path, data);
  };
  this.busGetListLines = function(params) {
    var path = 'bus/GetListLines.php';
    var data = {
      SelectDate: params.date,
      Lines: params.lines
    };
    return _doRequest(path, data);
  };
  this.busGetNodesLines = function(params) {
    var path = 'bus/GetNodesLines.php';
    var data = {
      Nodes: params.stops
    };
    return _doRequest(path, data);
  };
  this.busGetRouteLines = function(params) {
    var path = 'bus/GetRouteLines.php';
    var data = {
      SelectDate: params.date,
      Lines: params.lines
    };
    return _doRequest(path, data);
  };
  this.busGetRouteLinesRoute = function(params) {
    var path = 'bus/GetRouteLinesRoute.php';
    var data = {
      SelectDate: params.date,
      Lines: params.lines
    };
    return _doRequest(path, data);
  };
  this.busGetTimesLines = function(params) {
    var path = 'bus/GetTimesLines.php';
    var data = {
      SelectDate: params.date,
      Lines: params.lines
    };
    return _doRequest(path, data);
  };
  this.busGetTimeTableLines = function(params) {
    var path = 'bus/GetTimeTableLines.php';
    var data = {
      SelectDate: params.date,
      Lines: params.line
    };
    return _doRequest(path, data);
  };
  this.geoGetStreet = function(params) {
    var path = 'geo/GetStreet.php';
    var data = {
      description1: params.description1,
      description2: params.description2,
      streetNumber: params.streetNumber,
      Radius: params.radius
    };
    return _doRequest(path, data);
  };

  this.geoGetStopsFromStop = function(params){
    var path = 'geo/GetStreet.php';
    var data = {
      idStop: params.idStop,
      Radius: params.radius,
      cultureInfo: params.lng || _lang
    };
    return _doRequest(path, data);
  };

  this.geoGetArriveStop = function(params) {
    var path = 'geo/GetArriveStop.php';
    var data = {
      idStop: params.stop,
      cultureInfo: params.lng || _lang
    };
    return _doRequest(path, data);
  };

  this.geoGetStopsFromXY = function(params) {
    var path = 'geo/GetArriveStop.php';
    var data = {
      longitude: params.longitude,
      latitude: params.latitude,
      Radius: params.radius,
      cultureInfo: params.lng || _lang
    };
    return _doRequest(path, data);
  },

  this.geoGetGroups = function(params) {
    var path = 'geo/GetGroups.php';
    var data = {
      cultureInfo: params.lng || _lang
    };
    return _doRequest(path, data);
  };
  this.geoGetInfoLine = function(params) {
    var path = 'geo/GetInfoLine.php';
    var data = {
      fecha: params.date,
      line: params.line,
      cultureInfo: params.lng || _lang
    };
    return _doRequest(path, data);
  };
  this.geoGetInfoLineExtended = function(params) {
    var path = 'geo/GetInfoLineExtended.php';
    var data = {
      fecha: params.date,
      line: params.line,
      cultureInfo: params.lng || _lang
    };
    return _doRequest(path, data);
  };
  this.geoGetPointsOfInterest = function(params) {
    var path = 'geo/GetPointsOfInterest.php';
    var data = {
      latitude: params.lat,
      longitude: params.lng,
      tipos: params.typesPOI,
      Radius: params.radius,
      moreInfo: params.moreInfo,
      cultureInfo: params.lng || _lang
    };
    return _doRequest(path, data);
  };
  this.geoGetPointsOfInterestTypes = function(params) {
    var path = 'geo/GetPointsOfInterestTypes.php';
    var data = {
      moreInfo: params.moreInfo,
      cultureInfo: params.lng || _lang
    };
    return _doRequest(path, data);
  }
};

module.exports = EMTMadrid;
