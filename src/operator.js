import { arrayEquals, belongs, difference, eq, ge, gt, intersection, le, length, lt, ne, regex } from './helper.js'

/**
 * A map that associates operator strings with their corresponding functions.
 *
 * @type {Map<string, any>}
 */
export const mapOperators = new Map()
mapOperators.set('eq', eq)
mapOperators.set('===', eq)
mapOperators.set('ne', ne)
mapOperators.set('!==', ne)
mapOperators.set('gt', gt)
mapOperators.set('>', gt)
mapOperators.set('ge', ge)
mapOperators.set('>=', ge)
mapOperators.set('greater', ge) // ge alias
mapOperators.set('lt', lt)
mapOperators.set('<', lt)
mapOperators.set('le', le)
mapOperators.set('<=', le)
mapOperators.set('less', le) // le alias
mapOperators.set('∩', intersection)
mapOperators.set('intersection', intersection)
mapOperators.set('difference', difference)
mapOperators.set('∆', difference)
mapOperators.set('arrayEquals', arrayEquals)
mapOperators.set('=', arrayEquals)
mapOperators.set('belongs', belongs)
mapOperators.set('∈', belongs)
mapOperators.set('includes', belongs) // belongs alias
mapOperators.set('has', belongs) // belongs alias
mapOperators.set('regex', regex)
mapOperators.set('length', length)
mapOperators.set('assigned', 'assigned')

/**
 * Registers a new operator in the mapOperators collection.
 *
 * @param {string} name - The name of the operator to register.
 * @param {Function} fn - The function that implements the operator's behavior.
 * @throws {Error} - Throws an error if attempting to override an existing operator.
 *
 * @example
 * registerOperator('newOperator', (args) => {
 *   // Implementation of the new operator
 * });
 */
export const registerOperator = (name, fn) => {
	if (mapOperators.has(name)) {
		throw new Error('You cannot override existing operator method.')
	}
	mapOperators.set(name, fn)
}
