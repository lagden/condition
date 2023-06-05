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
 * @param {*} a - First value
 * @param {*} b - Second value
 * @returns {boolean} Whether the first value is greater than the second value
 */
export function gt(a, b) {
	return a > b
}

/**
 * Check if the first value is greater than or equal to the second value
 * @param {*} a - First value
 * @param {*} b - Second value
 * @returns {boolean} Whether the first value is greater than or equal to the second value
 */
export function ge(a, b) {
	return a >= b
}

/**
 * Check if the first value is less than the second value
 * @param {*} a - First value
 * @param {*} b - Second value
 * @returns {boolean} Whether the first value is less than the second value
 */
export function lt(a, b) {
	return a < b
}

/**
 * Check if the first value is less than or equal to the second value
 * @param {*} a - First value
 * @param {*} b - Second value
 * @returns {boolean} Whether the first value is less than or equal to the second value
 */
export function le(a, b) {
	return a <= b
}

/**
 * Check if there is an intersection between two arrays or values
 * @param {(Array|*)} v1 - First array or value
 * @param {(Array|*)} v2 - Second array or value
 * @returns {boolean} Whether there is an intersection between the arrays or values
 */
export function intersection(v1, v2) {
	const _toArray = v => Array.isArray(v) ? v : [v]
	const a = new Set(_toArray(v1))
	const b = new Set(_toArray(v2))
	const _intersection = new Set([...a].filter(x => b.has(x)))
	return _intersection.size > 0
}

/**
 * Check if two arrays are equal
 * @param {Array} a - First array
 * @param {Array} b - Second array
 * @returns {boolean} Whether the arrays are equal
 */
export function arrayEquals(a, b) {
	return Array.isArray(a) && Array.isArray(b) && a.length === b.length && a.every((val, index) => val === b[index])
}

/**
 * Check if a value matches a regular expression pattern
 * @param {*} v - Value to match
 * @param {(RegExp|string)} pattern - Regular expression pattern or string pattern
 * @param {string} [flag] - Regular expression flags (optional)
 * @returns {boolean} Whether the value matches the pattern
 */
export function regex(v, pattern, flag) {
	if (pattern instanceof RegExp) {
		return pattern.test(v)
	}

	if (typeof pattern === 'string') {
		const _regex = new RegExp(pattern, flag ?? '')
		return _regex.test(v)
	}

	return false
}
