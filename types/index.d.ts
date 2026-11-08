export declare class EasterDate {
    year: number;
    month: number;
    day: number;
    /**
     * @param {number} year
     * @param {number} month
     * @param {number} day
     */
    constructor(year: number, month: number, day: number);
    toString(): string;
}
/**
 * Calculate easter sunday in the gregorian calendar
 * @param {Date|number|string} [year]
 * @return {EasterDate}
 */
export declare function gregorianEaster(year?: Date | number | string): EasterDate;
/**
 * Calculate easter sunday in the gregorian calendar (Shortcut for
 * `gregorianEaster`)
 * @param {Date|number|string} [year]
 * @return {EasterDate}
 */
export declare const easter: typeof gregorianEaster;
/**
 * Calculate easter sunday in the julian calendar
 * @param {Date|number|string} [year]
 * @return {EasterDate}
 */
export declare function julianEaster(year?: Date | number | string): EasterDate;
/**
 * Orthodox Easter in gregorian calender
 * @param {Date|number|string} [year]
 * @return {EasterDate}
 */
export declare function orthodoxEaster(year?: Date | number | string): EasterDate;
declare const _default: {
    easter: typeof gregorianEaster;
    gregorianEaster: typeof gregorianEaster;
    julianEaster: typeof julianEaster;
    orthodoxEaster: typeof orthodoxEaster;
};
export default _default;
