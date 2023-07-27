import test from 'ava'
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
				value: 'true',
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

test('conditions', t => {
	const fn = condition(conditions)
	const response = fn(data)
	t.true(response)
})

test('conditions alternative', t => {
	const fn = condition(conditionsAlternative)
	const response = fn(data)
	t.false(response)
})

test('condition_intersection', t => {
	const fn = condition(condition_intersection)
	const response = fn(data)
	t.false(response)
})

test('condition_diff', t => {
	const fn = condition(condition_diff)
	const response = fn(data)
	t.true(response)
})

test('intersection', t => {
	t.true(intersection('tadashi', ['tadashi', 'takamoto']))
})

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

test('condition_arrayEquals', t => {
	const fn = condition(condition_array_equals)
	const response = fn(data)
	t.true(response)
})

test('condition_arrayEquals_false', t => {
	const fn = condition(condition_array_equals_false)
	const response = fn(data)
	t.false(response)
})

test('regex', t => {
	t.true(regex('tadashi', /tadashi/i))
	t.true(regex('tadashi', 'tadashi'))
	t.false(regex('tadashi', []))
	t.true(regex('(11) 988889999', '\\(\\d{2}\\)\\s(\\d{8,9})'))
	t.true(regex('(11) 988889999', /\(\d{2}\)\s(\d{8,9})/i))
})

test('arrayEquals', t => {
	t.false(arrayEquals('tadashi', ['tadashi']))
	t.false(arrayEquals(['tadashi'], 'tadashi'))
	t.false(arrayEquals(['tadashi'], ['tadashii']))
})

test('parseBoolean', t => {
	t.false(parseBoolean('false'))
	t.is(parseBoolean('tadashi', false), 'tadashi')
	t.true(parseBoolean('tadashi', true))
})

test('condition_wrong_operator', t => {
	const error = t.throws(() => {
		condition(condition_wrong_operator)()
	}, {instanceOf: Error})
	t.is(error.message, 'Wrong operator')
})

test('conditions carroceria', t => {
	const fnA = condition(conditionsCarroceria)
	const responseA = fnA(calculo_A)
	t.false(responseA)

	const fnB = condition(conditionsCarroceria)
	const responseB = fnB(calculo_B)
	t.true(responseB)

	const fnC = condition(conditionsCarroceria)
	const responseC = fnC(calculo_C)
	t.true(responseC)

	const fnD = condition(conditionsCarroceria)
	const responseD = fnD(calculo_D)
	t.false(responseD)
})
