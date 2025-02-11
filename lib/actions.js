'use strict';

exports.__esModule = true;
exports.toggleVisibility = toggleVisibility;
exports.changePosition = changePosition;
exports.changeSize = changeSize;
var TOGGLE_VISIBILITY = '@@redux-devtools-log-monitor/TOGGLE_VISIBILITY';
exports.TOGGLE_VISIBILITY = TOGGLE_VISIBILITY;

function toggleVisibility() {
  return { type: TOGGLE_VISIBILITY };
}

var CHANGE_POSITION = '@@redux-devtools-log-monitor/CHANGE_POSITION';
exports.CHANGE_POSITION = CHANGE_POSITION;

function changePosition() {
  return { type: CHANGE_POSITION };
}

var CHANGE_SIZE = '@@redux-devtools-log-monitor/CHANGE_SIZE';
exports.CHANGE_SIZE = CHANGE_SIZE;

function changeSize(size) {
  return { type: CHANGE_SIZE, size: size };
}