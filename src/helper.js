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
 * @returns {boolean} Whether there is an intersection between the arrays or values
 */
export function intersection(v1, v2) {
	const a = new Set(_toArray(v1))
	const b = new Set(_toArray(v2))
	const _intersection = new Set([...a].filter(x => b.has(x)))
	return _intersection.size > 0
}

/**
 * Check if there is a difference between two arrays or values
 * @param {Array|any} v1 - First array or value to compare.
 * @param {Array|any} v2 - Second array or value to compare.
 * @returns {boolean} True if there are elements in `v1` that are not present in `v2`, false otherwise.
 */
export function difference(v1, v2) {
	const a = new Set(_toArray(v1))
	const b = new Set(_toArray(v2))
	const _difference = new Set([...a].filter(x => !b.has(x)))
	return _difference.size > 0
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
 * @param {string} v - Value to match
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

/**
 * Check if the length of a value satisfies a comparison
 * @param {string} v - Value to check the length of
 * @param {number} size - Size to compare against
 * @param {('less'|'greater')} compare - Comparison type ('less' or 'greater')
 * @returns {boolean} Whether the length of the value satisfies the comparison
 */
export function length(v, size, compare) {
	const m = compare === 'less' ? le : ge
	return m(String(v).length, size)
}

/**
 * Retrieves a value from a nested object based on a given path.
 *
 * @param {Object} obj - The object from which to retrieve the value.
 * @param {string} path - The path to the desired value, using dot notation (e.g., 'parent.child.grandchild').
 * @returns {*} - The value found at the specified path, or undefined if not found.
 */
export function getValueFromObject(obj, path) {
	// Split the path string into an array of keys.
	const keys = path.split('.')

	// Initialize the value to the root object.
	let value = obj

	// Iterate through each key in the path array.
	for (const key of keys) {
		// Access the value corresponding to the current key.
		value = value[key]

		// If the value is undefined, return undefined.
		if (value === undefined) {
			return undefined
		}
	}

	// Return the final value found at the end of the path.
	return value
}
