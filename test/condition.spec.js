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

test('conditions', t => {
	const fn = condition(conditions)
	const response = fn(data)
	t.true(response)
})

test('condition_intersection', t => {
	const fn = condition(condition_intersection)
	const response = fn(data)
	t.false(response)
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
