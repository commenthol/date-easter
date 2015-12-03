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
      year = year.getYear() + 1900
    }
    return year
  }

  function EasterDate (year, month, day) {
    this.year  = year
    this.month = month
    this.day   = day
  }
  
  EasterDate.prototype = {
    toString: function () {
      function pre (num, l) {
        l = l || 2
        var s = '0000' + num
        return s.substr(s.length - l, l)
      } 
      return [pre(this.year, 4), pre(this.month), pre(this.day)].join('-')
    }
  }

  /**
   * from https://de.wikipedia.org/wiki/Gau%C3%9Fsche_Osterformel
   * ergänzte Formel
   */
  function _easter (year, julian, gregorian) {
    year = _toYear(year)

    var k = Math.floor(year / 100)
    var m = 15 + Math.floor((3 * k + 3) / 4) - Math.floor((8 * k + 13) / 25)
    var s = 2 - Math.floor((3 * k + 3) / 4)
    if (julian) {
      m = 15
      s = 0
    }
    var a = year % 19
    var d = (19 * a + m) % 30
    var r = Math.floor((d + a / 11) / 29)
    var og = 21 + d - r
    var sz = 7 - Math.floor(year + year / 4 + s) % 7
    var oe = 7 - (og - sz) % 7
    var os = og + oe
    if (gregorian) {      
      os = os + Math.floor(year / 100) - Math.floor(year / 400) - 2
    }
    //                      1   2   3   4   5   6   7   8
    var daysPerMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31]
    var day = os
    var month
    for (month = 3; month < 8; month++) {
      if (day <= daysPerMonth[month]) {
        break
      }
      day -= daysPerMonth[month]
    }
    
    return new EasterDate(year, month, day)
  }

  /**
   * calculate easter sunday in the gregorian calendar
   * @param {Date|Number} year
   */
  function gregorianEaster (year) {
    return _easter(year)
  }
  exports.gregorianEaster = gregorianEaster

  /**
   * calculate easter sunday in the gregorian calendar (Shortcut for
   * `gregorianEaster`)
   * @param {Date|Number} year
   */
  exports.easter = gregorianEaster

  /**
   * calculate easter sunday in the julian calendar
   * @param {Date|Number} year
   * @param {Boolean} [gregorian] - if `true` then output is a date in the gregorian calendar
   */
  function julianEaster (year) {
    return _easter(year, true)
  }
  exports.julianEaster = julianEaster

  /**
   * Orthodox Easter in gregorian calender
   * @param {Date|Number} year
   */
  function orthodoxEaster (year) {
    return _easter(year, true, true)
  }
  exports.orthodoxEaster = orthodoxEaster

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
