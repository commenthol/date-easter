/**
 * @private
 */
function _toYear (year) {
  if (!year) {
    year = new Date().getFullYear()
  } else if (year instanceof Date) {
    year = year.getFullYear()
  } else if (typeof year === 'string') {
    year = parseInt(year, 10)
  }
  return year
}

function pre (num, l) {
  l = l || 2
  const s = '0000' + num
  return s.substr(s.length - l, l)
}

export class EasterDate {
  constructor (year, month, day) {
    this.year = year
    this.month = month
    this.day = day
  }

  toString () {
    return [pre(this.year, 4), pre(this.month), pre(this.day)].join('-')
  }
}

/**
 * from https://de.wikipedia.org/wiki/Gau%C3%9Fsche_Osterformel
 * ergänzte Formel
 */
function _easter (year, julian, gregorian) {
  year = _toYear(year)

  const k = Math.floor(year / 100)
  let m = 15 + Math.floor((3 * k + 3) / 4) - Math.floor((8 * k + 13) / 25)
  let s = 2 - Math.floor((3 * k + 3) / 4)
  if (julian) {
    m = 15
    s = 0
  }
  const a = year % 19
  const d = (19 * a + m) % 30
  const r = Math.floor((d + a / 11) / 29)
  const og = 21 + d - r
  const sz = 7 - Math.floor(year + year / 4 + s) % 7
  const oe = 7 - (og - sz) % 7
  let os = og + oe
  if (gregorian) {
    os = os + Math.floor(year / 100) - Math.floor(year / 400) - 2
  }
  //                        1   2   3   4   5   6   7   8
  const daysPerMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31]
  let day = os
  let month
  for (month = 3; month < 8; month++) {
    if (day <= daysPerMonth[month]) {
      break
    }
    day -= daysPerMonth[month]
  }

  return new EasterDate(year, month, day)
}

/**
 * Calculate easter sunday in the gregorian calendar
 * @param {Date|Number} year
 * @return {EasterDate}
 */
export function gregorianEaster (year) {
  return _easter(year)
}

/**
 * Calculate easter sunday in the gregorian calendar (Shortcut for
 * `gregorianEaster`)
 * @param {Date|Number} year
 * @return {EasterDate}
 */
export const easter = gregorianEaster

/**
 * Calculate easter sunday in the julian calendar
 * @param {Date|Number} year
 * @return {EasterDate}
 */
export function julianEaster (year) {
  return _easter(year, true)
}

/**
 * Orthodox Easter in gregorian calender
 * @param {Date|Number} year
 * @return {EasterDate}
 */
export function orthodoxEaster (year) {
  return _easter(year, true, true)
}

export default {
  easter,
  gregorianEaster,
  julianEaster,
  orthodoxEaster
}
