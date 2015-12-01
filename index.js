/* global define */

;(function (ctx) {
  'use strict'

  var exports = {} // define the module
  var moduleName = 'date-easter' // the name of the module

  /**
   * @private
   */
  function _toYear (year) {
    if (!year) {
      year = new Date().getYear()
    } else if (year instanceof Date) {
      year = year.getYear()
    }
    return year
  }

  /**
   * calculate easter sunday in the gregorian calendar
   * @param {Date|Number} year
   * from https://de.wikipedia.org/wiki/Gau%C3%9Fsche_Osterformel
   * ergänzte Formel
   */
  function gregorianEaster (year) {
    year = _toYear(year)

    var k = Math.floor(year / 100)
    var m = 15 + Math.floor((3 * k + 3) / 4) - Math.floor((8 * k + 13) / 25)
    var s = 2 - Math.floor((3 * k + 3) / 4)
    var a = year % 19
    var d = (19 * a + m) % 30
    var r = Math.floor((d + a / 11) / 29)
    var og = 21 + d - r
    var sz = 7 - Math.floor(year + year / 4 + s) % 7
    var oe = 7 - (og - sz) % 7
    var os = og + oe
    return new Date(year, 2, os)
  }
  exports.gregorianEaster = gregorianEaster

  /**
   * calculate easter sunday in the gregorian calendar (Shortcut for
   * `gregorianEaster`)
   * @param {Date|Number} year
   */
  exports.easter = gregorianEaster

  // Node.js
  if (typeof ctx.Window === 'undefined' && typeof module !== 'undefined' && module.exports) {
    module.exports = exports
  } else if (typeof define !== 'undefined' && define.amd) {   // AMD / RequireJS
    define([], function () {
      return exports
    })
  } else if (typeof ctx.Window !== 'undefined' && !ctx[moduleName]) { // included in browser via <script> tag
    ctx[moduleName] = exports
  }
}(this))
