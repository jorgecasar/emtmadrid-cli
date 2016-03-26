'use strict';

var questions = require('./questions.js');

module.exports = {
  busGetRouteLines: [
    questions.date,
    questions.lines
  ],
  busGetRouteLinesRoute: [
    questions.date,
    questions.lines
  ],
  busGetCalendar: [
    questions.startDate,
    questions.endDate
  ],
  busGetListLines: [
    questions.date,
    questions.lines
  ],
  busGetGroups: [],
  busGetTimesLines: [
    questions.date,
    questions.lines
  ],
  busGetTimeTableLines: [
    questions.date,
    questions.line
  ],
  busGetNodesLines: [
    questions.nodes
  ],

  geoGetStreet: [
    questions.description,
    questions.streetNumber,
    questions.radius,
    questions.lang
  ],
  geoGetStopsFromStop: [
    questions.idStop,
    questions.radius,
    questions.lang
  ],
  geoGetStopsFromXY: [
    questions.latitude,
    questions.longitude,
    questions.radius,
    questions.lang
  ],
  geoGetArriveStop: [
    questions.idStop,
    questions.lang
  ],
  geoGetArriveClient: [
    questions.client,
    questions.lang
  ],
  geoGetPointsOfInterest: [
    questions.latitude,
    questions.longitude,
    questions.typesPOI,
    questions.radius,
    questions.moreInfo,
    questions.lang
  ],
  geoGetPointsOfInterestTypes: [
    questions.lang
  ],
  geoGetStreetFromXY: [
    questions.latitude,
    questions.longitude,
    questions.radius,
    questions.lang
  ],
  geoGetInfoLine: [
    questions.date,
    questions.line,
    questions.lang
  ],
  geoGetInfoLineExtended: [
    questions.date,
    questions.line,
    questions.lang
  ],
  geoGetStopsLine: [
    questions.line,
    questions.direction,
    questions.lang
  ],
  geoGetGroups: [
    questions.lang
  ],
  geoGetRouteLinesRoute: [
    questions.date,
    questions.lines
  ]
};