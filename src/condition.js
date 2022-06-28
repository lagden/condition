import {
	intersection,
	parseBooleans,
	regex,
	arrayEquals,
} from './helper.js'

/**
 * Mapa dos operadores lógico
 * @constant {Map[]} mapOperators - Operadores
 */
const mapOperators = new Map()
mapOperators.set('eq', '===')
mapOperators.set('ne', '!==')
mapOperators.set('gt', '>')
mapOperators.set('ge', '>=')
mapOperators.set('lt', '<')
mapOperators.set('le', '<=')
mapOperators.set('and', '&&')
mapOperators.set('or', '||')
mapOperators.set('assigned', 'assigned')
mapOperators.set('intersection', intersection)
mapOperators.set('regex', regex)
mapOperators.set('arrayEquals', arrayEquals)

/**
 * Helper para montar a condição
 * @param {string} field                        - Nome campo ou propriedade
 * @param {(string|number|boolean|array)} value - Valor
 * @param {string} operator                     - Operador lógico
 * @return {string} Retorna a condição
 */
function _conditional(field, value, operator) {
	const _operator = mapOperators.get(operator)
	if (Array.isArray(value) && ['intersection', 'arrayEquals'].includes(operator)) {
		const result = []
		for (const element of value) {
			result.push(typeof element === 'string' ? `'${element}'` : `${element}`)
		}
		return `${_operator}(data['${field}'], [${result.join(', ')}])`
	}

	if (operator === 'assigned') {
		const v = typeof value === 'string' ? parseBooleans(value) : value
		return `(data['${field}'] !== undefined) === ${v}`
	}

	if (operator === 'regex') {
		const v = typeof value === 'string' ? `'${value}'` : value
		return `${_operator}(data['${field}'], ${v})`
	}

	const v = typeof value === 'string' ? `'${value}'` : value
	return `data['${field}'] ${_operator} ${v}`
}

/**
 * Gera o método que verificará as condições da ação
 * @param {string} condition - Condições da ação
 * @return {function} Retorna o método pronto para testar as condições de uma ação
 */
function _fn(condition) {
	return new Function('...args', `let [data] = args; return ${condition}`)
}

/**
 * Gera a condicional
 * @param {object} o                         - Objeto contendo as propriedades para gerar um condição lógica
 * @param {string} o.field                   - Campo
 * @param {string} o.operator                - Operador lógico
 * @param {(string|number|boolean)} o.value  - Valor
 * @return {string} Retorna a condição
 */
function _join(o) {
	if (mapOperators.has(o.operator)) {
		return _conditional(o.field, o.value, o.operator)
	}
	throw new Error('Wrong operator')
}

/**
 * Agrupa as condições de uma ação
 * @param {Array} arr - Coleção de condições de uma ação
 * @return {string} Retorna as condições
 */
function _parse(arr) {
	const r = []
	let joinner = ''
	for (const c of arr) {
		for (const a of c.args) {
			if (a.join_operator) {
				r.push(_parse([{...a}]))
			} else {
				joinner = c.join_operator
				r.push(_join(a))
			}
		}
	}
	return `(${r.join(` ${mapOperators.get(joinner) ?? '&&'} `)})`
}

/**
 * Gera o método que verificará as condições da ação
 * @param {Array} arr - Coleção de condições de uma ação
 * @return {function} Retorna o método pronto para testar as condições de uma ação
 */
export default function condition(conditionals) {
	return _fn(_parse(conditionals))
}
