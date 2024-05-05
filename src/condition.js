import {getValueFromObject, mapOperators, parseBoolean} from './helper.js'
export {registerOperator} from './operator.js'

/**
 * Performs conditional checks based on the provided arguments.
 *
 * @param {Object} args - The arguments object containing field, value, operator, flag, compare, useNot, and data.
 * @param {string} args.field - The field to be checked.
 * @param {(string|number|boolean|array)} args.value - The value to be compared.
 * @param {string} args.operator - The operator to use for comparison.
 * @param {string} [args.flag] - The flag for regex comparison.
 * @param {string} [args.compare] - The comparison value for length operator.
 * @param {boolean} [args.useNot=false] - Flag indicating whether to negate the result.
 * @param {Object} [args.data={}] - The data object containing the field value.
 * @returns {boolean} The result of the conditional check.
 * @private
 */
function _conditional(args) {
	// prettier-ignore
	const {
		field,
		value,
		operator,
		flag,
		compare,
		useNot = false,
		data = {},
	} = args

	const _operator = mapOperators.get(operator)
	const _dataFieldValue = getValueFromObject(data, field)

	if (operator === 'assigned') {
		return (_dataFieldValue !== undefined) === parseBoolean(value ?? true)
	}

	if (Array.isArray(value) && Array.isArray(_dataFieldValue) && ['intersection', 'difference', 'arrayEquals'].includes(operator)) {
		return _operator(_dataFieldValue, value, useNot)
	}

	if (Array.isArray(_dataFieldValue) && ['belongs', 'has', 'includes'].includes(operator)) {
		return _operator(value, _dataFieldValue, useNot)
	}

	if (operator === 'regex') {
		return _operator(_dataFieldValue, value, flag, useNot)
	}

	if (operator === 'length') {
		return _operator(_dataFieldValue, value, compare, useNot)
	}

	return _operator(_dataFieldValue, value)
}

/**
 * Executes a conditional operation based on the provided operator and data.
 *
 * @param {Object} o - The object containing the operator and other parameters.
 * @param {string} o.operator - The operator to be executed.
 * @param {string} o.field - The field to be checked in the conditional operation.
 * @param {(string|number|boolean|array)} args.value - The value to be compared in the conditional operation.
 * @param {string} o.flag - The flag for regex comparison.
 * @param {string} o.compare - The comparison value for length operator.
 * @param {boolean} o.useNot - Flag indicating whether to negate the result in the conditional operation.
 * @param {Object} data - The data object containing the field value.
 * @returns {boolean} The result of the conditional operation.
 * @throws {Error} Throws an error if the operator is invalid.
 * @private
 */
function _join(o, data) {
	if (mapOperators.has(o.operator)) {
		return _conditional({
			...o,
			data,
		})
	}
	throw new Error('Wrong operator')
}

/**
 * Parses an array of conditional objects and evaluates them against the provided data.
 *
 * @param {Array<Object>} arr - The array of conditional objects to parse.
 * @param {Object} data - The data object containing the field values.
 * @returns {boolean} The result of evaluating the parsed conditionals against the data.
 * @private
 */
function _parse(arr, data) {
	const r = []
	let joinner = ''
	for (const c of arr) {
		for (const a of c.args) {
			if (a.join_operator) {
				r.push(_parse([{...a}], data))
			} else {
				r.push(_join(a, data))
			}
		}
		joinner = c.join_operator
	}

	const m = joinner === 'or' ? 'some' : 'every'
	return r[m](v => v)
}

/**
 * Creates a function that evaluates an array of conditional objects against the provided data.
 *
 * @param {Array<Array<Object>>} conditionals - The array of arrays of conditional objects to be evaluated.
 * @returns {function(data: Object): boolean} A function that evaluates the conditionals against the provided data and returns a boolean result.
 */
export default function condition(conditionals) {
	return data => _parse(conditionals, data)
}
