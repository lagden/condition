import {test} from 'node:test'
import assert from 'node:assert/strict'
import condition from '../src/condition.js'
import {intersection, regex, arrayEquals, parseBoolean} from '../src/helper.js'

const data = {
	age: 65,
	gender: 'F',
	city: 'São Paulo',
	country: 'Brazil',
	phone: '(11) 988889999',
	hasCar: true,
	colors: ['red', 'blue'],
}

const calculo_A = {
	_seguradoras: ['tokio', 'bradesco'],
	person_type: 'FISICA',
	vehicle_class: 'AUTOMOVEL',
	underfined_driver: false,
}

const calculo_B = {
	_seguradoras: ['tokio', 'bradesco'],
	person_type: 'JURIDICA',
	vehicle_class: 'REBOQUE',
	underfined_driver: false,
}

const calculo_C = {
	_seguradoras: ['tokio'],
	person_type: 'FISICA',
	vehicle_class: 'CAMINHAO',
	underfined_driver: false,
}

const calculo_D = {
	_seguradoras: ['hdi'],
	person_type: 'FISICA',
	vehicle_class: 'CAMINHAO',
	underfined_driver: false,
}

const calculo_driver = {
	_seguradoras: ['hdi'],
	person_type: 'FISICA',
	main_driver: {
		name: 'Lucas Tadashi',
	},
}

const conditionsAlternative = [
	{
		join_operator: 'and',
		args: [
			{
				field: 'gender',
				operator: 'eq',
				value: 'M',
			},
		],
	},
	{
		join_operator: 'and',
		args: [
			{
				field: 'age',
				operator: 'eq',
				value: 65,
			},
		],
	},
]

const conditions = [
	{
		join_operator: 'and',
		args: [
			{
				field: 'gender',
				operator: 'eq',
				value: 'F',
			},
			{
				field: 'gender',
				operator: 'ne',
				value: 'M',
			},
			{
				field: 'age',
				operator: 'gt',
				value: 21,
			},
			{
				field: 'age',
				operator: 'ge',
				value: 21,
			},
			{
				field: 'age',
				operator: 'lt',
				value: 100,
			},
			{
				field: 'age',
				operator: 'le',
				value: 100,
			},
			{
				field: 'phone',
				operator: 'regex',
				value: /\(\d{2}\)\s(\d{8,9})/i,
			},
			{
				field: 'phone',
				operator: 'regex',
				value: '\\(\\d{2}\\)\\s(\\d{8,9})',
				flag: 'i',
			},
			{
				join_operator: 'or',
				args: [
					{
						field: 'city',
						operator: 'assigned',
						value: false,
					},
					{
						field: 'country',
						operator: 'intersection',
						value: ['Japan', 'Brazil'],
					},
				],
			},
			{
				field: 'hasCar',
				operator: 'eq',
				value: true,
			},
			{
				field: 'colors',
				operator: 'intersection',
				value: ['blue', 'green', 123],
			},
			{
				field: 'country',
				operator: 'length',
				compare: 'less',
				value: 10,
			},
			{
				field: 'country',
				operator: 'length',
				compare: 'greater',
				value: 3,
			},
		],
	},
]

const condition_intersection = [
	{
		join_operator: '',
		args: [
			{
				field: 'colors',
				operator: 'intersection',
				value: ['yellow', 'green'],
			},
		],
	},
]

const condition_diff = [
	{
		join_operator: '',
		args: [
			{
				field: 'colors',
				operator: 'difference',
				value: ['yellow', 'green'],
			},
		],
	},
]

const condition_assigned = [
	{
		join_operator: '',
		args: [
			{
				field: 'state',
				operator: 'assigned',
			},
		],
	},
]

const condition_assigned_more = [
	{
		join_operator: '',
		args: [
			{
				field: 'state',
				operator: 'assigned',
				value: false,
			},
		],
	},
]

const condition_assigned_other = [
	{
		join_operator: '',
		args: [
			{
				field: 'city',
				operator: 'assigned',
				value: '1',
			},
		],
	},
]

const condition_wrong_operator = [
	{
		join_operator: '',
		args: [
			{
				field: 'uf',
				operator: 'wrong',
				value: true,
			},
		],
	},
]

const condition_array_equals = [
	{
		join_operator: '',
		args: [
			{
				field: 'colors',
				operator: 'arrayEquals',
				value: ['red', 'blue'],
			},
		],
	},
]

const condition_array_equals_false = [
	{
		join_operator: '',
		args: [
			{
				field: 'colors',
				operator: 'arrayEquals',
				value: ['red'],
			},
		],
	},
]

const condition_belongs = [
	{
		join_operator: '',
		args: [
			{
				field: 'colors',
				operator: 'belongs',
				value: 'red',
			},
		],
	},
]

