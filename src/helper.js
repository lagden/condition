/**
 * Helper intersection
 * @param {Array<string, number, boolean>} v1 - Array com valores primitivos
 * @param {Array<string, number, boolean>} v2 - Array com valores primitivos
 * @return {boolean} Retorna verdadeiro se existir o mesmo elemento no v1 e v2
 */
export function intersection(v1, v2) {
	const _toArray = v => Array.isArray(v) ? v : [v]
	const a = new Set(_toArray(v1))
	const b = new Set(_toArray(v2))
	const _intersection = new Set([...a].filter(x => b.has(x)))
	return [..._intersection.values()].length > 0
}

/**
 * Helper converte um valor para boolean
 * @param {*} v - Valor que será convertido para boolean
 * @return {(boolean|string)} Se sucesso retorna o boolean
 */
export function parseBooleans(v) {
	const boolRegex = /^(?:true|false|1|0)$/i
	if (boolRegex.test(v)) {
		v = v.toLowerCase() === 'true' || v === '1'
	}
	return v
}
