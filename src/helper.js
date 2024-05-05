import {mapOperators} from './operator.js'

export {mapOperators} from './operator.js'
export {getValueFromObject} from '@tadashi/common'

/**
 * Converts a value to an array if it's not already an array.
 *
 * If the input value is an array, the function returns the input value itself.
 * If the input value is not an array, it creates a new array containing the input value as its only element.
 *
 * @param {Array|any} v - The value to convert to an array, or an array itself.
 * @returns {Array} An array representation of the input value, either the input array or a new array containing the input value.
 * @private
 */
const _toArray = v => (Array.isArray(v) ? v : [v])

/**
 * Checks if a value is iterable.
 * @param {*} v - The value to check.
 * @returns {boolean} Returns true if the value is iterable, false otherwise.
 * @private
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
 * Checks if two values are equal.
 *
 * @param {Object} params - Parameters object.
 * @param {*} params.fieldValue - The first value to compare.
 * @param {*} params.value - The second value to compare.
 * @returns {boolean} Whether the two values are equal.
 */
export function eq(params) {
	// prettier-ignore
	const {
		fieldValue: a,
		value: b,
	} = params
	return a === b
}

/**
 * Check if two values are not equal
 *
 * @param {Object} params - Parameters object.
 * @param {*} params.fieldValue - The first value to compare.
 * @param {*} params.value - The second value to compare.
 * @returns {boolean} Whether the values are not equal
 */
export function ne(params) {
	// prettier-ignore
	const {
		fieldValue: a,
		value: b,
	} = params
	return a !== b
}

/**
 * Check if the first value is greater than the second value
 *
 * @param {Object} params - Parameters object.
 * @param {*} params.fieldValue - The first value to compare.
 * @param {*} params.value - The second value to compare.
 * @returns {boolean} Whether the first value is greater than the second value
 */
export function gt(params) {
	// prettier-ignore
	const {
		fieldValue: a,
		value: b,
	} = params
	return a > b
}

/**
 * Check if the first value is greater than or equal to the second value
 *
 * @param {Object} params - Parameters object.
 * @param {*} params.fieldValue - The first value to compare.
 * @param {*} params.value - The second value to compare.
 * @returns {boolean} Whether the first value is greater than or equal to the second value
 */
export function ge(params) {
	// prettier-ignore
	const {
		fieldValue: a,
		value: b,
	} = params
	return a >= b
}

/**
 * Check if the first value is less than the second value
 *
 * @param {Object} params - Parameters object.
 * @param {*} params.fieldValue - The first value to compare.
 * @param {*} params.value - The second value to compare.
 * @returns {boolean} Whether the first value is less than the second value
 */
export function lt(params) {
	// prettier-ignore
	const {
		fieldValue: a,
		value: b,
	} = params
	return a < b
}

/**
 * Check if the first value is less than or equal to the second value
 *
 * @param {Object} params - Parameters object.
 * @param {*} params.fieldValue - The first value to compare.
 * @param {*} params.value - The second value to compare.
 * @returns {boolean} Whether the first value is less than or equal to the second value
 */
export function le(params) {
	// prettier-ignore
	const {
		fieldValue: a,
		value: b,
	} = params
	return a <= b
}

/**
 * Check if there is an intersection between two arrays or values.
 *
 * @param {Object} params - Parameters object.
 * @param {(Array|any)} params.fieldValue - The first array or value.
 * @param {(Array|any)} params.value - The second array or value.
 * @param {boolean} [params.not=false] - Optional. If true, negates the result (checks if the value does not belong to the collection).
 * @returns {boolean} Whether there is an intersection between the arrays or values.
 */
export function intersection(params) {
	// prettier-ignore
	const {
		fieldValue: v1 = 1,
		value: v2 = 2,
		not: useNot = false,
	} = params
	const a = new Set(_toArray(v1))
	const b = new Set(_toArray(v2))
	const _intersection = new Set([...a].filter(x => b.has(x)))
	const result = _intersection.size > 0
	return useNot ? !result : result
}

/**
 * Check if there is a difference between two arrays or values
 *
 * @param {Object} params - Parameters object.
 * @param {(Array|any)} params.fieldValue - The first array or value.
 * @param {(Array|any)} params.value - The second array or value.
 * @param {boolean} [params.not=false] - Optional. If true, negates the result (checks if the value does not belong to the collection).
 * @returns {boolean} True if there are elements in `v1` that are not present in `v2`, false otherwise.
 */
export function difference(params) {
	// prettier-ignore
	const {
		fieldValue: v1 = 1,
		value: v2 = 1,
		not: useNot = false,
	} = params
	const a = new Set(_toArray(v1))
	const b = new Set(_toArray(v2))
	const _difference = new Set([...a].filter(x => !b.has(x)))
	const result = _difference.size > 0
	return useNot ? !result : result
}

/**
 * Check if two arrays are equal
 *
 * @param {Object} params - Parameters object.
 * @param {(Array|any)} params.fieldValue - The first array or value.
 * @param {(Array|any)} params.value - The second array or value.
 * @param {boolean} [params.not=false] - Optional. If true, negates the result (checks if the value does not belong to the collection).
 * @returns {boolean} Whether the arrays are equal
 */
export function arrayEquals(params) {
	// prettier-ignore
	const {
		fieldValue: a,
		value: b,
		not: useNot = false,
	} = params
	const result = Array.isArray(a) && Array.isArray(b) && a.length === b.length && a.toString() === b.toString()
	return useNot ? !result : result
}

/**
 * Check if a value matches a regular expression pattern.
 *
 * @param {Object} params - Parameters object.
 * @param {string} params.fieldValue - Value to match.
 * @param {(RegExp|string)} params.value - Regular expression pattern or string pattern.
 * @param {string} [params.flag=''] - Regular expression flags (optional).
 * @param {boolean} [params.not=false] - Optional. If true, negates the result (checks if the value does not match the pattern).
 * @returns {boolean} Whether the value matches the pattern.
 */
export function regex(params) {
	// prettier-ignore
	const {
		fieldValue: v,
		value: pattern,
		flag = '',
		not: useNot = false,
	} = params

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
 * @param {Object} params - Parameters object.
 * @param {string|Array|Object} params.fieldValue - The value whose length is to be compared.
 * @param {number} params.value - The size to compare against.
 * @param {string} params.compare - The comparison operator ('<' | '<=' | '>' | '>=' | '==' | '===').
 * @param {boolean} [params.not=false] - Flag indicating whether to negate the result.
 * @returns {boolean} The result of the length comparison.
 */
export function length(params) {
	// prettier-ignore
	const {
		fieldValue: v,
		value: size,
		compare,
		not: useNot = false,
	} = params
	const m = mapOperators.has(compare) ? mapOperators.get(compare) : false
	const result = m && _isIterable(v) ? m({fieldValue: v.length, value: size}) : false
	return useNot ? !result : result
}

/**
 * Checks if a value belongs to a collection.
 *
 * @param {Object} params - Parameters object.
 * @param {Array} params.fieldValue - The collection to check against.
 * @param {*} params.value - The value to check.
 * @param {boolean} [params.not=false] - Optional. If true, negates the result (checks if the value does not belong to the collection).
 * @returns {boolean} Returns true if the value belongs to the collection, false otherwise (or negated if useNot is true).
 */
export function belongs(params) {
	// prettier-ignore
	const {
		fieldValue: collection,
		value: v,
		not: useNot = false,
	} = params
	const data = new Set(_toArray(collection))
	const result = data.has(v)
	return useNot ? !result : result
}
