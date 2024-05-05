import {mapOperators} from './operator.js'

export {mapOperators} from './operator.js'
export {getValueFromObject} from '@tadashi/common'

/**
 * Converts a value to an array if it's not already an array.
 *
 * If the input value is an array, the function returns the input value itself.
 * If the input value is not an array, it creates a new array containing the input value as its only element.
 *
 * @function
 * @param {Array|any} v - The value to convert to an array, or an array itself.
 * @returns {Array} An array representation of the input value, either the input array or a new array containing the input value.
 */
const _toArray = v => (Array.isArray(v) ? v : [v])

/**
 * Checks if a value is iterable.
 * @param {*} v - The value to check.
 * @returns {boolean} Returns true if the value is iterable, false otherwise.
 */
const _isIterable = v => (v === null || v === undefined ? false : typeof v[Symbol.iterator] === 'function')

/**
 * Parse a value into a boolean
 * @param {(boolean|string|number)} v - Value to parse
 * @param {boolean} [force=true] - Whether to force parsing or return original value if not parsable
 * @returns {boolean} Parsed boolean value
 */
export function parseBoolean(v, force = true) {
	if (typeof v === 'boolean') {
		return v
	}
	const _v = String(v)
	const boolRegex = /^(?:true|false|1|0)$/i
	if (boolRegex.test(_v)) {
		return _v.toLowerCase() === 'true' || _v === '1'
	}
	return force ? Boolean(v) : v
}

/**
 * Check if two values are equal
 * @param {*} a - First value
 * @param {*} b - Second value
 * @returns {boolean} Whether the values are equal
 */
export function eq(a, b) {
	return a === b
}

/**
 * Check if two values are not equal
 * @param {*} a - First value
 * @param {*} b - Second value
 * @returns {boolean} Whether the values are not equal
 */
export function ne(a, b) {
	return a !== b
}

/**
 * Check if the first value is greater than the second value
 * @param {number} a - First value
 * @param {number} b - Second value
 * @returns {boolean} Whether the first value is greater than the second value
 */
export function gt(a, b) {
	return a > b
}

/**
 * Check if the first value is greater than or equal to the second value
 * @param {number} a - First value
 * @param {number} b - Second value
 * @returns {boolean} Whether the first value is greater than or equal to the second value
 */
export function ge(a, b) {
	return a >= b
}

/**
 * Check if the first value is less than the second value
 * @param {number} a - First value
 * @param {number} b - Second value
 * @returns {boolean} Whether the first value is less than the second value
 */
export function lt(a, b) {
	return a < b
}

/**
 * Check if the first value is less than or equal to the second value
 * @param {number} a - First value
 * @param {number} b - Second value
 * @returns {boolean} Whether the first value is less than or equal to the second value
 */
export function le(a, b) {
	return a <= b
}

/**
 * Check if there is an intersection between two arrays or values
 * @param {(Array|any)} v1 - First array or value
 * @param {(Array|any)} v2 - Second array or value
 * @param {boolean} [useNot=false] - Optional. If true, negates the result (checks if the value does not belong to the collection).
 * @returns {boolean} Whether there is an intersection between the arrays or values
 */
export function intersection(v1, v2, useNot = false) {
	const a = new Set(_toArray(v1))
	const b = new Set(_toArray(v2))
	const _intersection = new Set([...a].filter(x => b.has(x)))
	const result = _intersection.size > 0
	return useNot ? !result : result
}

/**
 * Check if there is a difference between two arrays or values
 * @param {Array|any} v1 - First array or value to compare.
 * @param {Array|any} v2 - Second array or value to compare.
 * @param {boolean} [useNot=false] - Optional. If true, negates the result (checks if the value does not belong to the collection).
 * @returns {boolean} True if there are elements in `v1` that are not present in `v2`, false otherwise.
 */
export function difference(v1, v2, useNot = false) {
	const a = new Set(_toArray(v1))
	const b = new Set(_toArray(v2))
	const _difference = new Set([...a].filter(x => !b.has(x)))
	const result = _difference.size > 0
	return useNot ? !result : result
}

/**
 * Check if two arrays are equal
 * @param {Array} a - First array
 * @param {Array} b - Second array
 * @param {boolean} [useNot=false] - Optional. If true, negates the result (checks if the value does not belong to the collection).
 * @returns {boolean} Whether the arrays are equal
 */
export function arrayEquals(a, b, useNot = false) {
	const result = Array.isArray(a) && Array.isArray(b) && a.length === b.length && a.toString() === b.toString()
	return useNot ? !result : result
}

/**
 * Check if a value matches a regular expression pattern
 * @param {string} v - Value to match
 * @param {(RegExp|string)} pattern - Regular expression pattern or string pattern
 * @param {string} [flag] - Regular expression flags (optional)
 * @param {boolean} [useNot=false] - Optional. If true, negates the result (checks if the value does not belong to the collection).
 * @returns {boolean} Whether the value matches the pattern
 */
export function regex(v, pattern, flag = '', useNot = false) {
	let result = false
	if (pattern instanceof RegExp) {
		result = pattern.test(v)
	}

	if (typeof pattern === 'string') {
		const _regex = new RegExp(pattern, flag)
		result = _regex.test(v)
	}

	return useNot ? !result : result
}

/**
 * Compares the length of a value to a given size using a specified comparison operator.
 *
 * @param {string|Array|Object} v - The value whose length is to be compared.
 * @param {number} size - The size to compare against.
 * @param {string} compare - The comparison operator ('<' | '<=' | '>' | '>=' | '==' | '===').
 * @param {boolean} [useNot=false] - Flag indicating whether to negate the result.
 * @returns {boolean} The result of the length comparison.
 */
export function length(v, size, compare, useNot = false) {
	const m = mapOperators.get(compare) ?? le
	const _v = _isIterable(v) ? v : String(v)
	const result = m(_v.length, size)
	return useNot ? !result : result
}

/**
 * Checks if a value belongs to a collection.
 * @param {*} v - The value to check.
 * @param {Array|Set|Map} collection - The collection to check against.
 * @param {boolean} [useNot=false] - Optional. If true, negates the result (checks if the value does not belong to the collection).
 * @returns {boolean} Returns true if the value belongs to the collection, false otherwise (or negated if useNot is true).
 */
export function belongs(v, collection, useNot = false) {
	const data = new Set(_toArray(collection))
	const result = data.has(v)
	return useNot ? !result : result
}
