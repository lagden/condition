import test from 'ava'
import condition from '../src/condition.js'
import {intersection} from '../src/helper.js'

const data = {
	tipo_pessoa: 'PF',
	age: 65,
	sexo: 'F',
	aposentada: true,
	foo: 'bar',
	eu: 'vc',
	hasCar: true,
	cidade: 'São Paulo'
}

const conditions = [
	{
		join_operator: 'and',
		args: [
			{
				field: 'tipo_pessoa',
				operator: 'eq',
				value: 'PF'
			}, {
				field: 'age',
				operator: 'gt',
				value: 21
			}, {
				join_operator: 'or',
				args: [
					{
						field: 'sexo',
						operator: 'eq',
						value: 'F'
					}, {
						field: 'aposentada',
						operator: 'eq',
						value: true
					}, {
						join_operator: 'and',
						args: [
							{
								field: 'foo',
								operator: 'eq',
								value: 'bar'
							}, {
								field: 'eu',
								operator: 'ne',
								value: 'vc'
							}
						]
					}
				]
			}, {
				field: 'hasCar',
				operator: 'eq',
				value: true
			}
		]
	}
]

const condition_intersection = [
	{
		join_operator: '',
		args: [
			{
				field: 'cidade',
				operator: 'intersection',
				value: ['Aparecida', 'Lorena', 123]
			}
		]
	}
]

const condition_intersection_other = [
	{
		join_operator: '',
		args: [
			{
				field: 'cidade',
				operator: 'intersection',
				value: ['São Paulo', 'Campinas']
			}
		]
	}
]

const condition_assigned = [
	{
		join_operator: '',
		args: [
			{
				field: 'uf',
				operator: 'assigned',
				value: true
			}
		]
	}
]

const condition_assigned_other = [
	{
		join_operator: '',
		args: [
			{
				field: 'cidade',
				operator: 'assigned',
				value: 'true'
			}
		]
	}
]

const condition_intersection_other_more = [
	{
		join_operator: '',
		args: [
			{
				field: 'cidade',
				operator: 'assigned',
				value: '1'
			}
		]
	}
]

const condition_wrong_operator = [
	{
		join_operator: '',
		args: [
			{
				field: 'uf',
				operator: 'wrong',
				value: true
			}
		]
	}
]

test('condition', t => {
	const fn = condition(conditions)
	const response = fn(data)
	t.true(response)
})

// Verifica se contem
test('condition_intersection', t => {
	const fn = condition(condition_intersection)
	const response = fn(data)
	t.false(response)
})

test('condition_intersection_other', t => {
	const fn = condition(condition_intersection_other)
	const response = fn(data)
	t.true(response)
})

test('condition_intersection_other_more', t => {
	const fn = condition(condition_intersection_other_more)
	const response = fn(data)
	t.true(response)
})

test('intersection', t => {
	t.true(intersection('tadashi', ['tadashi', 'takamoto']))
})

// Verifica se o campo já foi preenchido
test('condition_assigned', t => {
	const fn = condition(condition_assigned)
	const response = fn(data)
	t.false(response)
})

test('condition_assigned_other', t => {
	const fn = condition(condition_assigned_other)
	const response = fn(data)
	t.true(response)
})

test('condition_wrong_operator', t => {
	const error = t.throws(() => {
		condition(condition_wrong_operator)
	}, {instanceOf: Error})
	t.is(error.message, 'Wrong operator')
})
