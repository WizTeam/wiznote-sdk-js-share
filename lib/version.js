"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compareVersion = compareVersion;

function compareVersion(version1, version2) {
  var v1 = version1.split('.');
  var v2 = version2.split('.');

  for (var i = 0, j = v1.length; i < j; i++) {
    var n1 = parseInt(v1[i], 10);
    var n2 = v2[i] ? parseInt(v2[i], 10) : -1;

    if (n1 < n2) {
      return -1;
    } else if (n1 > n2) {
      return 1;
    }
  }

  if (v1.length < v2.length) {
    return -1;
  }

  return 0;
}