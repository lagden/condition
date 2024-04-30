// prettier-ignore
import {
	getValueFromObject,
	parseBoolean,
	eq,
	ne,
	gt,
	ge,
	lt,
	le,
	intersection,
	difference,
	arrayEquals,
	regex,
	length,
} from './helper.js'

/**
 * Mapa dos operadores lógico
 * @constant {Map} mapOperators - Operadores
 */
const mapOperators = new Map()
mapOperators.set('eq', eq)
mapOperators.set('ne', ne)
mapOperators.set('gt', gt)
mapOperators.set('ge', ge)
mapOperators.set('lt', lt)
mapOperators.set('le', le)
mapOperators.set('intersection', intersection)
mapOperators.set('difference', difference)
mapOperators.set('arrayEquals', arrayEquals)
mapOperators.set('regex', regex)
mapOperators.set('length', length)
mapOperators.set('assigned', 'assigned')

/**
 * Helper para montar a condição
 * @param {Object} args - Argumentos para a condição
 * @param {string} args.field - Nome campo ou propriedade
 * @param {(string|number|boolean|array)} args.value - Valor
 * @param {string} args.operator - Operador lógico
 * @param {string} args.flag - Sinalizador para regex (opcional)
 * @param {Object} args.data - Dados para avaliação (opcional)
 * @returns {boolean} Retorna o resultado da condição
 */
function _conditional(args) {
	const {field, value, operator, flag, compare, data = {}} = args

	const _operator = mapOperators.get(operator)
	const _dataFieldValue = getValueFromObject(data, field)

	if (operator === 'assigned') {
		return (_dataFieldValue !== undefined) === parseBoolean(value)
	}

	if (Array.isArray(value) && ['intersection', 'difference', 'arrayEquals'].includes(operator)) {
		return _operator(_dataFieldValue, value)
	}

	if (operator === 'regex') {
		return _operator(_dataFieldValue, value, flag)
	}

	if (operator === 'length') {
		return _operator(_dataFieldValue, value, compare)
	}

	return _operator(_dataFieldValue, value)
}

/**
 * Gera a condição para junção de condições
 * @param {Object} o - Objeto contendo as propriedades para gerar uma condição lógica
 * @param {string} o.field - Campo
 * @param {string} o.value - Valor
 * @param {string} o.operator - Operador lógico
 * @param {string} o.flag - Sinalizador para regex (opcional)
 * @param {Object} data - Dados para avaliação
 * @returns {boolean} Retorna o resultado da condição
 * @throws {Error} Lança um erro se o operador estiver incorreto
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
 * Analisa e avalia as condições
 * @param {Array} arr - Coleção de condições
 * @param {Object} data - Dados para avaliação
 * @returns {boolean} Retorna o resultado da avaliação das condições
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
 * Gera uma função para verificar as condições
 * @param {Array} conditionals - Coleção de condições
 * @returns {function} Retorna uma função para testar as condições com base nos dados fornecidos
 */
export default function condition(conditionals) {
	return data => _parse(conditionals, data)
}