const condition_belongs_useNot = [
	{
		join_operator: '',
		args: [
			{
				field: 'colors',
				operator: 'belongs',
				useNot: true,
				value: 'red',
			},
		],
	},
]

/// condition
const conditionsCarroceria = [
	{
		join_operator: 'or',
		args: [
			{
				join_operator: 'and',
				args: [
					{
						field: '_seguradoras',
						operator: 'intersection',
						value: ['tokio'],
					},
					{
						join_operator: 'or',
						args: [
							{
								field: 'person_type',
								operator: 'eq',
								value: 'JURIDICA',
							},
							{
								field: 'vehicle_class',
								operator: 'intersection',
								value: ['CAMINHAO', 'REBOQUE'],
							},
							{
								field: 'underfined_driver',
								operator: 'eq',
								value: true,
							},
						],
					},
				],
			},
			{
				join_operator: 'and',
				args: [
					{
						field: '_seguradoras',
						operator: 'intersection',
						value: ['bradesco'],
					},
					{
						join_operator: 'or',
						args: [
							{
								field: 'person_type',
								operator: 'eq',
								value: 'JURIDICA',
							},
							{
								field: 'vehicle_class',
								operator: 'intersection',
								value: ['CAMINHAO'],
							},
						],
					},
				],
			},
		],
	},
]

/// conditionsDriver
const conditionsDriver = [
	{
		join_operator: '',
		args: [
			{
				field: 'main_driver.name',
				operator: 'eq',
				value: 'Lucas Tadashi',
			},
		],
	},
]

test('conditions', () => {
	const fn = condition(conditions)
	const response = fn(data)
	assert.ok(response)
})

test('conditions alternative', () => {
	const fn = condition(conditionsAlternative)
	const response = fn(data)
	assert.ok(!response)
})

test('condition_intersection', () => {
	const fn = condition(condition_intersection)
	const response = fn(data)
	assert.ok(!response)
})

test('condition_diff', () => {
	const fn = condition(condition_diff)
	const response = fn(data)
	assert.ok(response)
})

test('intersection', () => {
	assert.ok(intersection('tadashi', ['tadashi', 'takamoto']))
})

test('condition_assigned', () => {
	const fn = condition(condition_assigned)
	const response = fn(data)
	assert.ok(!response)
})

test('condition_assigned_more', () => {
	const fn = condition(condition_assigned_more)
	const response = fn(data)
	assert.ok(response)
})

test('condition_assigned_other', () => {
	const fn = condition(condition_assigned_other)
	const response = fn(data)
	assert.ok(response)
})

test('condition_arrayEquals', () => {
	const fn = condition(condition_array_equals)
	const response = fn(data)
	assert.ok(response)
})

test('condition_arrayEquals_false', () => {
	const fn = condition(condition_array_equals_false)
	const response = fn(data)
	assert.ok(!response)
})

test('regex', () => {
	assert.ok(regex('tadashi', /tadashi/i))
	assert.ok(regex('tadashi', 'tadashi'))
	assert.ok(!regex('tadashi', []))
	assert.ok(regex('(11) 988889999', '\\(\\d{2}\\)\\s(\\d{8,9})'))
	assert.ok(regex('(11) 988889999', /\(\d{2}\)\s(\d{8,9})/i))
})

test('arrayEquals', () => {
	assert.ok(!arrayEquals('tadashi', ['tadashi']))
	assert.ok(!arrayEquals(['tadashi'], 'tadashi'))
	assert.ok(!arrayEquals(['tadashi'], ['tadashii']))
})

test('parseBoolean', () => {
	assert.ok(!parseBoolean('false'))
	assert.equal(parseBoolean('tadashi', false), 'tadashi')
	assert.ok(parseBoolean('tadashi', true))
})

test('condition_wrong_operator', () => {
	assert.throws(
		() => {
			condition(condition_wrong_operator)()
		},
		{
			message: 'Wrong operator',
		},
	)
})

test('conditions carroceria', () => {
	const fnA = condition(conditionsCarroceria)
	const responseA = fnA(calculo_A)
	assert.ok(!responseA)

	const fnB = condition(conditionsCarroceria)
	const responseB = fnB(calculo_B)
	assert.ok(responseB)

	const fnC = condition(conditionsCarroceria)
	const responseC = fnC(calculo_C)
	assert.ok(responseC)

	const fnD = condition(conditionsCarroceria)
	const responseD = fnD(calculo_D)
	assert.ok(!responseD)
})

test('conditions nested', () => {
	const fn = condition(conditionsDriver)
	const response = fn(calculo_driver)
	assert.ok(response)
})

test('conditions belongs', () => {
	const fnA = condition(condition_belongs)
	const responseA = fnA(data)

	const fnB = condition(condition_belongs_useNot)
	const responseB = fnB(data)

	assert.ok(responseA)
	assert.ok(!responseB)
})
