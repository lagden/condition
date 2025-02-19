/**
 * Parses a value as a boolean, optionally forcing conversion.
 *
 * @param {*} v - The value to parse.
 * @param {boolean} [force=true] - Whether to force the conversion to boolean.
 * @returns {boolean|*} - Returns the boolean value or the original value if not forced.
 */
export function parseBoolean(v: any, force?: boolean): boolean | any;
/**
 * Checks for equality between two values.
 *
 * @param {Object} params - The parameters for the equality check.
 * @param {*} params.fieldValue - The first value to compare.
 * @param {*} params.value - The second value to compare.
 * @returns {boolean} - Returns true if the values are equal, otherwise false.
 */
export function eq(params: {
    fieldValue: any;
    value: any;
}): boolean;
/**
 * Checks for inequality between two values.
 *
 * @param {Object} params - The parameters for the inequality check.
 * @param {*} params.fieldValue - The first value to compare.
 * @param {*} params.value - The second value to compare.
 * @returns {boolean} - Returns true if the values are not equal, otherwise false.
 */
export function ne(params: {
    fieldValue: any;
    value: any;
}): boolean;
/**
 * Checks if the first value is greater than the second.
 *
 * @param {Object} params - The parameters for the greater than check.
 * @param {*} params.fieldValue - The first value to compare.
 * @param {*} params.value - The second value to compare.
 * @returns {boolean} - Returns true if the first value is greater, otherwise false.
 */
export function gt(params: {
    fieldValue: any;
    value: any;
}): boolean;
/**
 * Checks if the first value is greater than or equal to the second.
 *
 * @param {Object} params - The parameters for the greater than or equal check.
 * @param {*} params.fieldValue - The first value to compare.
 * @param {*} params.value - The second value to compare.
 * @returns {boolean} - Returns true if the first value is greater than or equal, otherwise false.
 */
export function ge(params: {
    fieldValue: any;
    value: any;
}): boolean;
/**
 * Checks if the first value is less than the second.
 *
 * @param {Object} params - The parameters for the less than check.
 * @param {*} params.fieldValue - The first value to compare.
 * @param {*} params.value - The second value to compare.
 * @returns {boolean} - Returns true if the first value is less, otherwise false.
 */
export function lt(params: {
    fieldValue: any;
    value: any;
}): boolean;
/**
 * Checks if the first value is less than or equal to the second.
 *
 * @param {Object} params - The parameters for the less than or equal check.
 * @param {*} params.fieldValue - The first value to compare.
 * @param {*} params.value - The second value to compare.
 * @returns {boolean} - Returns true if the first value is less than or equal, otherwise false.
 */
export function le(params: {
    fieldValue: any;
    value: any;
}): boolean;
/**
 * Checks if the intersection of two sets is non-empty.
 *
 * @param {Object} params - The parameters for the intersection check.
 * @param {*} params.fieldValue - The first set of values.
 * @param {*} params.value - The second set of values.
 * @param {boolean} [params.not=false] - A flag indicating whether to negate the result.
 * @returns {boolean} - Returns true if there is an intersection, otherwise false.
 */
export function intersection(params: {
    fieldValue: any;
    value: any;
    not?: boolean;
}): boolean;
/**
 * Checks if the difference between two sets is non-empty.
 *
 * @param {Object} params - The parameters for the difference check.
 * @param {*} params.fieldValue - The first set of values.
 * @param {*} params.value - The second set of values.
 * @param {boolean} [params.not=false] - A flag indicating whether to negate the result.
 * @returns {boolean} - Returns true if there are elements in the first set that are not in the second, otherwise false.
 */
export function difference(params: {
    fieldValue: any;
    value: any;
    not?: boolean;
}): boolean;
/**
 * Checks if two arrays are equal in terms of length and content.
 *
 * @param {Object} params - The parameters for the equality check.
 * @param {*} params.fieldValue - The first array to compare.
 * @param {*} params.value - The second array to compare.
 * @param {boolean} [params.not=false] - A flag indicating whether to negate the result.
 * @returns {boolean} - Returns true if both arrays are equal, otherwise false.
 */
export function arrayEquals(params: {
    fieldValue: any;
    value: any;
    not?: boolean;
}): boolean;
/**
 * Tests if a value matches a regular expression pattern.
 *
 * @param {Object} params - The parameters for the regex check.
 * @param {*} params.fieldValue - The value to test against the pattern.
 * @param {string|RegExp} params.value - The regex pattern to test.
 * @param {string} [params.flag=''] - Optional flags for the regex.
 * @param {boolean} [params.not=false] - A flag indicating whether to negate the result.
 * @returns {boolean} - Returns true if the value matches the pattern, otherwise false.
 */
export function regex(params: {
    fieldValue: any;
    value: string | RegExp;
    flag?: string;
    not?: boolean;
}): boolean;
/**
 * Checks if the length of a value meets a specified condition.
 *
 * @param {Object} params - The parameters for the length check.
 * @param {*} params.fieldValue - The value whose length is to be checked.
 * @param {number} params.value - The length to compare against.
 * @param {string} [params.compare] - The comparison operator.
 * @param {boolean} [params.not=false] - A flag indicating whether to negate the result.
 * @returns {boolean} - Returns true if the length check passes, otherwise false.
 */
export function length(params: {
    fieldValue: any;
    value: number;
    compare?: string;
    not?: boolean;
}): boolean;
/**
 * Checks if a value belongs to a specified collection.
 *
 * @param {Object} params - The parameters for the belongs check.
 * @param {*} params.fieldValue - The collection (array or iterable) to check against.
 * @param {*} params.value - The value to check for membership in the collection.
 * @param {boolean} [params.not=false] - A flag indicating whether to negate the result.
 * @returns {boolean} - Returns true if the value belongs to the collection, otherwise false.
 */
export function belongs(params: {
    fieldValue: any;
    value: any;
    not?: boolean;
}): boolean;
export { mapOperators } from "./operator.js";
export { getValueFromObject } from "@tadashi/common";
