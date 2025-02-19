import { getValueFromObject, mapOperators, parseBoolean } from './helper.js'
export { registerOperator } from './operator.js'

/**
 * Evaluates a conditional operation based on provided arguments.
 *
 * @param {Object} args - The parameters for the conditional evaluation.
 * @param {string} args.field - The field to evaluate.
 * @param {*} args.value - The value to compare against.
 * @param {string} args.operator - The operator to use for comparison.
 * @param {string} [args.flag] - An optional flag for additional conditions.
 * @param {function} [args.compare] - An optional comparison function.
 * @param {boolean} [args.not=false] - A flag indicating negation of the condition.
 * @param {Object} [args.data={}] - The data object in which to look up the field value.
 * @returns {boolean} - The result of the conditional evaluation.
 *
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
		not = false,
		data = {},
	} = args

	const _operator = mapOperators.get(operator)
	const fieldValue = getValueFromObject(data, field)

	if (_operator === 'assigned') {
		return (fieldValue !== undefined) === parseBoolean(value ?? true)
	}

	// prettier-ignore
	const _args = {
		fieldValue,
		value,
		not,
		flag,
		compare,
	}

	return _operator(_args)
}

/**
 * Joins conditions by evaluating an object.
 *
 * @param {Object} o - The object containing operator and other properties.
 * @param {Object} data - The data object to evaluate against.
 * @returns {boolean} - The result of the joined condition.
 * @throws {Error} - Throws an error if the operator is invalid.
 *
 * @private
 */
function _join(o, data) {
	if (!mapOperators.has(o.operator)) {
		throw new Error('Wrong operator')
	}
	return _conditional({ ...o, data })
}

/**
 * Parses an array of conditions and evaluates them.
 *
 * @param {Array<Object>} arr - An array of conditional objects to parse.
 * @param {Object} data - The data object to evaluate against.
 * @returns {boolean} - The result of the parsed evaluation.
 *
 * @private
 */
function _parse(arr, data) {
	const result = []
	let joinner = ''
	for (const c of arr) {
		for (const a of c.args) {
			result.push(a.join_operator ? _parse([a], data) : _join(a, data))
		}
		joinner = c.join_operator
	}

	const m = joinner === 'or' ? 'some' : 'every'
	return result[m]((v) => v)
}

/**
 * Evaluates a set of conditional expressions against provided data.
 *
 * @param {Array<Object>} conditionals - An array of conditional expressions to evaluate.
 * @returns {function(Object): boolean} - A function that takes data and returns the evaluation result.
 *
 * @example
 * const conditionals = [
 *   { operator: 'equals', field: 'a', value: 1 },
 *   { operator: 'assigned', field: 'b', value: true },
 * ];
 * const evaluate = condition(conditionals);
 * const result = evaluate({ a: 1, b: undefined }); // Returns false
 */
export default function condition(conditionals) {
	return (data) => _parse(conditionals, data)
}
