import { mapOperators } from './operator.js'

export { mapOperators } from './operator.js'
export { getValueFromObject } from '@tadashi/common'

/**
 * Converts a value to an array if it is not already an array.
 *
 * @param {*} v - The value to convert.
 * @returns {Array} - An array containing the value(s).
 * @private
 */
const _toArray = (v) => (Array.isArray(v) ? v : [v])

/**
 * Checks if a value is iterable.
 *
 * @param {*} v - The value to check.
 * @returns {boolean} - Returns true if the value is iterable, otherwise false.
 * @private
 */
const _isIterable = (v) => (v === null || v === undefined ? false : typeof v[Symbol.iterator] === 'function')

/**
 * Parses a value as a boolean, optionally forcing conversion.
 *
 * @param {*} v - The value to parse.
 * @param {boolean} [force=true] - Whether to force the conversion to boolean.
 * @returns {boolean|*} - Returns the boolean value or the original value if not forced.
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
 * Checks for equality between two values.
 *
 * @param {Object} params - The parameters for the equality check.
 * @param {*} params.fieldValue - The first value to compare.
 * @param {*} params.value - The second value to compare.
 * @returns {boolean} - Returns true if the values are equal, otherwise false.
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
 * Checks for inequality between two values.
 *
 * @param {Object} params - The parameters for the inequality check.
 * @param {*} params.fieldValue - The first value to compare.
 * @param {*} params.value - The second value to compare.
 * @returns {boolean} - Returns true if the values are not equal, otherwise false.
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
 * Checks if the first value is greater than the second.
 *
 * @param {Object} params - The parameters for the greater than check.
 * @param {*} params.fieldValue - The first value to compare.
 * @param {*} params.value - The second value to compare.
 * @returns {boolean} - Returns true if the first value is greater, otherwise false.
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
 * Checks if the first value is greater than or equal to the second.
 *
 * @param {Object} params - The parameters for the greater than or equal check.
 * @param {*} params.fieldValue - The first value to compare.
 * @param {*} params.value - The second value to compare.
 * @returns {boolean} - Returns true if the first value is greater than or equal, otherwise false.
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
 * Checks if the first value is less than the second.
 *
 * @param {Object} params - The parameters for the less than check.
 * @param {*} params.fieldValue - The first value to compare.
 * @param {*} params.value - The second value to compare.
 * @returns {boolean} - Returns true if the first value is less, otherwise false.
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
 * Checks if the first value is less than or equal to the second.
 *
 * @param {Object} params - The parameters for the less than or equal check.
 * @param {*} params.fieldValue - The first value to compare.
 * @param {*} params.value - The second value to compare.
 * @returns {boolean} - Returns true if the first value is less than or equal, otherwise false.
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
 * Checks if the intersection of two sets is non-empty.
 *
 * @param {Object} params - The parameters for the intersection check.
 * @param {*} params.fieldValue - The first set of values.
 * @param {*} params.value - The second set of values.
 * @param {boolean} [params.not=false] - A flag indicating whether to negate the result.
 * @returns {boolean} - Returns true if there is an intersection, otherwise false.
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
	const _intersection = new Set([...a].filter((x) => b.has(x)))
	const result = _intersection.size > 0
	return useNot ? !result : result
}

/**
 * Checks if the difference between two sets is non-empty.
 *
 * @param {Object} params - The parameters for the difference check.
 * @param {*} params.fieldValue - The first set of values.
 * @param {*} params.value - The second set of values.
 * @param {boolean} [params.not=false] - A flag indicating whether to negate the result.
 * @returns {boolean} - Returns true if there are elements in the first set that are not in the second, otherwise false.
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
	const _difference = new Set([...a].filter((x) => !b.has(x)))
	const result = _difference.size > 0
	return useNot ? !result : result
}

/**
 * Checks if two arrays are equal in terms of length and content.
 *
 * @param {Object} params - The parameters for the equality check.
 * @param {*} params.fieldValue - The first array to compare.
 * @param {*} params.value - The second array to compare.
 * @param {boolean} [params.not=false] - A flag indicating whether to negate the result.
 * @returns {boolean} - Returns true if both arrays are equal, otherwise false.
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
 * Tests if a value matches a regular expression pattern.
 *
 * @param {Object} params - The parameters for the regex check.
 * @param {*} params.fieldValue - The value to test against the pattern.
 * @param {string|RegExp} params.value - The regex pattern to test.
 * @param {string} [params.flag=''] - Optional flags for the regex.
 * @param {boolean} [params.not=false] - A flag indicating whether to negate the result.
 * @returns {boolean} - Returns true if the value matches the pattern, otherwise false.
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
 * Checks if the length of a value meets a specified condition.
 *
 * @param {Object} params - The parameters for the length check.
 * @param {*} params.fieldValue - The value whose length is to be checked.
 * @param {number} params.value - The length to compare against.
 * @param {string} [params.compare] - The comparison operator.
 * @param {boolean} [params.not=false] - A flag indicating whether to negate the result.
 * @returns {boolean} - Returns true if the length check passes, otherwise false.
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
	const result = m && _isIterable(v) ? m({ fieldValue: v.length, value: size }) : false
	return useNot ? !result : result
}

/**
 * Checks if a value belongs to a specified collection.
 *
 * @param {Object} params - The parameters for the belongs check.
 * @param {*} params.fieldValue - The collection (array or iterable) to check against.
 * @param {*} params.value - The value to check for membership in the collection.
 * @param {boolean} [params.not=false] - A flag indicating whether to negate the result.
 * @returns {boolean} - Returns true if the value belongs to the collection, otherwise false.
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
